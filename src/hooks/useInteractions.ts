import { useQuery } from '@tanstack/react-query';
import { fetchInteractionMatrix } from '../api/interactions';

export function useInteractionMatrix() {
  return useQuery({
    queryKey: ['interaction-matrix'],
    queryFn: fetchInteractionMatrix,
    staleTime: 10 * 60 * 1000,
  });
}
