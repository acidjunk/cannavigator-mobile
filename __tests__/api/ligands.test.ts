import { fetchLigands, fetchLigandProfile } from '../../src/api/ligands';

import apiClient from '../../src/api/client';

jest.mock('../../src/api/client', () => {
  const mockAxios = {
    get: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  };
  return { __esModule: true, default: mockAxios };
});
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe('ligands API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchLigands calls /ligands', async () => {
    const mockLigands = [
      {
        id: '1',
        slug: 'cbd',
        display_name: 'CBD',
        type: 'Phytocannabinoid',
        chemical_family: null,
        synonyms: [],
      },
    ];
    mockedClient.get.mockResolvedValue({ data: mockLigands });

    const result = await fetchLigands();

    expect(mockedClient.get).toHaveBeenCalledWith('/ligands', {
      params: { type: undefined, q: undefined },
    });
    expect(result).toEqual(mockLigands);
  });

  it('fetchLigands passes type filter', async () => {
    mockedClient.get.mockResolvedValue({ data: [] });

    await fetchLigands({ type: 'Terpene' });

    expect(mockedClient.get).toHaveBeenCalledWith('/ligands', {
      params: { type: 'Terpene', q: undefined },
    });
  });

  it('fetchLigandProfile calls /ligands/{slug}', async () => {
    const mockProfile = {
      id: '1',
      slug: 'cbd',
      display_name: 'CBD',
      type: 'Phytocannabinoid',
      synonyms: [],
      targets: [],
      diseases: [],
      conclusions: [],
      paper_count: 0,
      interactions: [],
    };
    mockedClient.get.mockResolvedValue({ data: mockProfile });

    const result = await fetchLigandProfile('cbd');

    expect(mockedClient.get).toHaveBeenCalledWith('/ligands/cbd');
    expect(result).toEqual(mockProfile);
  });
});
