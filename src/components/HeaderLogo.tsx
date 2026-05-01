import React from 'react';
import { Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export function HeaderLogo() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate('/')}
      accessibilityRole="link"
      accessibilityLabel="Go to home"
      hitSlop={8}
      // Padding/positioning is handled by the parent AppHeader so the logo
      // sits flush with the surrounding 16px page-content gutter.
      style={{ alignSelf: 'flex-start' }}
    >
      <Image
        source={require('../../assets/logo-white.png')}
        // The white logo PNG is ~1.25:1 (1075x860). Sizing the box to match
        // that ratio keeps the visible mark flush with the Pressable's left
        // edge instead of letterboxing inside a wider container.
        style={{ width: 60, height: 48, resizeMode: 'contain' }}
      />
    </Pressable>
  );
}
