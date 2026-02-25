import React from 'react'
import { View, Text, TextStyle, ViewStyle } from 'react-native'

// LaTeX → Unicode substitutions applied in order
const SYMBOL_REPLACEMENTS: [RegExp, string][] = [
  [/\\xrightarrow\{[^}]*\}/g, ' → '],
  [/\\rightarrow/g, ' → '],
  [/\\leftarrow/g, ' ← '],
  [/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)'],
  [/\\sqrt\{([^}]+)\}/g, '√($1)'],
  [/\\sqrt/g, '√'],
  [/\\times/g, '×'],
  [/\\pm/g, '±'],
  [/\\rho/g, 'ρ'],
  [/\\Omega\b/g, 'Ω'],
  [/\\omega\b/g, 'ω'],
  [/\\alpha\b/g, 'α'],
  [/\\beta\b/g, 'β'],
  [/\\gamma\b/g, 'γ'],
  [/\\Delta\b/g, 'Δ'],
  [/\\delta\b/g, 'δ'],
  [/\\lambda\b/g, 'λ'],
  [/\\mu\b/g, 'μ'],
  [/\\pi\b/g, 'π'],
  [/\\infty/g, '∞'],
  [/\\propto/g, '∝'],
  [/\\leq/g, '≤'],
  [/\\geq/g, '≥'],
  [/\\neq/g, '≠'],
  [/\\approx/g, '≈'],
  [/\\cdot/g, '·'],
  [/\\circ/g, '°'],
]

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', 'n': 'ⁿ', 'a': 'ᵃ',
}
const SUB: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋',
}

function processLatex(raw: string): string {
  let s = raw

  for (const [pattern, replacement] of SYMBOL_REPLACEMENTS) {
    s = s.replace(pattern, replacement)
  }

  // Superscript ^{...} or ^x
  s = s.replace(/\^\{([^}]+)\}/g, (_, inner: string) =>
    inner.split('').map((c) => SUP[c] ?? c).join('')
  )
  s = s.replace(/\^([0-9+\-na])/g, (_, c: string) => SUP[c] ?? `^${c}`)

  // Subscript _{...} or _x
  s = s.replace(/_\{([^}]+)\}/g, (_, inner: string) =>
    inner.split('').map((c) => SUB[c] ?? c).join('')
  )
  s = s.replace(/_([0-9+\-])/g, (_, c: string) => SUB[c] ?? `_${c}`)

  // Drop remaining LaTeX commands (with or without braces)
  s = s.replace(/\\[a-zA-Z]+\{[^}]*\}/g, '')
  s = s.replace(/\\[a-zA-Z]+/g, '')
  s = s.replace(/[{}]/g, '')

  return s.trim()
}

type Segment =
  | { type: 'plain'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'math'; text: string; display: boolean }

function parseSegments(raw: string): Segment[] {
  const regex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$|\*\*([\s\S]*?)\*\*/g
  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'plain', text: raw.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'math', text: processLatex(match[1]), display: true })
    } else if (match[2] !== undefined) {
      segments.push({ type: 'math', text: processLatex(match[2]), display: false })
    } else if (match[3] !== undefined) {
      segments.push({ type: 'bold', text: match[3] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < raw.length) {
    segments.push({ type: 'plain', text: raw.slice(lastIndex) })
  }

  return segments
}

interface Props {
  text: string
  textStyle?: TextStyle
  mathColor?: string
  style?: ViewStyle
}

export default function MathText({ text, textStyle, mathColor, style }: Props) {
  if (!text) return null

  const segments = parseSegments(text)

  type Row = { isDisplay: true; mathText: string } | { isDisplay: false; segs: Segment[] }
  const rows: Row[] = []
  let current: Segment[] = []

  function flushRow() {
    if (current.length > 0) {
      rows.push({ isDisplay: false, segs: current })
      current = []
    }
  }

  for (const seg of segments) {
    if (seg.type === 'math' && seg.display) {
      flushRow()
      rows.push({ isDisplay: true, mathText: seg.text })
    } else if (seg.type === 'plain') {
      const lines = seg.text.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
          current.push({ type: 'plain', text: lines[i] })
        }
        if (i < lines.length - 1) {
          flushRow()
        }
      }
    } else {
      current.push(seg)
    }
  }
  flushRow()

  const mathStyle: TextStyle = {
    ...textStyle,
    color: mathColor ?? textStyle?.color,
    fontFamily: 'SpaceGrotesk_500Medium',
  }

  return (
    <View style={style}>
      {rows.map((row, ri) => {
        if (row.isDisplay) {
          return (
            <View key={ri} style={{ alignItems: 'center', marginVertical: 6, paddingVertical: 2 }}>
              <Text style={mathStyle}>{row.mathText}</Text>
            </View>
          )
        }

        return (
          <View
            key={ri}
            style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 2 }}
          >
            {row.segs.map((seg, si) => {
              if (seg.type === 'plain') {
                return <Text key={si} style={textStyle}>{seg.text}</Text>
              }
              if (seg.type === 'bold') {
                return (
                  <Text key={si} style={[textStyle, { fontFamily: 'SpaceGrotesk_700Bold' }]}>
                    {seg.text}
                  </Text>
                )
              }
              if (seg.type === 'math') {
                return <Text key={si} style={mathStyle}>{seg.text}</Text>
              }
              return null
            })}
          </View>
        )
      })}
    </View>
  )
}
