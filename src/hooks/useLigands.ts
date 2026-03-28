import { useQuery } from '@tanstack/react-query';
import { fetchLigandProfileCards, fetchLigandProfile } from '../api/ligands';
import { fetchLigandDiseases } from '../api/reverse';

export function useLigandProfileCards() {
  return useQuery({
    queryKey: ['ligand-profile-cards'],
    queryFn: fetchLigandProfileCards,
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

export function useLigandDiseases(slug: string) {
  return useQuery({
    queryKey: ['ligand-diseases', slug],
    queryFn: () => fetchLigandDiseases(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
