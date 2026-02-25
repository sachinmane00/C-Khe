import type { Card, Subject } from '../../../types'
import ch01 from './sci-ch-01-chemical-reactions.json'
import ch02 from './sci-ch-02-acids-bases-salts.json'
import ch03 from './sci-ch-03-metals-non-metals.json'
import ch04 from './sci-ch-04-carbon-compounds.json'
import ch05 from './sci-ch-05-life-processes.json'
import ch06 from './sci-ch-06-control-coordination.json'
import ch07 from './sci-ch-07-reproduction.json'
import ch08 from './sci-ch-08-heredity-evolution.json'
import ch09 from './sci-ch-09-light-reflection-refraction.json'
import ch10 from './sci-ch-10-human-eye.json'
import ch11 from './sci-ch-11-electricity.json'
import ch12 from './sci-ch-12-magnetic-effects.json'
import ch13 from './sci-ch-13-our-environment.json'

interface ChapterFile {
  metadata: { subject: string; chapter: string; [key: string]: unknown }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subject = file.metadata.subject as Subject
  const chapter = file.metadata.chapter
  return file.cards.map((c) => ({ ...c, subject, chapter }) as Card)
}

const scienceCards: Card[] = [
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
]

export default scienceCards
