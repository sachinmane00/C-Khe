import type { Card } from '../../../types'

import english_cards from './english'
import math_cards from './math'
import hindi_cards from './hindi'
import evs_cards from './evs'

export const class04Data: Record<string, Card[]> = {
  'English': english_cards,
  'Math': math_cards,
  'Hindi': hindi_cards,
  'EVS': evs_cards,
}

export default class04Data
