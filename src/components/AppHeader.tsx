import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { HeaderLogo } from './HeaderLogo';
import { colors } from '../theme/colors';

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
};

// Custom header that replaces the default react-navigation header. Gives us
// full control over layout — the default Header bakes in marginStart on its
// left container that proved un-overridable via headerLeftContainerStyle,
// which kept pushing the logo ~70px right of the content gutter on web.
export function AppHeader({ title, showBack = false }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: colors.forest,
        paddingTop: insets.top,
        paddingHorizontal: 16,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}
    >
      {showBack ? (
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={{ paddingTop: 6, paddingRight: 8 }}
        >
          <ChevronLeft color={colors.white} size={24} />
        </Pressable>
      ) : null}
      <HeaderLogo />
      {title ? (
        <View
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingTop: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <Text numberOfLines={1} style={{ color: colors.white, fontSize: 18, fontWeight: '700' }}>
            {title}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
