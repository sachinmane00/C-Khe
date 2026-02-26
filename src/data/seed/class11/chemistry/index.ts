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

import c11_chem_ch01 from './c11_chem_ch01.json'
import c11_chem_ch02 from './c11_chem_ch02.json'
import c11_chem_ch03 from './c11_chem_ch03.json'
import c11_chem_ch04 from './c11_chem_ch04.json'
import c11_chem_ch05 from './c11_chem_ch05.json'
import c11_chem_ch06 from './c11_chem_ch06.json'
import c11_chem_ch07 from './c11_chem_ch07.json'
import c11_chem_ch08 from './c11_chem_ch08.json'
import c11_chem_ch09 from './c11_chem_ch09.json'

const cards: Card[] = [
  ...loadChapter(c11_chem_ch01 as ChapterFile),
  ...loadChapter(c11_chem_ch02 as ChapterFile),
  ...loadChapter(c11_chem_ch03 as ChapterFile),
  ...loadChapter(c11_chem_ch04 as ChapterFile),
  ...loadChapter(c11_chem_ch05 as ChapterFile),
  ...loadChapter(c11_chem_ch06 as ChapterFile),
  ...loadChapter(c11_chem_ch07 as ChapterFile),
  ...loadChapter(c11_chem_ch08 as ChapterFile),
  ...loadChapter(c11_chem_ch09 as ChapterFile),
]

export default cards
