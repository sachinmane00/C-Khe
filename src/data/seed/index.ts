import type { Card, Subject } from '../../types'
import scienceCards from './science'
import mathCards    from './math'
import sstCards     from './sst'
import englishCards from './english'
import hindiCards   from './hindi'

export const seedData: Record<Subject, Card[]> = {
  Science: scienceCards,
  Math:    mathCards,
  SST:     sstCards,
  English: englishCards,
  Hindi:   hindiCards,
}

export const allSubjects: Subject[] = ['Science', 'Math', 'SST', 'English', 'Hindi']

export const subjectMeta: Record<Subject, {
  icon: string
  color: string
  emoji: string
  chaptersTotal: number
}> = {
  Science: { icon: 'flask',      color: '#14B8A6', emoji: '🔬', chaptersTotal: 13 },
  Math:    { icon: 'calculator', color: '#7C3AED', emoji: '📐', chaptersTotal: 14 },
  SST:     { icon: 'globe',      color: '#F97316', emoji: '🌍', chaptersTotal: 8  },
  English: { icon: 'book',       color: '#F59E0B', emoji: '📖', chaptersTotal: 6  },
  Hindi:   { icon: 'language',   color: '#EC4899', emoji: '✍️',  chaptersTotal: 5  },
}
