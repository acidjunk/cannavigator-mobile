import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-style/react';
import { colors } from './colors';

export const gluestackConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary50: '#E8F0EC',
      primary100: '#C5DACD',
      primary200: colors.mint,
      primary300: colors.leafPale,
      primary400: colors.leafLight,
      primary500: colors.leaf,
      primary600: colors.forestLight,
      primary700: colors.forest,
      primary800: colors.forest,
      primary900: colors.forest,
      secondary500: colors.gold,
      secondary600: colors.goldDeep,
      success500: colors.leafLight,
      success600: colors.leaf,
      backgroundLight50: colors.cream,
    },
  },
});
