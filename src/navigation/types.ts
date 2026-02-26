import type { Card } from '../types'

export type RootStackParamList = {
  Onboarding: undefined      // splash screen only — replaces itself with PathSelection
  PathSelection: undefined   // "What are you studying for?"
  ClassSelection: undefined  // "Which class?"
  Tabs: undefined
  SubjectDrillDown: { subject: string; classLevel?: number }
  ReelFeed: {
    subject?: string
    chapterId?: string
    chapterTitle?: string
    cards?: Card[]
  }
}

export type TabParamList = {
  Home: undefined
  Profile: undefined
}
