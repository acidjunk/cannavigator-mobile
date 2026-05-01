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
        // insets.left/right cover the iPhone landscape notch and dynamic
        // island so the logo and title don't slide under them. In portrait
        // these are 0 and only the 16px gutter applies.
        paddingLeft: 16 + insets.left,
        paddingRight: 16 + insets.right,
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
        <Text
          numberOfLines={1}
          style={{
            color: colors.white,
            fontSize: 22,
            fontWeight: '700',
            paddingLeft: 24,
            // Vertically center the title with the 48px-tall logo. The parent
            // row uses alignItems: 'flex-start' to keep the logo glued to the
            // top, so we opt the title back into center alignment here.
            alignSelf: 'center',
            flexShrink: 1,
          }}
        >
          {title}
        </Text>
      ) : null}
    </View>
  );
}
