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

import c8_sci_ch01 from './c8_sci_ch01.json'
import c8_sci_ch02 from './c8_sci_ch02.json'
import c8_sci_ch03 from './c8_sci_ch03.json'
import c8_sci_ch04 from './c8_sci_ch04.json'
import c8_sci_ch05 from './c8_sci_ch05.json'
import c8_sci_ch06 from './c8_sci_ch06.json'
import c8_sci_ch07 from './c8_sci_ch07.json'
import c8_sci_ch08 from './c8_sci_ch08.json'
import c8_sci_ch09 from './c8_sci_ch09.json'
import c8_sci_ch10 from './c8_sci_ch10.json'
import c8_sci_ch11 from './c8_sci_ch11.json'
import c8_sci_ch12 from './c8_sci_ch12.json'
import c8_sci_ch13 from './c8_sci_ch13.json'
import c8_sci_ch14 from './c8_sci_ch14.json'
import c8_sci_ch15 from './c8_sci_ch15.json'
import c8_sci_ch16 from './c8_sci_ch16.json'
import c8_sci_ch17 from './c8_sci_ch17.json'
import c8_sci_ch18 from './c8_sci_ch18.json'

const cards: Card[] = [
  ...loadChapter(c8_sci_ch01 as ChapterFile),
  ...loadChapter(c8_sci_ch02 as ChapterFile),
  ...loadChapter(c8_sci_ch03 as ChapterFile),
  ...loadChapter(c8_sci_ch04 as ChapterFile),
  ...loadChapter(c8_sci_ch05 as ChapterFile),
  ...loadChapter(c8_sci_ch06 as ChapterFile),
  ...loadChapter(c8_sci_ch07 as ChapterFile),
  ...loadChapter(c8_sci_ch08 as ChapterFile),
  ...loadChapter(c8_sci_ch09 as ChapterFile),
  ...loadChapter(c8_sci_ch10 as ChapterFile),
  ...loadChapter(c8_sci_ch11 as ChapterFile),
  ...loadChapter(c8_sci_ch12 as ChapterFile),
  ...loadChapter(c8_sci_ch13 as ChapterFile),
  ...loadChapter(c8_sci_ch14 as ChapterFile),
  ...loadChapter(c8_sci_ch15 as ChapterFile),
  ...loadChapter(c8_sci_ch16 as ChapterFile),
  ...loadChapter(c8_sci_ch17 as ChapterFile),
  ...loadChapter(c8_sci_ch18 as ChapterFile),
]

export default cards
