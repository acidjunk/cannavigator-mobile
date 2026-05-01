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
        style={{ width: 188, height: 40, resizeMode: 'contain' }}
      />
    </Pressable>
  );
}
