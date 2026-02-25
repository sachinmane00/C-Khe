import type { Card, Subject } from '../types'

export type RootStackParamList = {
  Onboarding: undefined
  Tabs: undefined
  SubjectDrillDown: { subject: Subject }
  ReelFeed: {
    subject?: Subject
    chapterId?: string
    chapterTitle?: string
    cards?: Card[]
  }
}

export type TabParamList = {
  Home: undefined
  Profile: undefined
}
