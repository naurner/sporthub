# SportHub — Phase 1: Project Setup & Navigation Scaffold

**Date:** 2026-06-23  
**Scope:** Initial Expo project, design system, bottom navigation, mock screens  
**Status:** Approved

---

## Overview

SportHub is a mobile-first platform where anyone can create or join local sports events with prepayment and automatic venue cost splitting. Phase 1 establishes the technical foundation and visual design language — no business logic, only scaffold + mock data.

---

## Tech Stack

| Tool | Version/Config |
|---|---|
| Expo SDK | Latest (managed workflow) |
| Expo Router | v3 (file-based routing) |
| TypeScript | Strict mode |
| NativeWind | v4 (Tailwind for RN) |
| Zustand | Global state management |
| TanStack React Query | Server state / async data |
| React Hook Form | Form management |
| Zod | Schema validation |
| ESLint | expo + prettier config |
| Prettier | 2-space indent, single quotes, trailing commas |

---

## Directory Structure

```
app/
  (tabs)/
    index.tsx         # Home
    map.tsx           # Map
    create.tsx        # Create
    profile.tsx       # Profile
    _layout.tsx       # Tab navigator layout
  _layout.tsx         # Root layout (fonts, providers)

components/
  ui/                 # Primitives: Button, Card, Badge, Input, Avatar
  layout/             # SafeAreaView wrappers, ScreenHeader

features/
  events/             # EventCard, EventList (mock data)
  map/                # MapPlaceholder
  create/             # CreateEventForm scaffold
  profile/            # ProfileHeader, StatCard

hooks/
  useColorScheme.ts
  useEvents.ts        # TanStack Query hook returning mock events

services/
  api.ts              # Axios/fetch base (stub)
  events.ts           # Events service (returns mock data)

store/
  useAuthStore.ts     # Zustand: current user mock
  useEventsStore.ts   # Zustand: local events cache

types/
  event.ts            # Event, EventStatus, SportType
  user.ts             # User, UserProfile
  navigation.ts       # Tab param list types

docs/
  superpowers/specs/  # Design specs
```

---

## Design System: Clean Athletic Light

### Color Palette

```
--color-bg:          #FAFAF8   // warm white background
--color-surface:     #FFFFFF   // card surfaces
--color-accent:      #FF4F2B   // coral-orange (primary CTA, active tab)
--color-accent-light:#FFF0EC   // accent tint for backgrounds
--color-text-primary:#111111   // headings, primary text
--color-text-secondary:#6B6B6B // captions, labels
--color-border:      #EEEEEA   // dividers, card borders
--color-success:     #00C57A   // confirmed, paid, joined
--color-warning:     #FFB020   // almost full, deadline soon
--color-error:       #E53E3E   // cancelled, failed payment
```

### Typography

Single typeface: **DM Sans** (Google Fonts via expo-google-fonts)

| Role | Size | Weight |
|---|---|---|
| Display | 28px | 700 |
| Heading | 20px | 600 |
| Subheading | 16px | 600 |
| Body | 15px | 400 |
| Caption | 13px | 400 |
| Label | 12px | 500 |

### Spacing Scale (4px base)

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64`

### Border Radius

- Card: 16px
- Button: 12px
- Badge: 8px
- FAB (Create): 24px (pill)

### Shadows

```
shadow-sm:  0 1px 3px rgba(0,0,0,0.08)
shadow-md:  0 4px 12px rgba(0,0,0,0.10)
shadow-lg:  0 8px 24px rgba(0,0,0,0.12)
```

---

## Bottom Navigation

Four tabs with custom tab bar component:

```
[ Home ]  [ Map ]  [ ⊕ Create ]  [ Profile ]
```

- **Home** — Lucide `Home` icon
- **Map** — Lucide `MapPin` icon
- **Create** — Centered FAB, `#FF4F2B` background, `Plus` icon, elevated (+8px shadow), no label
- **Profile** — Lucide `User` icon

Active tab: icon + label in `#FF4F2B`  
Inactive tab: icon + label in `#6B6B6B`  
Tab bar: white background, top border `#EEEEEA`, height 60px + safe area bottom

---

## Screen Scaffolds (Phase 1)

### Home
- Greeting header ("Привет, Алекс 👋")
- Horizontal scroll: sport category filters (All, Basketball, Football, Tennis, Running...)
- Vertical list: `EventCard` components with mock data
- `EventCard` shows: sport icon, title, date/time, address, players count (min/max), price per person, status badge

### Map
- Full-screen placeholder (grey rectangle)
- Text "Карта событий" centered
- Future: react-native-maps

### Create
- Screen header "Создать событие"
- Form scaffold (sport type picker, title, date, venue, min/max players, price)
- Submit button — disabled in Phase 1

### Profile
- Avatar + name + stats (events created, events joined, rating)
- Mock data only

---

## Mock Data

```typescript
// 5 mock events covering different sports and states
const MOCK_EVENTS = [
  { sport: 'basketball', title: 'Баскет в пятницу', ... },
  { sport: 'football',   title: 'Футбол 5x5',       ... },
  { sport: 'tennis',     title: 'Теннис (парный)',   ... },
  { sport: 'volleyball', title: 'Волейбол на пляже', ... },
  { sport: 'running',    title: 'Утренняя пробежка', ... },
]
```

---

## ESLint / Prettier Config

- `eslint-config-expo` base
- `prettier` with: `singleQuote: true`, `trailingComma: 'all'`, `printWidth: 100`, `tabWidth: 2`
- Pre-commit: none for Phase 1

---

## Out of Scope (Phase 1)

- Authentication / real users
- Payment integration
- Map with real pins
- Venue booking API
- Push notifications
- Backend / API
