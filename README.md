# SportHub

Mobile app for finding and organising amateur sports games in Bishkek: someone creates a basketball or football game, others see it in the feed and join until the team is full.

**Status: phase 1, UI prototype.** All screens and navigation are built and run on mock data; the backend and the map come in phase 2.

## Screens

- **Feed** — list of upcoming games with a sport filter; each card shows time, address, players joined vs. needed, price per person and status (`open`, `almost full`, `full`).
- **Create** — form layout for a new game (sport, title, date and time, address, player limits, price).
- **Map** — placeholder for `react-native-maps` (phase 2).
- **Profile** — user card and stats placeholder.

## Stack

React Native 0.85 · Expo 56 with Expo Router (file-based tabs) · TypeScript · NativeWind (Tailwind) · Zustand · TanStack Query · React Hook Form + Zod

## Structure

```
app/(tabs)/        screens: index (feed), create, map, profile
components/        layout (SafeScreen, ScreenHeader, CustomTabBar) and UI primitives (Button, Card, Badge)
features/events/   EventCard, CategoryFilter
hooks/useEvents    TanStack Query hook over the events service
services/          events service; mockData.ts until the API exists
store/             Zustand stores for auth and event filters
types/             Event, User and navigation types
```

All data goes through `services/events.ts`, so switching from mock data to a real API only changes that file.

## Run

```bash
npm install
npx expo start      # then press a (Android), i (iOS) or w (web)
npm run lint
```

## Phase 2

- REST API for events, joining a game and users
- Working create form with validation and submit
- Map of games with `react-native-maps`
- Sign-in
