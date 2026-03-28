export interface Disease {
  id: string;
  slug: string;
  display_name: string;
  source_url?: string | null;
  literature_text?: string | null;
}

export interface Target {
  id: string;
  slug: string;
  display_name: string;
  type: string;
}

export interface DiseaseTarget {
  target: Target;
  role: string | null;
  frequency: number;
}

export interface Ligand {
  id: string;
  slug: string;
  display_name: string;
  type: string;
  chemical_family: string | null;
  synonyms: string[];
}

export interface DiseaseLigand {
  ligand: Ligand;
  category: string | null;
  frequency: number;
}

export interface DesiredEffect {
  target: Target;
  desired_effect: string;
  evidence: string | null;
  confidence: number | null;
  is_override: boolean;
}

export interface DiseaseDetail extends Disease {
  targets: DiseaseTarget[];
  ligands: DiseaseLigand[];
  desired_effects: DesiredEffect[];
}
