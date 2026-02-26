import type { Card, Subject } from '../../../types'
import ch01 from './hin-ch-01-sparsh-prose.json'
import ch02 from './hin-ch-02-sparsh-poetry.json'
import ch03 from './hin-ch-03-sanchayan.json'
import ch04 from './hin-ch-04-vyakaran.json'
import ch05 from './hin-ch-05-lekhan-kaushal.json'

interface ChapterFile {
  metadata: { subject: string; chapter: string; [key: string]: unknown }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subject = file.metadata.subject as Subject
  const chapter = file.metadata.chapter
  return file.cards.map((c) => ({ ...c, subject, chapter }) as Card)
}

const hindiCards: Card[] = [
  ...loadChapter(ch01 as ChapterFile),
  ...loadChapter(ch02 as ChapterFile),
  ...loadChapter(ch03 as ChapterFile),
  ...loadChapter(ch04 as ChapterFile),
  ...loadChapter(ch05 as ChapterFile),
]

export default hindiCards
