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
    >
      <Image
        source={require('../../assets/logo-white.png')}
        style={{ width: 188, height: 40, marginLeft: 4, marginRight: 4, resizeMode: 'contain' }}
      />
    </Pressable>
  );
}
