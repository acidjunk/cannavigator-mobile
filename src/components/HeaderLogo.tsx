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
      style={{
        // Align the logo's left edge with the page content (16px) and pin
        // it to the top of whatever container the header places this slot
        // in. Padding lives on the Pressable so it works the same on
        // native-stack and bottom-tabs (native-stack doesn't expose
        // headerLeftContainerStyle).
        paddingLeft: 16,
        paddingTop: 0,
        alignSelf: 'flex-start',
      }}
    >
      <Image
        source={require('../../assets/logo-white.png')}
        style={{ width: 188, height: 40, resizeMode: 'contain' }}
      />
    </Pressable>
  );
}
