import type { Card } from '../../../types'

import english_cards from './english'
import math_cards from './math'
import science_cards from './science'
import hindi_cards from './hindi'
import history_cards from './history'
import geography_cards from './geography'
import political_science_cards from './political-science'
import economics_cards from './economics'

export const class10Data: Record<string, Card[]> = {
  'English': english_cards,
  'Math': math_cards,
  'Science': science_cards,
  'Hindi': hindi_cards,
  'History': history_cards,
  'Geography': geography_cards,
  'Political Science': political_science_cards,
  'Economics': economics_cards,
}

export default class10Data
