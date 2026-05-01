export interface Disease {
  id: string;
  slug: string;
  display_name: string;
  primary_cluster?: string | null;
  secondary_cluster?: string | null;
  source_url?: string | null;
  synonyms?: string[];
}

export interface Target {
  id: string;
  slug: string;
  display_name: string;
  type: string;
  synonyms?: string[];
}

export interface Ligand {
  id: string;
  slug: string;
  display_name: string;
  type: string;
  chemical_family?: string | null;
  synonyms?: string[];
}

export type ClaimDirection =
  | 'therapeutic'
  | 'exacerbates'
  | 'neutral'
  | 'mechanistic_link'
  | 'mixed';

export type EvidenceLevel =
  | 'rct'
  | 'observational'
  | 'case_report'
  | 'animal'
  | 'in_vitro'
  | 'in_silico';

export type PublicationType =
  | 'original_research'
  | 'review'
  | 'meta_analysis'
  | 'case_report'
  | 'editorial';

export interface PaperRef {
  id: string;
  doi?: string | null;
  pmid?: string | null;
  title: string;
  journal?: string | null;
  year?: number | null;
  publication_type?: PublicationType | null;
  evidence_level?: EvidenceLevel | null;
}

export interface LigandDiseaseClaim {
  paper: PaperRef;
  direction: ClaimDirection;
  summary: string;
  evidence_sentence: string;
}

export interface TargetDiseaseClaim {
  paper: PaperRef;
  direction: ClaimDirection;
  summary: string;
  evidence_sentence: string;
}

export interface DesiredEffect {
  target: Target;
  desired_effect: string;
  evidence?: string | null;
  confidence?: number | null;
  is_override: boolean;
}

export interface DiseaseTargetMention {
  target: Target;
  paper_count: number;
  total_mentions: number;
  papers: PaperRef[];
  target_disease_claims: TargetDiseaseClaim[];
}

export interface DiseaseLigandMention {
  ligand: Ligand;
  paper_count: number;
  total_mentions: number;
  papers: PaperRef[];
  ligand_disease_claims: LigandDiseaseClaim[];
}

export interface PaperConclusion {
  paper: PaperRef;
  direction?: ClaimDirection | null;
  evidence_sentence: string;
  primary_ligands: Ligand[];
  primary_targets: Target[];
  primary_diseases: Disease[];
}

export interface DiseaseProfile extends Disease {
  literature_text?: string | null;
  desired_effects: DesiredEffect[];
  ligands: DiseaseLigandMention[];
  targets: DiseaseTargetMention[];
  conclusions: PaperConclusion[];
  paper_count: number;
  blocks_by_section?: Record<string, unknown> | null;
  excluded_blocks?: unknown[] | null;
  tagline?: string | null;
  short_description?: string | null;
  description_one_liner?: string | null;
  dashboard_card?: Record<string, unknown> | null;
  summary?: Record<string, unknown> | null;
  metrics?: Record<string, unknown> | null;
}

// Legacy alias kept so existing imports stay green during the migration.
export type DiseaseDetail = DiseaseProfile;
