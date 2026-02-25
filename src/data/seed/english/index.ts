import type { Card, Subject } from '../../../types'
import ch01 from './eng-ch-01-letter-to-god.json'
import ch02 from './eng-ch-02-nelson-mandela.json'
import ch03 from './eng-ch-03-two-stories-flying.json'
import ch04 from './eng-ch-04-diary-anne-frank.json'
import ch05 from './eng-ch-05-grammar.json'
import ch06 from './eng-ch-06-writing-skills.json'

interface ChapterFile {
  metadata: { subject: string; chapter: string; [key: string]: unknown }
  cards: Omit<Card, 'subject' | 'chapter'>[]
}

function loadChapter(file: ChapterFile): Card[] {
  const subject = file.metadata.subject as Subject
  const chapter = file.metadata.chapter
  return file.cards.map((c) => ({ ...c, subject, chapter }) as Card)
}

const englishCards: Card[] = [
  ...loadChapter(ch01 as ChapterFile),
  ...loadChapter(ch02 as ChapterFile),
  ...loadChapter(ch03 as ChapterFile),
  ...loadChapter(ch04 as ChapterFile),
  ...loadChapter(ch05 as ChapterFile),
  ...loadChapter(ch06 as ChapterFile),
]

export default englishCards
