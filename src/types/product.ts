export interface Product {
  id: string;
  slug: string;
  display_name: string;
  route?: string | null;
  cohort_type?: string | null;
}
