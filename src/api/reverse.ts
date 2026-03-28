import apiClient from './client';
import { Disease } from '../types/disease';

export async function fetchLigandDiseases(slug: string): Promise<Disease[]> {
  const { data } = await apiClient.get<Disease[]>(`/reverse/ligand-diseases/${slug}`);
  return data;
}

export async function fetchTargetDiseases(slug: string): Promise<Disease[]> {
  const { data } = await apiClient.get<Disease[]>(`/reverse/target-diseases/${slug}`);
  return data;
}
