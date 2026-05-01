import { useQuery } from '@tanstack/react-query';
import { fetchLigands, fetchLigandProfile } from '../api/ligands';

export function useLigands(params?: { type?: string; q?: string }) {
  return useQuery({
    queryKey: ['ligands', params?.type ?? 'all', params?.q ?? ''],
    queryFn: () => fetchLigands(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLigandProfile(slug: string) {
  return useQuery({
    queryKey: ['ligand-profile', slug],
    queryFn: () => fetchLigandProfile(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
