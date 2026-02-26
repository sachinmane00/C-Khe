import type { Card, Subject } from '../../../types'
import ch01 from './math-ch-01-real-numbers.json'
import ch02 from './math-ch-02-polynomials.json'
import ch03 from './math-ch-03-linear-equations.json'
import ch04 from './math-ch-04-quadratic-equations.json'
import ch05 from './math-ch-05-arithmetic-progressions.json'
import ch06 from './math-ch-06-triangles.json'
import ch07 from './math-ch-07-coordinate-geometry.json'
import ch08 from './math-ch-08-trigonometry.json'
import ch09 from './math-ch-09-applications-trigonometry.json'
import ch10 from './math-ch-10-circles.json'
import ch11 from './math-ch-11-areas-circles.json'
import ch12 from './math-ch-12-surface-areas-volumes.json'
import ch13 from './math-ch-13-statistics.json'
import ch14 from './math-ch-14-probability.json'

interface ChapterFile {
  metadata: { subject: string; chapter: string; [key: string]: unknown }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subject = file.metadata.subject as Subject
  const chapter = file.metadata.chapter
  return file.cards.map((c) => ({ ...c, subject, chapter }) as Card)
}

const mathCards: Card[] = [
  ...loadChapter(ch01 as ChapterFile),
  ...loadChapter(ch02 as ChapterFile),
  ...loadChapter(ch03 as ChapterFile),
  ...loadChapter(ch04 as ChapterFile),
  ...loadChapter(ch05 as ChapterFile),
  ...loadChapter(ch06 as ChapterFile),
  ...loadChapter(ch07 as ChapterFile),
  ...loadChapter(ch08 as ChapterFile),
  ...loadChapter(ch09 as ChapterFile),
  ...loadChapter(ch10 as ChapterFile),
  ...loadChapter(ch11 as ChapterFile),
  ...loadChapter(ch12 as ChapterFile),
  ...loadChapter(ch13 as ChapterFile),
  ...loadChapter(ch14 as ChapterFile),
]

export default mathCards
