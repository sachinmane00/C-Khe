import React, { useState, useRef, useMemo } from 'react'
import { View, FlatList, Dimensions, StyleSheet, useColorScheme } from 'react-native'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import { useContentStore } from '../../store/contentStore'
import ConceptCard from '../../components/cards/ConceptCard'
import ExamTipCard from '../../components/cards/ExamTipCard'
import QuizCard from '../../components/cards/QuizCard'
import StreakBadge from '../../components/ui/StreakBadge'
import XPPopup from './XPPopup'
import type { Card } from '../../types'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function ReelFeed() {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const { streak, addXP, updateStreak } = useUserStore()
  const { cards, bookmarkCard, markTooEasy } = useContentStore()

  const [activeIndex, setActiveIndex] = useState(0)
  const [showBookmarkFlash, setShowBookmarkFlash] = useState(false)
  const [xpPopup, setXpPopup] = useState({ visible: false, amount: 0 })

  const activeIndexRef = useRef(0)

  // onViewableItemsChanged must be a stable ref — Zustand actions + setState are stable
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const newIdx = viewableItems[0].index as number
      if (newIdx !== activeIndexRef.current) {
        activeIndexRef.current = newIdx
        setActiveIndex(newIdx)
        updateStreak()
      }
    }
  }).current

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current

  const progressWidth =
    cards.length > 0 ? ((activeIndex + 1) / cards.length) * SCREEN_WIDTH : 0

  function handleXP(card: Card) {
    addXP(card.xpValue)
    setXpPopup({ visible: true, amount: card.xpValue })
    setTimeout(() => setXpPopup({ visible: false, amount: 0 }), 1500)
  }

  function handleBookmark(card: Card) {
    bookmarkCard(card.id)
    setShowBookmarkFlash(true)
    setTimeout(() => setShowBookmarkFlash(false), 1000)
  }

  function renderItem({ item: card }: { item: Card }) {
    let cardContent: React.ReactNode = null

    switch (card.type) {
      case 'concept':
        cardContent = (
          <ConceptCard card={card} onGotIt={() => handleXP(card)} />
        )
        break
      case 'examTip':
        cardContent = (
          <ExamTipCard card={card} onBookmark={() => handleBookmark(card)} />
        )
        break
      case 'quiz':
        cardContent = (
          <QuizCard card={card} onAnswer={(_, xp) => addXP(xp)} />
        )
        break
      default:
        return null
    }

    return (
      <View style={[styles.cardScreen, { paddingTop: theme.spacing.xxl + 4 }]}>
        {cardContent}
      </View>
    )
  }

  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.screen}>
      {/* Full-screen FlatList — native snapping handles all vertical swipes */}
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={SCREEN_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Progress bar — absolute overlay at top */}
      <View style={styles.progressTrack} pointerEvents="none">
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Streak badge — absolute top-right */}
      <View style={styles.streakBadgeWrapper}>
        <StreakBadge streak={streak} />
      </View>

      {/* Bookmark flash */}
      {showBookmarkFlash && (
        <View style={styles.bookmarkFlash} pointerEvents="none">
          <View style={styles.bookmarkFlashInner} />
        </View>
      )}

      {/* XP popup */}
      <XPPopup visible={xpPopup.visible} amount={xpPopup.amount} />
    </View>
  )
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    cardScreen: {
      height: SCREEN_HEIGHT,
      padding: t.spacing.md,
    },
    progressTrack: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: t.colors.surface,
    },
    progressFill: {
      height: 3,
      backgroundColor: t.colors.accentPurple,
    },
    streakBadgeWrapper: {
      position: 'absolute',
      top: 12,
      right: 16,
      zIndex: 10,
    },
    bookmarkFlash: {
      ...StyleSheet.absoluteFillObject,
      borderWidth: 3,
      borderColor: t.colors.gold,
      borderRadius: t.borderRadius.lg,
      margin: t.spacing.md,
      zIndex: 5,
    },
    bookmarkFlashInner: {
      flex: 1,
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderRadius: t.borderRadius.lg,
    },
  })
}
