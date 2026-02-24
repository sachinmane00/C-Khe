# SnapLearn — Project Context for Claude Code

## What this app is
SnapLearn is a reel-style micro-learning app for CBSE 10th students.
Think Instagram Reels but every swipe = one exam concept.
Built with React Native (Expo) + TypeScript.

## Tech Stack
- Expo SDK (latest)
- React Navigation v6 (Stack + Bottom Tabs)
- Zustand for global state
- React Native Reanimated 3 for animations
- React Native Gesture Handler for swipe gestures
- AsyncStorage for streak/XP persistence

## App Structure
src/
  screens/        → Onboarding, Dashboard, ReelFeed (core), Profile
  components/
    cards/        → ConceptCard, ExamTipCard, QuizCard, MemoryHookCard, MindMapPeekCard
    ui/           → XPBar, StreakBadge, ProgressRing
  services/       → dikshaAPI.ts, gamification.ts, cardEngine.ts
  store/          → userStore.ts (XP/streaks/badges), contentStore.ts
  types/          → shared TypeScript interfaces
  data/seed/      → hardcoded CBSE 10th cards for MVP testing

## Core Screen — ReelFeed
- Full screen vertical swipe (like TikTok/Reels)
- Swipe UP = next card
- Swipe RIGHT = bookmark
- Swipe LEFT = too easy (skip topic)
- Double tap = +XP Got it!
- Cards alternate: Concept → Concept → ExamTip → Quiz → MemoryHook

## Card Types
1. concept      — one idea, analogy included
2. examTip      — exact phrasing for exam papers (gold border)
3. quiz         — MCQ with instant feedback
4. memoryHook   — mnemonic or visual story
5. mindMapPeek  — shows connected topics, tap to jump

## Gamification
- XP per card action (concept=5, examTip=10, quiz correct=15)
- Daily streak with Streak Saver (1 free miss/week)
- Badges: Igniter, Science Nerd, Board Warrior, 7-Day Legend
- Subject mastery % (progress ring per subject)

## Content Source
DIKSHA Sunbird API (free, official NCERT content):
POST https://diksha.gov.in/api/content/v1/search
Filters: board=CBSE, gradeLevel=Class 10

## Extensibility
Content taxonomy: Board → Class → Subject → Chapter → Topic → Card
Same model works for ICSE, JEE, UPSC, coding interviews later.

## Coding Conventions
- TypeScript strict mode always
- Functional components only, no class components
- Zustand stores for all global state (no Redux)
- All API calls go in src/services/ only
- Reanimated for any animations (not Animated API)
- Keep components under 150 lines, split if bigger
