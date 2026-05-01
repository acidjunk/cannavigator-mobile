import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { LigandCard } from '../../src/components/LigandCard';
import { Ligand } from '../../src/types/disease';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}

describe('LigandCard', () => {
  const ligand: Ligand = {
    id: '1',
    slug: 'cbd',
    display_name: 'CBD',
    type: 'Phytocannabinoid',
    chemical_family: 'Cannabinoid',
    synonyms: ['Cannabidiol', 'CBD-A'],
  };

  it('renders ligand name and type', () => {
    const { getByText } = render(
      <Wrapper>
        <LigandCard ligand={ligand} onPress={() => {}} />
      </Wrapper>,
    );
    expect(getByText('CBD')).toBeTruthy();
    expect(getByText('Phytocannabinoid')).toBeTruthy();
  });

  it('renders chemical family and synonyms when present', () => {
    const { getByText } = render(
      <Wrapper>
        <LigandCard ligand={ligand} onPress={() => {}} />
      </Wrapper>,
    );
    expect(getByText('Cannabinoid')).toBeTruthy();
    expect(getByText('Cannabidiol · CBD-A')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <LigandCard ligand={ligand} onPress={onPress} />
      </Wrapper>,
    );
    fireEvent.press(getByText('CBD'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
