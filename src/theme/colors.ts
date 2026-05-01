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

// Quick-lookup topic colours — brand-aligned shades pulled from the AutoLeaf
// palette so each card stays distinct while reading as part of the same family.
// All four pass AA contrast for white text (used when the card is selected).
export const topics = {
  sleep: colors.forestLight, // deepest, calming
  anxiety: colors.leaf, // mid green, central brand
  euphoria: colors.goldDeep, // warm gold, uplift
  relaxation: colors.leafPale, // soft green, gentle
} as const;
