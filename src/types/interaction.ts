export interface InteractionMatrixCell {
  effect: string;
  potency_type?: string | null;
  potency_nm?: number | null;
  reference?: string | null;
}

export interface InteractionMatrixRow {
  target_slug: string;
  target_display_name: string;
  ligands: Record<string, InteractionMatrixCell[]>;
}
