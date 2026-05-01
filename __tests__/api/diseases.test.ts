import { fetchDiseases, fetchDiseaseDetail } from '../../src/api/diseases';

import apiClient from '../../src/api/client';

jest.mock('../../src/api/client', () => {
  const mockAxios = {
    get: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  };
  return { __esModule: true, default: mockAxios };
});
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
      params: { limit: 500, q: undefined, skip: undefined },
    });
    expect(result).toEqual(mockData);
  });

  it('fetchDiseases passes search query', async () => {
    mockedClient.get.mockResolvedValue({ data: [] });

    await fetchDiseases({ q: 'epilepsy' });

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases', {
      params: { limit: 500, q: 'epilepsy', skip: undefined },
    });
  });

  it('fetchDiseaseDetail calls /diseases/{slug}', async () => {
    const mockProfile = {
      id: '1',
      slug: 'epilepsy',
      display_name: 'Epilepsy',
      synonyms: [],
      targets: [],
      ligands: [],
      desired_effects: [],
      conclusions: [],
      paper_count: 0,
    };
    mockedClient.get.mockResolvedValue({ data: mockProfile });

    const result = await fetchDiseaseDetail('epilepsy');

    expect(mockedClient.get).toHaveBeenCalledWith('/diseases/epilepsy');
    expect(result).toEqual(mockProfile);
  });
});
