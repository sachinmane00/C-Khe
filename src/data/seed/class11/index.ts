import type { Card } from '../../../types'

import english_cards from './english'
import math_cards from './math'
import physics_cards from './physics'
import chemistry_cards from './chemistry'
import biology_cards from './biology'
import hindi_cards from './hindi'

export const class11Data: Record<string, Card[]> = {
  'English': english_cards,
  'Math': math_cards,
  'Physics': physics_cards,
  'Chemistry': chemistry_cards,
  'Biology': biology_cards,
  'Hindi': hindi_cards,
}

export default class11Data
