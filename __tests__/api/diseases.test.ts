import axios from 'axios';
import { fetchDiseases, fetchDiseaseDetail, fetchDiseaseProducts } from '../../src/api/diseases';

jest.mock('../../src/api/client', () => {
  const mockAxios = {
    get: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  };
  return { __esModule: true, default: mockAxios };
});

import apiClient from '../../src/api/client';
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe('diseases API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchDiseases calls /diseases with default limit', async () => {
    const mockData = [{ id: '1', slug: 'epilepsy', display_name: 'Epilepsy' }];
    mockedClient.get.mockResolvedValue({ data: mockData });

    const result = await fetchDiseases();

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases', {
      params: { limit: 500, q: undefined },
    });
    expect(result).toEqual(mockData);
  });

  it('fetchDiseases passes search query', async () => {
    mockedClient.get.mockResolvedValue({ data: [] });

    await fetchDiseases({ q: 'epilepsy' });

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases', {
      params: { limit: 500, q: 'epilepsy' },
    });
  });

  it('fetchDiseaseDetail calls /diseases/{slug}', async () => {
    const mockDetail = {
      id: '1',
      slug: 'epilepsy',
      display_name: 'Epilepsy',
      targets: [],
      ligands: [],
      desired_effects: [],
    };
    mockedClient.get.mockResolvedValue({ data: mockDetail });

    const result = await fetchDiseaseDetail('epilepsy');

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases/epilepsy');
    expect(result).toEqual(mockDetail);
  });

  it('fetchDiseaseProducts calls /diseases/{slug}/products', async () => {
    const mockProducts = [{ disease: { id: '1' }, score: 0.8, aligned_count: 5, counter_count: 1 }];
    mockedClient.get.mockResolvedValue({ data: mockProducts });

    const result = await fetchDiseaseProducts('epilepsy');

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases/epilepsy/products');
    expect(result).toEqual(mockProducts);
  });
});
