import React, { useState, useRef, useMemo, useEffect } from 'react'
import { View, FlatList, Dimensions, StyleSheet, useColorScheme, TouchableOpacity, Text } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { darkTheme, lightTheme, type Theme } from '../../constants/theme'
import { useUserStore } from '../../store/userStore'
import { useContentStore } from '../../store/contentStore'
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
  const { cards, bookmarkCard, markTooEasy, setSubject } = useContentStore()

  const [activeIndex, setActiveIndex] = useState(0)
  const [showBookmarkFlash, setShowBookmarkFlash] = useState(false)
  const [xpPopup, setXpPopup] = useState({ visible: false, amount: 0 })

  const activeIndexRef = useRef(0)

  // Load subject from route params on mount
  useEffect(() => {
    const subject = route?.params?.subject
    if (subject) setSubject(subject)
  }, [route?.params?.subject])

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
  const insets = useSafeAreaInsets()
  // Page height = visible FlatList frame after top safe-area inset
  const pageHeight = SCREEN_HEIGHT - insets.top
  const styles = useMemo(() => createStyles(theme), [theme])

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
      <View style={styles.progressTrack} pointerEvents="none">
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      {/* Back button — only when pushed from Dashboard */}
      {canGoBack && (
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation!.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      )}

      {/* Streak badge */}
      <View style={styles.streakBadgeWrapper}>
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
    backBtn: {
      position: 'absolute',
      top: 10,
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
      fontFamily: 'Roboto_400Regular',
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
