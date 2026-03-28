import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { SearchBar } from '../../src/components/SearchBar';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GluestackUIProvider config={config}>{children}</GluestackUIProvider>;
}

describe('SearchBar', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Wrapper>
        <SearchBar value="" onChangeText={() => {}} placeholder="Search here..." />
      </Wrapper>,
    );
    expect(getByPlaceholderText('Search here...')).toBeTruthy();
  });

  it('debounces onChangeText by 300ms', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Wrapper>
        <SearchBar value="" onChangeText={onChangeText} placeholder="Search..." />
      </Wrapper>,
    );

    fireEvent.changeText(getByPlaceholderText('Search...'), 'test');

    expect(onChangeText).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onChangeText).toHaveBeenCalledWith('test');
  });
});
