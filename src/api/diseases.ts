import apiClient from './client';
import { Disease, DiseaseProfile } from '../types/disease';

export async function fetchDiseases(params?: {
  q?: string;
  limit?: number;
  skip?: number;
}): Promise<Disease[]> {
  const { data } = await apiClient.get<Disease[]>('/diseases', {
    params: {
      limit: params?.limit ?? 500,
      q: params?.q || undefined,
      skip: params?.skip,
    },
  });
  return data;
}

export async function fetchDiseaseDetail(slug: string): Promise<DiseaseProfile> {
  const { data } = await apiClient.get<DiseaseProfile>(`/diseases/${slug}`);
  return data;
}
