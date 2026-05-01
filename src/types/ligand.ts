export interface Ligand {
  id: string;
  slug: string;
  display_name: string;
  type: string;
  chemical_family: string | null;
  synonyms: string[];
}

export interface DashboardCard {
  headline: string;
  tagline: string;
  top_targets: { target: string; potency: string; comment: string }[];
  mechanistic_highlights: string[];
  disease_relevance: string[];
  summary?: string;
}

export interface LigandProfileCard {
  ligand_slug: string;
  ligand_display_name: string;
  ligand_type: string;
  dashboard_card: DashboardCard | null;
}

export interface LigandProfile {
  ligand_id: string;
  dashboard_card: DashboardCard | null;
  summary: Record<string, { title: string; bullets: string[] }> | null;
  ecs_mechanistic: unknown;
  evidence_sections: unknown;
}
