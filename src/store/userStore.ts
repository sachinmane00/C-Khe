import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserStats, Subject } from '../types'

interface UserStore extends UserStats {
  classLevel: number
  setClassLevel: (level: number) => void
  addXP: (amount: number) => void
  updateStreak: () => void
  unlockBadge: (badge: string) => void
  updateSubjectProgress: (subject: Subject, delta: number) => void
  resetStore: () => void
}

const initialState: UserStats = {
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  streakSaversLeft: 1,
  badges: [],
  subjectProgress: { Science: 0, Math: 0, SST: 0, English: 0, Hindi: 0 },
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      classLevel: 10,

      setClassLevel: (level) => set({ classLevel: level }),

      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

      updateStreak: () => {
        const today = new Date().toISOString().slice(0, 10)
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const { lastStudyDate, streak, streakSaversLeft } = get()

        if (lastStudyDate === null) {
          set({ streak: 1, lastStudyDate: today })
        } else if (lastStudyDate === today) {
          // no-op
        } else if (lastStudyDate === yesterday) {
          set({ streak: streak + 1, lastStudyDate: today })
        } else if (streakSaversLeft > 0) {
          set({ streakSaversLeft: streakSaversLeft - 1, lastStudyDate: today })
        } else {
          set({ streak: 1, lastStudyDate: today })
        }
      },

      unlockBadge: (badge) =>
        set((s) => ({
          badges: s.badges.includes(badge) ? s.badges : [...s.badges, badge],
        })),

      updateSubjectProgress: (subject, delta) =>
        set((s) => ({
          subjectProgress: {
            ...s.subjectProgress,
            [subject]: Math.min(100, s.subjectProgress[subject] + delta),
          },
        })),

      resetStore: () => set(initialState),
    }),
    {
      name: 'snaplearn-user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
