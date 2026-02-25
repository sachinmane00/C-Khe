import React, { useState, useRef, useMemo, useEffect } from 'react'
import {
  View, FlatList, Dimensions, StyleSheet, useColorScheme,
  TouchableOpacity, Text,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import { useContentStore } from '../../store/contentStore'
import { seedData, subjectMeta } from '../../data/seed'
import ConceptCard from '../../components/cards/ConceptCard'
import ExamTipCard from '../../components/cards/ExamTipCard'
import QuizCard from '../../components/cards/QuizCard'
import StreakBadge from '../../components/ui/StreakBadge'
import XPPopup from './XPPopup'
import type { Card, Subject } from '../../types'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import type { RootStackParamList } from '../../navigation/types'

type Nav = NativeStackNavigationProp<RootStackParamList, 'ReelFeed'>
type Route = RouteProp<RootStackParamList, 'ReelFeed'>

interface Props {
  navigation?: Nav
  route?: Route
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function ReelFeed({ navigation, route }: Props) {
  const scheme = useColorScheme()
  const theme = scheme === 'dark' ? darkTheme : lightTheme

  const { streak, addXP, updateStreak } = useUserStore()
  const { cards, bookmarkCard, markTooEasy, setSubject, setCards } = useContentStore()

  const [activeIndex, setActiveIndex] = useState(0)
  const [showBookmarkFlash, setShowBookmarkFlash] = useState(false)
  const [xpPopup, setXpPopup] = useState({ visible: false, amount: 0 })
  const [cardsReady, setCardsReady] = useState(false)

  const activeIndexRef = useRef(0)
  const insets = useSafeAreaInsets()
  const pageHeight = SCREEN_HEIGHT - insets.top

  // Stable param refs — extracted once
  const params = route?.params
  const chapterTitle = params?.chapterTitle
  const subject = params?.subject as Subject | undefined
  const hasChapterId = Boolean(params?.chapterId)
  const subjectEmoji = subject ? (subjectMeta[subject]?.emoji ?? '📚') : '📚'

  // ── Init: clear store and load the right cards ──────────────────────────
  useEffect(() => {
    setCards([])
    setCardsReady(false)
    setActiveIndex(0)
    activeIndexRef.current = 0

    // Injected card array (from search result)
    if (params?.cards && params.cards.length > 0) {
      setCards(params.cards)
      setCardsReady(true)
      return
    }

    // Chapter drill-down: filter seed cards
    if (params?.chapterId && params?.chapterTitle && params?.subject) {
      const allSubjectCards: Card[] = seedData[params.subject] ?? []
      const searchTitle = params.chapterTitle.toLowerCase()
      const filtered = allSubjectCards.filter((c) => {
        const cardChapter = c.chapter.toLowerCase()
        const cardTopic = (c.topic ?? '').toLowerCase()
        if (cardChapter === searchTitle) return true
        if (cardChapter.includes(searchTitle) || searchTitle.includes(cardChapter)) return true
        const keywords = searchTitle.split(' ').filter((w) => w.length > 4)
        return keywords.some((kw) => cardChapter.includes(kw) || cardTopic.includes(kw))
      })
      console.log(
        `[ReelFeed] chapter filter "${params.chapterTitle}" → ${filtered.length}/${allSubjectCards.length} cards`
      )

      setCards(filtered)
      setCardsReady(true)
      return
    }

    // Subject-only: load full subject cards
    if (params?.subject) {
      setSubject(params.subject)
      setCardsReady(true)
      return
    }

    // Default: keep whatever was in the store
    setCardsReady(true)
  }, []) // run once on mount

  // ── FlatList handlers ────────────────────────────────────────────────────
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
        cardContent = <ConceptCard card={card} onGotIt={() => handleXP(card)} />
        break
      case 'examTip':
        cardContent = <ExamTipCard card={card} onBookmark={() => handleBookmark(card)} />
        break
      case 'quiz':
        cardContent = <QuizCard card={card} onAnswer={(_, xp) => addXP(xp)} />
        break
      default:
        return null
    }
    return (
      <View style={[styles.cardScreen, { height: pageHeight, paddingTop: theme.spacing.xxl + 4 }]}>
        {cardContent}
      </View>
    )
  }

  const canGoBack = navigation?.canGoBack?.() ?? false
  const styles = useMemo(() => createStyles(theme), [theme])

  // ── Blank while initialising ─────────────────────────────────────────────
  if (!cardsReady) {
    return <SafeAreaView style={styles.screen} edges={['top']} />
  }

  // ── Coming soon screen (chapter has no cards yet) ─────────────────────────
  if (cardsReady && cards.length === 0 && hasChapterId) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centeredState}>
          <Text style={styles.bigEmoji}>{subjectEmoji}</Text>
          <Text style={[styles.comingSoonTitle, { color: theme.colors.textPrimary }]}>
            Cards coming soon for
          </Text>
          <Text style={[styles.comingSoonChapter, { color: theme.colors.accentPurple }]} numberOfLines={2}>
            {chapterTitle}
          </Text>
          <Text style={[styles.comingSoonSub, { color: theme.colors.textSecondary }]}>
            We're adding more content every week!
          </Text>
          {canGoBack && (
            <TouchableOpacity
              style={[styles.backPillBtn, { backgroundColor: theme.colors.accentPurple }]}
              onPress={() => navigation!.goBack()}
            >
              <Text style={[styles.backPillBtnText, { color: '#F1F5F9' }]}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    )
  }

  // ── Main reel feed ───────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToInterval={pageHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Progress bar */}
      <View style={[styles.progressTrack, { top: insets.top }]} pointerEvents="none">
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Back button */}
      {canGoBack && (
        <TouchableOpacity
          style={[styles.backBtn, { top: insets.top + 10 }]}
          onPress={() => navigation!.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      )}

      {/* Streak badge */}
      <View style={[styles.streakBadgeWrapper, { top: insets.top + 12 }]}>
        <StreakBadge streak={streak} />
      </View>

      {/* Bookmark flash */}
      {showBookmarkFlash && (
        <View style={styles.bookmarkFlash} pointerEvents="none">
          <View style={styles.bookmarkFlashInner} />
        </View>
      )}

      <XPPopup visible={xpPopup.visible} amount={xpPopup.amount} />
    </SafeAreaView>
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
    // ── Coming soon screen ──
    centeredState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: t.spacing.xl,
      gap: t.spacing.md,
    },
    bigEmoji: {
      fontSize: 72,
      marginBottom: t.spacing.sm,
    },
    comingSoonTitle: {
      fontSize: t.fontSize.lg,
      fontFamily: 'SpaceGrotesk_500Medium',
      textAlign: 'center',
    },
    comingSoonChapter: {
      fontSize: t.fontSize.xl,
      fontFamily: 'SpaceGrotesk_700Bold',
      textAlign: 'center',
    },
    comingSoonSub: {
      fontSize: t.fontSize.md,
      fontFamily: 'DMSans_400Regular',
      textAlign: 'center',
    },
    backPillBtn: {
      borderRadius: t.borderRadius.md,
      paddingVertical: t.spacing.sm,
      paddingHorizontal: t.spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      marginTop: t.spacing.md,
    },
    backPillBtnText: {
      fontSize: t.fontSize.md,
      fontFamily: 'SpaceGrotesk_700Bold',
    },
    // ── Reel overlays ──
    progressTrack: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: t.colors.surface,
    },
    progressFill: {
      height: 3,
      backgroundColor: t.colors.accentPurple,
    },
    backBtn: {
      position: 'absolute',
      left: 12,
      zIndex: 10,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgba(0,0,0,0.35)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backIcon: {
      color: '#F1F5F9',
      fontSize: 28,
      lineHeight: 32,
      fontFamily: 'DMSans_400Regular',
    },
    streakBadgeWrapper: {
      position: 'absolute',
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
