import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchDiseases, fetchDiseaseDetail } from '../api/diseases';

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
