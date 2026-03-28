export interface Interaction {
  id: string;
  target_id: string;
  ligand_id: string;
  effect: string;
  potency_type: string | null;
  potency_nm: number | null;
  reference: string | null;
  url_or_doi: string | null;
  conflict: boolean;
  note: string | null;
}
