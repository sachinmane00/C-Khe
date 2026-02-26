import type { Card } from '../../../../types'

interface ChapterFile {
  metadata: { subject: string; chapter: string; classLevel: number }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subj    = file.metadata.subject
  const chapter = file.metadata.chapter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return file.cards.map((c) => ({ ...c, subject: subj as any, chapter }) as Card)
}

import c12_eco_ch01 from './c12_eco_ch01.json'
import c12_eco_ch02 from './c12_eco_ch02.json'
import c12_eco_ch03 from './c12_eco_ch03.json'
import c12_eco_ch04 from './c12_eco_ch04.json'
import c12_eco_ch05 from './c12_eco_ch05.json'

const cards: Card[] = [
  ...loadChapter(c12_eco_ch01 as ChapterFile),
  ...loadChapter(c12_eco_ch02 as ChapterFile),
  ...loadChapter(c12_eco_ch03 as ChapterFile),
  ...loadChapter(c12_eco_ch04 as ChapterFile),
  ...loadChapter(c12_eco_ch05 as ChapterFile),
]

export default cards
