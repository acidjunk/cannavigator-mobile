import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { DiseaseCard } from '../../src/components/DiseaseCard';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}

describe('DiseaseCard', () => {
  const disease = {
    id: '1',
    slug: 'epilepsy',
    display_name: 'Epilepsy',
    source_url: 'https://example.com',
  };

  it('renders disease name', () => {
    const { getByText } = render(
      <Wrapper>
        <DiseaseCard disease={disease} onPress={() => {}} />
      </Wrapper>,
    );
    expect(getByText('Epilepsy')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Wrapper>
        <DiseaseCard disease={disease} onPress={onPress} />
      </Wrapper>,
    );
    fireEvent.press(getByText('Epilepsy'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
