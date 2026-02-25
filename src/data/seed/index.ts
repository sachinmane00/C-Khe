import science from './cbse10_science.json'
import scienceFull from './cbse10_science_full.json'
import math from './cbse10_math.json'
import mathFull from './cbse10_math_full.json'
import type { Card, Subject } from '../../types'

export const seedData: Record<Subject, Card[]> = {
  Science: [...science, ...scienceFull] as Card[],
  Math: [...math, ...mathFull] as Card[],
  SST: [],
  English: [],
  Hindi: [],
}

export const allSubjects: Subject[] = ['Science', 'Math', 'SST', 'English', 'Hindi']

export const subjectMeta: Record<Subject, {
  icon: string
  color: string
  emoji: string
  chaptersTotal: number
}> = {
  Science: { icon: 'flask',      color: '#14B8A6', emoji: '🔬', chaptersTotal: 16 },
  Math:    { icon: 'calculator', color: '#7C3AED', emoji: '📐', chaptersTotal: 15 },
  SST:     { icon: 'globe',      color: '#F97316', emoji: '🌍', chaptersTotal: 20 },
  English: { icon: 'book',       color: '#F59E0B', emoji: '📖', chaptersTotal: 12 },
  Hindi:   { icon: 'language',   color: '#EC4899', emoji: '✍️',  chaptersTotal: 14 },
}
