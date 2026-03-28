import { Disease } from './disease';

export interface Product {
  id: string;
  slug: string;
  display_name: string;
  route: string | null;
  cohort_type: string | null;
}

export interface ProductDiseaseScore {
  disease: Disease;
  score: number | null;
  aligned_count: number;
  counter_count: number;
  details?: Record<string, unknown> | null;
}

export interface DiseaseProductScore {
  product: Product;
  score: number | null;
  aligned_count: number;
  counter_count: number;
  details?: Record<string, unknown> | null;
}
