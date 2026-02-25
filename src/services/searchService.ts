import type { Card, Chapter, SearchResult } from '../types'
import { allChapters } from '../data/seed/cbse10_chapters'
import { seedData } from '../data/seed'

function normalize(str: string): string {
  return str.toLowerCase().trim()
}

function scoreText(text: string, query: string): number {
  const t = normalize(text)
  const q = normalize(query)
  if (t === q) return 100
  if (t.startsWith(q)) return 80
  if (t.includes(q)) return 60
  // Check word overlap
  const queryWords = q.split(/\s+/).filter((w) => w.length > 2)
  const matchedWords = queryWords.filter((w) => t.includes(w))
  if (matchedWords.length > 0) return (matchedWords.length / queryWords.length) * 40
  return 0
}

export function searchCards(query: string, cards: Card[]): SearchResult[] {
  if (!query.trim()) return []
  const results: SearchResult[] = []

  for (const card of cards) {
    let best = 0
    let matchedOn = ''

    const content = card.content as unknown as Record<string, unknown>

    // Score each searchable text field
    const fieldsToScore: Array<[string, string]> = [
      [card.chapter, 'chapter'],
      [card.subject, 'subject'],
    ]

    if (typeof content.topic === 'string') fieldsToScore.push([content.topic, 'topic'])
    if (typeof content.body === 'string') fieldsToScore.push([content.body, 'body'])
    if (typeof content.question === 'string') fieldsToScore.push([content.question, 'question'])
    if (typeof content.exactPhrase === 'string') fieldsToScore.push([content.exactPhrase, 'phrase'])
    if (typeof content.mnemonic === 'string') fieldsToScore.push([content.mnemonic, 'mnemonic'])
    if (typeof content.centralTopic === 'string') fieldsToScore.push([content.centralTopic, 'mindmap'])

    for (const [text, field] of fieldsToScore) {
      const s = scoreText(text, query)
      if (s > best) {
        best = s
        matchedOn = field
      }
    }

    if (best > 0) {
      results.push({ type: 'card', card, relevanceScore: best, matchedOn })
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 20)
}

export function searchChapters(query: string): SearchResult[] {
  if (!query.trim()) return []
  const results: SearchResult[] = []

  for (const chapter of allChapters) {
    let best = scoreText(chapter.title, query)
    let matchedOn = 'title'

    const topicScore = chapter.topics.reduce((max, t) => Math.max(max, scoreText(t, query)), 0)
    if (topicScore > best) {
      best = topicScore
      matchedOn = 'topic'
    }

    const subjectScore = scoreText(chapter.subject, query)
    if (subjectScore > best) {
      best = subjectScore
      matchedOn = 'subject'
    }

    if (best > 0) {
      results.push({ type: 'chapter', chapter, relevanceScore: best, matchedOn })
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 10)
}

export function combineResults(query: string): SearchResult[] {
  // Get all seed cards across all subjects
  const allCards: Card[] = Object.values(seedData).flat()

  const cardResults = searchCards(query, allCards)
  const chapterResults = searchChapters(query)

  // Interleave: chapters first if high relevance, then cards
  const highRelevanceChapters = chapterResults.filter((r) => r.relevanceScore >= 60)
  const remainingChapters = chapterResults.filter((r) => r.relevanceScore < 60)

  return [...highRelevanceChapters, ...cardResults, ...remainingChapters].slice(0, 25)
}
