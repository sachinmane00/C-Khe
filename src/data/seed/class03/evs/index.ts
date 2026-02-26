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

import c3_evs_ch01 from './c3_evs_ch01.json'
import c3_evs_ch02 from './c3_evs_ch02.json'
import c3_evs_ch03 from './c3_evs_ch03.json'
import c3_evs_ch04 from './c3_evs_ch04.json'
import c3_evs_ch05 from './c3_evs_ch05.json'
import c3_evs_ch06 from './c3_evs_ch06.json'
import c3_evs_ch07 from './c3_evs_ch07.json'
import c3_evs_ch08 from './c3_evs_ch08.json'
import c3_evs_ch09 from './c3_evs_ch09.json'
import c3_evs_ch10 from './c3_evs_ch10.json'
import c3_evs_ch11 from './c3_evs_ch11.json'
import c3_evs_ch12 from './c3_evs_ch12.json'
import c3_evs_ch13 from './c3_evs_ch13.json'
import c3_evs_ch14 from './c3_evs_ch14.json'
import c3_evs_ch15 from './c3_evs_ch15.json'
import c3_evs_ch16 from './c3_evs_ch16.json'
import c3_evs_ch17 from './c3_evs_ch17.json'
import c3_evs_ch18 from './c3_evs_ch18.json'
import c3_evs_ch19 from './c3_evs_ch19.json'
import c3_evs_ch20 from './c3_evs_ch20.json'
import c3_evs_ch21 from './c3_evs_ch21.json'
import c3_evs_ch22 from './c3_evs_ch22.json'
import c3_evs_ch23 from './c3_evs_ch23.json'
import c3_evs_ch24 from './c3_evs_ch24.json'

const cards: Card[] = [
  ...loadChapter(c3_evs_ch01 as ChapterFile),
  ...loadChapter(c3_evs_ch02 as ChapterFile),
  ...loadChapter(c3_evs_ch03 as ChapterFile),
  ...loadChapter(c3_evs_ch04 as ChapterFile),
  ...loadChapter(c3_evs_ch05 as ChapterFile),
  ...loadChapter(c3_evs_ch06 as ChapterFile),
  ...loadChapter(c3_evs_ch07 as ChapterFile),
  ...loadChapter(c3_evs_ch08 as ChapterFile),
  ...loadChapter(c3_evs_ch09 as ChapterFile),
  ...loadChapter(c3_evs_ch10 as ChapterFile),
  ...loadChapter(c3_evs_ch11 as ChapterFile),
  ...loadChapter(c3_evs_ch12 as ChapterFile),
  ...loadChapter(c3_evs_ch13 as ChapterFile),
  ...loadChapter(c3_evs_ch14 as ChapterFile),
  ...loadChapter(c3_evs_ch15 as ChapterFile),
  ...loadChapter(c3_evs_ch16 as ChapterFile),
  ...loadChapter(c3_evs_ch17 as ChapterFile),
  ...loadChapter(c3_evs_ch18 as ChapterFile),
  ...loadChapter(c3_evs_ch19 as ChapterFile),
  ...loadChapter(c3_evs_ch20 as ChapterFile),
  ...loadChapter(c3_evs_ch21 as ChapterFile),
  ...loadChapter(c3_evs_ch22 as ChapterFile),
  ...loadChapter(c3_evs_ch23 as ChapterFile),
  ...loadChapter(c3_evs_ch24 as ChapterFile),
]

export default cards
