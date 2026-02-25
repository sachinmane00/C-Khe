export type CardType = 'concept' | 'examTip' | 'quiz' | 'memoryHook' | 'mindMapPeek'

export type Subject = 'Science' | 'Math' | 'SST' | 'English' | 'Hindi'

export type Difficulty = 1 | 2 | 3

export interface ConceptContent {
  topic: string
  body: string
  analogy?: string
}

export interface ExamTipContent {
  exactPhrase: string
  instruction: string
}

export interface QuizContent {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface MemoryHookContent {
  mnemonic: string
  story: string
}

export interface MindMapPeekContent {
  centralTopic: string
  connections: string[]
}

export interface Card {
  id: string
  type: CardType
  subject: Subject
  chapter: string
  topic?: string
  difficulty: Difficulty
  xpValue: number
  content: ConceptContent | ExamTipContent | QuizContent | MemoryHookContent | MindMapPeekContent
}

export interface UserStats {
  xp: number
  streak: number
  lastStudyDate: string | null
  streakSaversLeft: number
  badges: string[]
  subjectProgress: Record<Subject, number>
}

export interface Chapter {
  id: string
  subject: Subject
  title: string
  topics: string[]
  cardCount: number
}

export interface SearchResult {
  type: 'card' | 'chapter'
  card?: Card
  chapter?: Chapter
  relevanceScore: number
  matchedOn: string
}

export type SearchState = 'idle' | 'searching' | 'done' | 'error'
