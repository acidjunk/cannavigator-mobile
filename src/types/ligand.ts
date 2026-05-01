import { Disease, Ligand, Target, PaperRef, PaperConclusion, LigandDiseaseClaim } from './disease';

export type RelationType =
  | 'agonist'
  | 'partial_agonist'
  | 'inverse_agonist'
  | 'antagonist'
  | 'positive_allosteric_modulator'
  | 'negative_allosteric_modulator'
  | 'inhibitor'
  | 'activator'
  | 'blocker'
  | 'desensitizer'
  | 'modulator'
  | 'binds'
  | 'displaces'
  | 'no_effect'
  | 'unclear';

export interface Relation {
  paper: PaperRef;
  predicate: RelationType;
  summary: string;
  evidence_sentence: string;
}

export interface LigandTargetMention {
  target: Target;
  paper_count: number;
  total_mentions: number;
  papers: PaperRef[];
  relations: Relation[];
}

export interface LigandDiseaseMention {
  disease: Disease;
  paper_count: number;
  total_mentions: number;
  papers: PaperRef[];
  ligand_disease_claims: LigandDiseaseClaim[];
}

export interface InteractionWithNames {
  id: string;
  target_id: string;
  ligand_id: string;
  effect: string;
  potency_type?: string | null;
  potency_nm?: number | null;
  reference?: string | null;
  url_or_doi?: string | null;
  input_type?: string | null;
  conflict: boolean;
  note?: string | null;
  target_slug: string;
  target_display_name: string;
  ligand_slug: string;
  ligand_display_name: string;
}

export interface LigandProfile extends Ligand {
  targets: LigandTargetMention[];
  diseases: LigandDiseaseMention[];
  conclusions: PaperConclusion[];
  paper_count: number;
  interactions: InteractionWithNames[];
  tagline?: string | null;
  short_description?: string | null;
  description_one_liner?: string | null;
  dashboard_card?: Record<string, unknown> | null;
  summary?: Record<string, unknown> | null;
  metrics?: Record<string, unknown> | null;
}
