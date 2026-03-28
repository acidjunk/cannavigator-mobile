import apiClient from './client';
import { Disease, DiseaseDetail } from '../types/disease';
import { ProductDiseaseScore } from '../types/product';

export async function fetchDiseases(params?: { q?: string; limit?: number }): Promise<Disease[]> {
  const { data } = await apiClient.get<Disease[]>('/diseases', {
    params: { limit: params?.limit ?? 500, q: params?.q || undefined },
  });
  return data;
}

export async function fetchDiseaseDetail(slug: string): Promise<DiseaseDetail> {
  const { data } = await apiClient.get<DiseaseDetail>(`/diseases/${slug}`);
  return data;
}

export async function fetchDiseaseProducts(slug: string): Promise<ProductDiseaseScore[]> {
  const { data } = await apiClient.get<ProductDiseaseScore[]>(`/diseases/${slug}/products`);
  return data;
}
