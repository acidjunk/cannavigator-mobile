import { fetchLigandProfileCards, fetchLigandProfile } from '../../src/api/ligands';

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

  it('fetchLigandProfileCards calls /ligands/profiles/cards', async () => {
    const mockCards = [
      {
        ligand_slug: 'cbd',
        ligand_display_name: 'CBD',
        ligand_type: 'Phytocannabinoid',
        dashboard_card: { headline: 'Test', tagline: 'Test tag' },
      },
    ];
    mockedClient.get.mockResolvedValue({ data: mockCards });

    const result = await fetchLigandProfileCards();

    expect(mockedClient.get).toHaveBeenCalledWith('/ligands/profiles/cards');
    expect(result).toEqual(mockCards);
  });

  it('fetchLigandProfile calls /ligands/{slug}/profile', async () => {
    const mockProfile = {
      ligand_id: '1',
      dashboard_card: null,
      summary: null,
      ecs_mechanistic: null,
      evidence_sections: null,
    };
    mockedClient.get.mockResolvedValue({ data: mockProfile });

    const result = await fetchLigandProfile('cbd');

    expect(mockedClient.get).toHaveBeenCalledWith('/ligands/cbd/profile');
    expect(result).toEqual(mockProfile);
  });
});
