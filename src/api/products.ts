import apiClient from './client';
import { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/products');
  return data;
}
