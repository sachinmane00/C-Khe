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

import c6_eng_ch01 from './c6_eng_ch01.json'
import c6_eng_ch02 from './c6_eng_ch02.json'
import c6_eng_ch03 from './c6_eng_ch03.json'
import c6_eng_ch04 from './c6_eng_ch04.json'
import c6_eng_ch05 from './c6_eng_ch05.json'
import c6_eng_ch06 from './c6_eng_ch06.json'
import c6_eng_ch07 from './c6_eng_ch07.json'
import c6_eng_ch08 from './c6_eng_ch08.json'
import c6_eng_ch09 from './c6_eng_ch09.json'
import c6_eng_ch10 from './c6_eng_ch10.json'

const cards: Card[] = [
  ...loadChapter(c6_eng_ch01 as ChapterFile),
  ...loadChapter(c6_eng_ch02 as ChapterFile),
  ...loadChapter(c6_eng_ch03 as ChapterFile),
  ...loadChapter(c6_eng_ch04 as ChapterFile),
  ...loadChapter(c6_eng_ch05 as ChapterFile),
  ...loadChapter(c6_eng_ch06 as ChapterFile),
  ...loadChapter(c6_eng_ch07 as ChapterFile),
  ...loadChapter(c6_eng_ch08 as ChapterFile),
  ...loadChapter(c6_eng_ch09 as ChapterFile),
  ...loadChapter(c6_eng_ch10 as ChapterFile),
]

export default cards
