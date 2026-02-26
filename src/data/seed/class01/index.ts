import type { Card } from '../../../types'

import english_cards from './english'
import math_cards from './math'
import hindi_cards from './hindi'

export const class01Data: Record<string, Card[]> = {
  'English': english_cards,
  'Math': math_cards,
  'Hindi': hindi_cards,
}

export default class01Data
