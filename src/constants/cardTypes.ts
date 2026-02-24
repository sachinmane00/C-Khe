import { theme } from './theme'
import type { CardType } from '../types'

export const cardTypeConfig: Record<CardType, { icon: string; color: string; label: string }> = {
  concept:     { icon: 'bulb-outline',        color: theme.colors.accentPurple, label: 'Concept' },
  examTip:     { icon: 'pencil-outline',      color: theme.colors.gold,         label: 'Exam Tip' },
  quiz:        { icon: 'help-circle-outline', color: theme.colors.accentOrange, label: 'Quiz' },
  memoryHook:  { icon: 'flash-outline',       color: theme.colors.accentTeal,   label: 'Memory Hook' },
  mindMapPeek: { icon: 'git-network-outline', color: theme.colors.accentPurple, label: 'Mind Map' },
}
