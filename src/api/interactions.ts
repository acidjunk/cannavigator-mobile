import apiClient from './client';
import { InteractionMatrixRow } from '../types/interaction';

export async function fetchInteractionMatrix(): Promise<InteractionMatrixRow[]> {
  const { data } = await apiClient.get<InteractionMatrixRow[]>('/interactions/matrix');
  return data;
}
