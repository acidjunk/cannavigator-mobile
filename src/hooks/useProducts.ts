import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductDiseases } from '../api/products';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductDiseases(slug: string) {
  return useQuery({
    queryKey: ['product-diseases', slug],
    queryFn: () => fetchProductDiseases(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
