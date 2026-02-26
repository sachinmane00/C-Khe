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

import c2_math_ch01 from './c2_math_ch01.json'
import c2_math_ch02 from './c2_math_ch02.json'
import c2_math_ch03 from './c2_math_ch03.json'
import c2_math_ch04 from './c2_math_ch04.json'
import c2_math_ch05 from './c2_math_ch05.json'
import c2_math_ch06 from './c2_math_ch06.json'
import c2_math_ch07 from './c2_math_ch07.json'
import c2_math_ch08 from './c2_math_ch08.json'
import c2_math_ch09 from './c2_math_ch09.json'
import c2_math_ch10 from './c2_math_ch10.json'
import c2_math_ch11 from './c2_math_ch11.json'
import c2_math_ch12 from './c2_math_ch12.json'
import c2_math_ch13 from './c2_math_ch13.json'
import c2_math_ch14 from './c2_math_ch14.json'
import c2_math_ch15 from './c2_math_ch15.json'

const cards: Card[] = [
  ...loadChapter(c2_math_ch01 as ChapterFile),
  ...loadChapter(c2_math_ch02 as ChapterFile),
  ...loadChapter(c2_math_ch03 as ChapterFile),
  ...loadChapter(c2_math_ch04 as ChapterFile),
  ...loadChapter(c2_math_ch05 as ChapterFile),
  ...loadChapter(c2_math_ch06 as ChapterFile),
  ...loadChapter(c2_math_ch07 as ChapterFile),
  ...loadChapter(c2_math_ch08 as ChapterFile),
  ...loadChapter(c2_math_ch09 as ChapterFile),
  ...loadChapter(c2_math_ch10 as ChapterFile),
  ...loadChapter(c2_math_ch11 as ChapterFile),
  ...loadChapter(c2_math_ch12 as ChapterFile),
  ...loadChapter(c2_math_ch13 as ChapterFile),
  ...loadChapter(c2_math_ch14 as ChapterFile),
  ...loadChapter(c2_math_ch15 as ChapterFile),
]

export default cards
