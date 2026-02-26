import type { Card } from '../../../types'

import english_cards from './english'
import math_cards from './math'
import hindi_cards from './hindi'
import science_cards from './science'
import history_cards from './history'
import geography_cards from './geography'

export const class06Data: Record<string, Card[]> = {
  'English': english_cards,
  'Math': math_cards,
  'Hindi': hindi_cards,
  'Science': science_cards,
  'History': history_cards,
  'Geography': geography_cards,
}

export default class06Data
