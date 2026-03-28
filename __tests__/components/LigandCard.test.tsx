import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { LigandCard } from '../../src/components/LigandCard';
import { LigandProfileCard } from '../../src/types/ligand';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}

describe('LigandCard', () => {
  const card: LigandProfileCard = {
    ligand_slug: 'cbd',
    ligand_display_name: 'CBD',
    ligand_type: 'Phytocannabinoid',
    dashboard_card: {
      headline: 'Multi-target modulator',
      tagline: 'Broad spectrum activity',
      top_targets: [],
      mechanistic_highlights: ['Anti-inflammatory'],
      disease_relevance: ['Epilepsy', 'Pain', 'Anxiety', 'Depression'],
    },
  };

  it('renders ligand name and headline', () => {
    const { getByText } = render(
      <Wrapper>
        <LigandCard card={card} onPress={() => {}} />
      </Wrapper>,
    );
    expect(getByText('CBD')).toBeTruthy();
    expect(getByText('Multi-target modulator')).toBeTruthy();
  });

  it('shows disease relevance tags (max 3) with overflow count', () => {
    const { getByText } = render(
      <Wrapper>
        <LigandCard card={card} onPress={() => {}} />
      </Wrapper>,
    );
    expect(getByText('Epilepsy')).toBeTruthy();
    expect(getByText('+1 more')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <LigandCard card={card} onPress={onPress} />
      </Wrapper>,
    );
    fireEvent.press(getByText('CBD'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
