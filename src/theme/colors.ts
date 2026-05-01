// AutoLeaf brand palette — aligned to the website Tailwind tokens.
export const colors = {
  forest: '#0B211D',
  forestLight: '#132E28',
  leaf: '#3D7A50',
  leafLight: '#4A9660',
  leafPale: '#6FB87F',
  mint: '#A8D5B8',
  cream: '#F8FAF9',
  charcoal: '#1A1A1A',
  grayWarm: '#4A4A4A',
  gold: '#E5C866',
  goldDeep: '#D2B354',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255,255,255,0.7)',
  whiteSubtle: 'rgba(255,255,255,0.4)',
} as const;

// Backward-compat alias — existing `brand.*` imports keep working and pick
// up the new palette automatically. New code should import `colors` directly.
export const brand = {
  darkGreen: colors.forest,
  sage: colors.leaf,
  lightSage: colors.gold,
  pageBg: colors.cream,
  cardBg: colors.white,
  textDark: colors.charcoal,
  textMuted: colors.grayWarm,
  white: colors.white,
  whiteMuted: colors.whiteMuted,
  whiteSubtle: colors.whiteSubtle,
} as const;

export const topics = {
  sleep: '#4F6D7A',
  anxiety: '#5B8A72',
  euphoria: '#C49B3C',
  relaxation: '#6B8F71',
} as const;
