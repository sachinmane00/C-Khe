import type { Card, Subject } from '../../types'
import scienceCards from './class10/science'
import mathCards    from './class10/math'
import sstCards     from './class10/history'
import englishCards from './class10/english'
import hindiCards   from './class10/hindi'

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

// ── Multi-class data (Classes 1–12) ──────────────────────────────────────────
// Each class folder's index.ts exports a Record<subject, Card[]>
// Cards are empty until JSON files are filled; Class 10 re-exports from flat folders
export { default as class01Data } from './class01'
export { default as class02Data } from './class02'
export { default as class03Data } from './class03'
export { default as class04Data } from './class04'
export { default as class05Data } from './class05'
export { default as class06Data } from './class06'
export { default as class07Data } from './class07'
export { default as class08Data } from './class08'
export { default as class09Data } from './class09'
export { default as class10Data } from './class10'
export { default as class11Data } from './class11'
export { default as class12Data } from './class12'
