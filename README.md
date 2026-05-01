# Cannavigator Mobile

React Native mobile app for browsing the Cannavigator pharmacology database — a scientific knowledge platform that systematically maps cannabis compounds to their molecular targets and disease associations, enabling evidence-based analysis of cannabis therapeutics.

## Quick Start

### Prerequisites

- Node.js 22+
- Expo Go app on your phone (or iOS Simulator / Android Emulator)
- The Cannavigator backend running (FastAPI + PostgreSQL)

### 1. Start the backend

```bash
cd ~/Dropbox/Cannavigator/Cannavigator_v2_analysed/backend
# First time: set up the database and seed data
# pip install -r requirements.txt
# alembic upgrade head
# python -m app.seed.seed_db
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000` with API docs at `http://localhost:8000/docs`.

### 2. Install and start the mobile app

```bash
cd cannavigator-mobile
pnpm install
pnpm exec expo start
```

- Press **w** to open in web browser
- Press **i** for iOS Simulator
- Scan the QR code with Expo Go on your phone

### 3. Physical device setup

When running on a physical device, the app can't reach `localhost`. Go to the **Settings** tab and change the API URL to your machine's LAN IP:

```
http://192.168.x.x:8000/api/v1
```

### 4. Run tests

```bash
pnpm test
```

---

## Tech Stack

- **Expo SDK 55** with expo-router (file-based navigation)
- **TypeScript** throughout
- **gluestack-ui** for UI components
- **TanStack React Query** for data fetching and caching
- **Axios** with dynamic base URL (configurable at runtime via Settings)
- **Jest + React Native Testing Library** for tests

## App Structure

```
app/
  (tabs)/
    index.tsx          # Unified search across diseases and profiles
    diseases.tsx       # Disease list with search
    profiles.tsx       # Ligand profile cards with type filter
    settings.tsx       # API URL configuration
  diseases/[slug].tsx  # Disease detail (targets, ligands, desired effects, products)
  profiles/[slug].tsx  # Ligand profile detail (dashboard card, highlights, linked diseases)
src/
  api/                 # Axios-based API functions per resource
  hooks/               # React Query hooks wrapping API functions
  types/               # TypeScript interfaces matching backend schemas
  components/          # Reusable UI: SearchBar, DiseaseCard, LigandCard, etc.
  config/              # Runtime configuration (API base URL via AsyncStorage)
```

---

## Core Domain Concepts

### Ligands — Active Chemical Compounds

Ligands are the bioactive molecules in cannabis that interact with biological targets. The platform tracks two main categories:

- **Phytocannabinoids** (e.g., THC, CBD, CBC, CBG, THCA, CBDA): Non-volatile cannabinoid molecules produced by cannabis plants. These range from well-studied compounds like THC (tetrahydrocannabinol) and CBD (cannabidiol) to rare variants like CBCVA (cannabichromevarinic acid).
- **Terpenes** (e.g., Limonene, Linalool, Pinene, beta-Myrcene): Aromatic hydrocarbons that contribute both scent/flavor and therapeutic effects. Individual terpenes can act as agonists, partial agonists, or modulators of specific molecular targets.

Each ligand can have a compiled **profile** containing mechanistic highlights, top targets with potency values, disease relevance summaries, and evidence strength metrics.

### Targets — Molecular Receptors and Enzymes

Targets are the biological molecules that ligands bind to:

- **Receptors** (CB1, CB2, 5-HT1a, TRPV1, GPR55, etc.): Cell surface proteins that trigger intracellular signaling when bound by ligands. CB1 and CB2 are the primary endocannabinoid system receptors.
- **Enzymes** (MAGL, FAAH, COX-2, etc.): Proteins that catalyze biochemical reactions. For example, MAGL (monoacylglycerol lipase) breaks down endocannabinoids — inhibiting it increases ambient cannabinoid levels.
- **Ion Channels** (TRPA1, TRPM8, etc.): Transporters and other molecular machinery involved in cellular signaling.

