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

import c11_bio_ch01 from './c11_bio_ch01.json'
import c11_bio_ch02 from './c11_bio_ch02.json'
import c11_bio_ch03 from './c11_bio_ch03.json'
import c11_bio_ch04 from './c11_bio_ch04.json'
import c11_bio_ch05 from './c11_bio_ch05.json'
import c11_bio_ch06 from './c11_bio_ch06.json'
import c11_bio_ch07 from './c11_bio_ch07.json'
import c11_bio_ch08 from './c11_bio_ch08.json'
import c11_bio_ch09 from './c11_bio_ch09.json'
import c11_bio_ch10 from './c11_bio_ch10.json'
import c11_bio_ch11 from './c11_bio_ch11.json'
import c11_bio_ch12 from './c11_bio_ch12.json'
import c11_bio_ch13 from './c11_bio_ch13.json'
import c11_bio_ch14 from './c11_bio_ch14.json'
import c11_bio_ch15 from './c11_bio_ch15.json'
import c11_bio_ch16 from './c11_bio_ch16.json'
import c11_bio_ch17 from './c11_bio_ch17.json'
import c11_bio_ch18 from './c11_bio_ch18.json'
import c11_bio_ch19 from './c11_bio_ch19.json'

const cards: Card[] = [
  ...loadChapter(c11_bio_ch01 as ChapterFile),
  ...loadChapter(c11_bio_ch02 as ChapterFile),
  ...loadChapter(c11_bio_ch03 as ChapterFile),
  ...loadChapter(c11_bio_ch04 as ChapterFile),
  ...loadChapter(c11_bio_ch05 as ChapterFile),
  ...loadChapter(c11_bio_ch06 as ChapterFile),
  ...loadChapter(c11_bio_ch07 as ChapterFile),
  ...loadChapter(c11_bio_ch08 as ChapterFile),
  ...loadChapter(c11_bio_ch09 as ChapterFile),
  ...loadChapter(c11_bio_ch10 as ChapterFile),
  ...loadChapter(c11_bio_ch11 as ChapterFile),
  ...loadChapter(c11_bio_ch12 as ChapterFile),
  ...loadChapter(c11_bio_ch13 as ChapterFile),
  ...loadChapter(c11_bio_ch14 as ChapterFile),
  ...loadChapter(c11_bio_ch15 as ChapterFile),
  ...loadChapter(c11_bio_ch16 as ChapterFile),
  ...loadChapter(c11_bio_ch17 as ChapterFile),
  ...loadChapter(c11_bio_ch18 as ChapterFile),
  ...loadChapter(c11_bio_ch19 as ChapterFile),
]

export default cards
