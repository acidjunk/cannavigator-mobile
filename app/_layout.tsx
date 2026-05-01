import React from 'react';
import { Image } from 'react-native';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { brand } from '../src/theme/colors';
import { gluestackConfig } from '../src/theme/gluestack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

const HeaderLogo = () => (
  <Image
    source={require('../assets/logo-white.png')}
    style={{ width: 188, height: 40, marginLeft: 4, marginRight: 4, resizeMode: 'contain' }}
  />
);

export default function RootLayout() {
  return (
    <GluestackUIProvider config={gluestackConfig}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: brand.darkGreen },
            headerTintColor: brand.white,
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => <HeaderLogo />,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="diseases/[slug]" options={{ title: 'Disease Detail' }} />
          <Stack.Screen name="profiles/[slug]" options={{ title: 'Profile Detail' }} />
        </Stack>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
