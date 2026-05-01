import apiClient from './client';
import { Ligand } from '../types/disease';
import { LigandProfile } from '../types/ligand';

export async function fetchLigands(params?: { type?: string; q?: string }): Promise<Ligand[]> {
  const { data } = await apiClient.get<Ligand[]>('/ligands', {
    params: {
      type: params?.type || undefined,
      q: params?.q || undefined,
    },
  });
  return data;
}

export async function fetchLigandProfile(slug: string): Promise<LigandProfile> {
  const { data } = await apiClient.get<LigandProfile>(`/ligands/${slug}`);
  return data;
}
