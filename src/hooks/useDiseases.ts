import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchDiseases, fetchDiseaseDetail, fetchDiseaseProducts } from '../api/diseases';

export function useDiseases(searchQuery?: string) {
  return useQuery({
    queryKey: ['diseases', searchQuery ?? ''],
    queryFn: () => fetchDiseases({ q: searchQuery, limit: 500 }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useDiseaseDetail(slug: string) {
  return useQuery({
    queryKey: ['disease', slug],
    queryFn: () => fetchDiseaseDetail(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDiseaseProducts(slug: string) {
  return useQuery({
    queryKey: ['disease-products', slug],
    queryFn: () => fetchDiseaseProducts(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
