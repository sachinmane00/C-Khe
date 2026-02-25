import type { Card, Subject } from '../../../types'
import ch01 from './sst-ch-01-nationalism-europe.json'
import ch02 from './sst-ch-02-nationalism-india.json'
import ch03 from './sst-ch-03-global-world.json'
import ch04 from './sst-ch-04-industrialisation.json'
import ch05 from './sst-ch-05-resources-development.json'
import ch06 from './sst-ch-06-power-sharing.json'
import ch07 from './sst-ch-07-development.json'
import ch08 from './sst-ch-08-money-credit.json'

interface ChapterFile {
  metadata: { subject: string; chapter: string; [key: string]: unknown }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subject = file.metadata.subject as Subject
  const chapter = file.metadata.chapter
  return file.cards.map((c) => ({ ...c, subject, chapter }) as Card)
}

const sstCards: Card[] = [
  ...loadChapter(ch01 as ChapterFile),
  ...loadChapter(ch02 as ChapterFile),
  ...loadChapter(ch03 as ChapterFile),
  ...loadChapter(ch04 as ChapterFile),
  ...loadChapter(ch05 as ChapterFile),
  ...loadChapter(ch06 as ChapterFile),
  ...loadChapter(ch07 as ChapterFile),
  ...loadChapter(ch08 as ChapterFile),
]

export default sstCards
