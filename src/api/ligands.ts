import apiClient from './client';
import { Ligand } from '../types/disease';
import { LigandProfileCard, LigandProfile } from '../types/ligand';

export async function fetchLigands(params?: { type?: string }): Promise<Ligand[]> {
  const { data } = await apiClient.get<Ligand[]>('/ligands', {
    params: params?.type ? { type: params.type } : undefined,
  });
  return data;
}

export async function fetchLigandProfileCards(): Promise<LigandProfileCard[]> {
  const { data } = await apiClient.get<LigandProfileCard[]>('/ligands/profiles/cards');
  return data;
}

export async function fetchLigandProfile(slug: string): Promise<LigandProfile> {
  const { data } = await apiClient.get<LigandProfile>(`/ligands/${slug}/profile`);
  return data;
}
