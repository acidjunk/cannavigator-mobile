import apiClient from './client';
import { Product, ProductDiseaseScore } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/products');
  return data;
}

export async function fetchProductDiseases(slug: string): Promise<ProductDiseaseScore[]> {
  const { data } = await apiClient.get<ProductDiseaseScore[]>(`/products/${slug}/diseases`);
  return data;
}
