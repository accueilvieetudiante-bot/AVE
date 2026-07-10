/**
 * Design system AVE — palette, rayons, ombres, dégradés.
 * Couleurs de base imposées par le brief produit (violet/bleu/fond/texte/
 * succès/alerte) ; les variantes dark sont dérivées pour un contraste AA.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EEF2FF',
    text: '#0F172A',
    textSecondary: '#64748B',
    primary: '#8B5CF6',
    secondary: '#2563EB',
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#F59E0B',
    border: 'rgba(15, 23, 42, 0.08)',
    card: 'rgba(255, 255, 255, 0.72)',
    cardSolid: '#FFFFFF',
    glassBg: 'rgba(255, 255, 255, 0.55)',
    glassBorder: 'rgba(255, 255, 255, 0.5)',
    dangerBg: 'rgba(239, 68, 68, 0.1)',
    successBg: 'rgba(34, 197, 94, 0.12)',
    warningBg: 'rgba(245, 158, 11, 0.12)',
  },
  dark: {
    background: '#0B1020',
    backgroundElement: '#161A2E',
    backgroundSelected: '#22264A',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    primary: '#A78BFA',
    secondary: '#60A5FA',
    success: '#4ADE80',
    danger: '#F87171',
    warning: '#FBBF24',
    border: 'rgba(255, 255, 255, 0.08)',
    card: 'rgba(30, 33, 54, 0.6)',
    cardSolid: '#161A2E',
    glassBg: 'rgba(30, 33, 54, 0.5)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    dangerBg: 'rgba(248, 113, 113, 0.14)',
    successBg: 'rgba(74, 222, 128, 0.14)',
    warningBg: 'rgba(251, 191, 36, 0.14)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Gradients = {
  brand: ['#2563EB', '#8B5CF6'] as [string, string],
  brandDark: ['#1E40AF', '#7C3AED'] as [string, string],
  success: ['#16A34A', '#22C55E'] as [string, string],
  danger: ['#DC2626', '#EF4444'] as [string, string],
};

export const Radius = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    android: { elevation: 4 },
    default: {},
  }),
  glow: Platform.select({
    ios: {
      shadowColor: '#8B5CF6',
      shadowOpacity: 0.25,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 8 },
    default: {},
  }),
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
