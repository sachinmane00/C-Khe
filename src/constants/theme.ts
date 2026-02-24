const shared = {
  accentPurple: '#7C3AED',
  accentOrange: '#F97316',
  accentTeal: '#14B8A6',
  gold: '#F59E0B',
  success: '#22C55E',
  error: '#EF4444',
}

export const darkTheme = {
  colors: {
    background: '#0F0F1A',
    surface: '#1A1A2E',
    card: '#16213E',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    ...shared,
  },
  fontSize: {
    xs: 13,
    sm: 15,
    md: 17,
    lg: 22,
    xl: 26,
    xxl: 34,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    full: 999,
  },
}

export const lightTheme = {
  ...darkTheme,
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    ...shared,
  },
}

export type Theme = typeof darkTheme

// Kept for cardTypes.ts (accent colors are identical in both themes)
export const theme = darkTheme
