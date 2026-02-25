import type { Subject } from '../types'

export type RootStackParamList = {
  Onboarding: undefined
  Tabs: undefined
  ReelFeed: { subject?: Subject }
}

export type TabParamList = {
  Home: undefined
  Study: undefined
  Profile: undefined
}