The platform currently tracks 77 targets across these categories.

### Interactions — Ligand-Target Pharmacology

Interactions capture how a specific ligand affects a specific target (472 interactions in the database):

| Field | Description |
|---|---|
| **Effect** | Direction of action: agonist, antagonist, partial agonist, PAM, NAM |
| **Potency** | Binding affinity in nanomolars (nM). Lower = stronger binding |
| **Potency Type** | Measurement method: Ki, EC50, IC50, or qualitative |
| **Reference** | Academic citation supporting the interaction |
| **Conflict** | Flag for contradictory findings across studies |

The full interaction matrix (69 ligands x 77 targets) forms the computational backbone for all therapeutic scoring.

### Diseases — Therapeutic Indications

Diseases represent clinical conditions for which cannabis-based treatment is being investigated (55 diseases tracked). Each disease links to:

- **Associated Targets**: Receptors/enzymes implicated in the disease pathophysiology, with frequency counts from literature
- **Associated Ligands**: Specific cannabinoids and terpenes shown or suspected to affect the disease
- **Literature Text**: Scientific rationale explaining the biological basis
- **Desired Effects**: What therapeutic action is needed at each target

### Desired Effects — Target-Level Therapeutic Goals

Desired effects bridge diseases to targets by specifying what action is therapeutically beneficial. For example:

- *Epilepsy + CB1 → agonist* (activating CB1 reduces seizure activity)
- *Inflammation + CB2 → agonist* (activating CB2 provides anti-inflammatory effects)
- *Anxiety + FAAH → inhibitor* (blocking FAAH increases anandamide, reducing anxiety)

Each desired effect carries a **confidence score** (0–1) and may include an **override flag** where expert review has corrected algorithm-derived predictions.

### Products and Disease Scoring

Products represent specific cannabis formulations (cultivars, extracts, oils) with known chemical profiles. The platform computes a **fit score** (0–1) for each product-disease pair:

```
Product Chemistry (ligand concentrations)
    × Interaction Matrix (ligand→target effects & potencies)
    × Disease Definition (desired target actions)
    = Fit Score + aligned/counter target breakdown
```

- **Aligned targets**: Product's ligands act in the desired direction (e.g., disease wants CB1 agonism, product's THC activates CB1)
- **Counter targets**: Product's ligands act against the desired direction (potential side effects)
- **Score**: Overall therapeutic relevance weighted by potency and evidence strength

### Evidence Compilation

Ligand profiles compile evidence from peer-reviewed literature stratified by evidence level:

| Level | Weight | Example |
|---|---|---|
| Human RCT | 1.0 | Randomized controlled trial |
| Observational | 0.8 | Cohort or case-control study |
| Case Reports | 0.6 | Individual patient reports |
| Animal (in vivo) | 0.45 | Mouse/rat/dog studies |
| In Vitro | 0.25 | Cell culture / receptor binding |
| In Silico | 0.1 | Computational predictions |

Three scoring metrics summarize evidence quality per ligand:
- **NES** (Numeric Evidence Strength): Aggregates binding potency values
- **QES** (Qualitative Evidence Strength): Aggregates evidence-level weights
- **CES** (Combined Evidence Score): Weighted composite (70% QES + 30% NES)

---

## API Endpoints Used

All read-only, against the FastAPI backend at `/api/v1`:

| Endpoint | Used By |
|---|---|
| `GET /diseases?q=&limit=` | Disease list, home search |
| `GET /diseases/{slug}` | Disease detail screen |
| `GET /diseases/{slug}/products` | Disease detail products section |
| `GET /ligands/profiles/cards` | Profiles tab, home search |
| `GET /ligands/{slug}/profile` | Profile detail screen |
| `GET /reverse/ligand-diseases/{slug}` | Profile detail linked diseases |

## License

Private — Cannavigator project.
