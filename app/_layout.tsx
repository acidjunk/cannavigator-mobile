import React from 'react';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { brand } from '../src/theme/colors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: brand.darkGreen },
            headerTintColor: brand.white,
            headerTitleStyle: { fontWeight: 'bold' },
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
