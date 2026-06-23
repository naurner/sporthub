# SportHub Phase 1: Project Setup & Navigation Scaffold

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a production-grade React Native Expo app with TypeScript, NativeWind, bottom navigation, and mock screens following the Clean Athletic Light design system.

**Architecture:** File-based routing via Expo Router with a `(tabs)` group. All providers (React Query, fonts) wrap everything at the root `_layout.tsx`. UI primitives live in `components/`, feature components in `features/`. Mock data in `services/mockData.ts` drives all screens without any real API calls.

**Tech Stack:** Expo SDK (latest managed), Expo Router v3, TypeScript strict, NativeWind v4, Zustand, TanStack React Query v5, React Hook Form, Zod, DM Sans (expo-google-fonts), Lucide React Native

---

## File Map

```
package.json                     # all dependencies
app.json                         # expo config
tsconfig.json                    # strict TypeScript
babel.config.js                  # nativewind/babel preset
metro.config.js                  # nativewind metro plugin
tailwind.config.js               # content paths + nativewind preset
global.css                       # @tailwind directives
nativewind-env.d.ts              # nativewind type reference
.eslintrc.js                     # expo + prettier rules
.prettierrc                      # formatting config

app/
  _layout.tsx                    # root: fonts, QueryClient, SafeAreaProvider
  (tabs)/
    _layout.tsx                  # Tabs navigator with CustomTabBar
    index.tsx                    # Home screen
    map.tsx                      # Map screen
    create.tsx                   # Create screen
    profile.tsx                  # Profile screen

components/
  ui/
    Button.tsx                   # primary/secondary/ghost variants
    Card.tsx                     # surface card wrapper
    Badge.tsx                    # status/label badge
  layout/
    SafeScreen.tsx               # SafeAreaView + bg + scroll wrapper
    ScreenHeader.tsx             # title + optional right action
    CustomTabBar.tsx             # 4-tab bar with FAB Create button

features/
  events/
    EventCard.tsx                # event card with sport, time, price, players
    EventList.tsx                # FlatList of EventCards
    CategoryFilter.tsx           # horizontal sport category chips
  map/
    MapPlaceholder.tsx           # grey placeholder with label
  create/
    CreateEventForm.tsx          # form scaffold (RHF + Zod, submit disabled)
  profile/
    ProfileHeader.tsx            # avatar + name + rating
    StatCard.tsx                 # single stat (number + label)

hooks/
  useEvents.ts                   # React Query hook returning mock events
  useColorScheme.ts              # light/dark detection

services/
  mockData.ts                    # MOCK_USER + MOCK_EVENTS constants
  events.ts                      # getEvents() returning Promise<Event[]>

store/
  useAuthStore.ts                # Zustand: currentUser (mock)
  useEventsStore.ts              # Zustand: selectedSport filter

types/
  event.ts                       # Event, EventStatus, SportType
  user.ts                        # User, UserProfile
  navigation.ts                  # TabParamList
```

---

## Task 1: Initialize Expo Project

**Files:**
- Create: `package.json`, `app.json`, `tsconfig.json`, all Expo template files

- [ ] **Step 1: Scaffold project from tabs template**

```powershell
cd C:\Users\Lexa\Documents\SportHub
npx create-expo-app@latest . --template tabs
```

Expected: project files created, `npm install` runs automatically.

- [ ] **Step 2: Verify project starts**

```powershell
npx expo start --no-dev
```

Press `w` to open web preview, or scan QR for mobile. You should see the default tabs template running. Press `Ctrl+C` to stop.

- [ ] **Step 3: Remove unused template files**

Delete these files that the template creates but we don't need:

```powershell
Remove-Item "app/(tabs)/two.tsx" -ErrorAction SilentlyContinue
Remove-Item "components/EditScreenInfo.tsx" -ErrorAction SilentlyContinue
Remove-Item "components/StyledText.tsx" -ErrorAction SilentlyContinue
Remove-Item "components/__tests__" -Recurse -ErrorAction SilentlyContinue
Remove-Item "constants" -Recurse -ErrorAction SilentlyContinue
```

- [ ] **Step 4: Create required directory structure**

```powershell
New-Item -ItemType Directory -Force "features/events"
New-Item -ItemType Directory -Force "features/map"
New-Item -ItemType Directory -Force "features/create"
New-Item -ItemType Directory -Force "features/profile"
New-Item -ItemType Directory -Force "components/ui"
New-Item -ItemType Directory -Force "components/layout"
New-Item -ItemType Directory -Force "hooks"
New-Item -ItemType Directory -Force "services"
New-Item -ItemType Directory -Force "store"
New-Item -ItemType Directory -Force "types"
```

- [ ] **Step 5: Commit**

```powershell
git init
git add .
git commit -m "feat: initialize expo project from tabs template"
```

---

## Task 2: Install All Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install NativeWind and Tailwind**

```powershell
npm install nativewind@^4.0.36 tailwindcss@^3.4.0
```

- [ ] **Step 2: Install state management and data fetching**

```powershell
npm install zustand @tanstack/react-query react-hook-form @hookform/resolvers zod
```

- [ ] **Step 3: Install UI and icon libraries**

```powershell
npm install lucide-react-native
npx expo install react-native-svg
```

- [ ] **Step 4: Install fonts**

```powershell
npx expo install @expo-google-fonts/dm-sans expo-font expo-splash-screen
```

- [ ] **Step 5: Install React Native extras**

```powershell
npx expo install react-native-safe-area-context react-native-screens
```

- [ ] **Step 6: Verify no peer dep errors**

```powershell
npm ls --depth=0 2>&1 | Select-String "WARN\|ERR"
```

Expected: no critical errors (some peer dep warnings for expo are normal).

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json
git commit -m "feat: install project dependencies"
```

---

## Task 3: Configure NativeWind v4

**Files:**
- Create: `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`
- Modify: `babel.config.js`, `metro.config.js`

- [ ] **Step 1: Create tailwind.config.js**

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: '#FF4F2B',
        'accent-light': '#FFF0EC',
        'text-primary': '#111111',
        'text-secondary': '#6B6B6B',
        surface: '#FFFFFF',
        border: '#EEEEEA',
        success: '#00C57A',
        warning: '#FFB020',
      },
      fontFamily: {
        sans: ['DM_Sans_400Regular'],
        medium: ['DM_Sans_500Medium'],
        semibold: ['DM_Sans_600SemiBold'],
        bold: ['DM_Sans_700Bold'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Create global.css**

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Create nativewind-env.d.ts**

```typescript
/// <reference types="nativewind/types" />
```

- [ ] **Step 4: Update babel.config.js**

Replace the entire file content:

```javascript
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

- [ ] **Step 5: Update metro.config.js**

Replace the entire file content:

```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

- [ ] **Step 6: Commit**

```powershell
git add tailwind.config.js global.css nativewind-env.d.ts babel.config.js metro.config.js
git commit -m "feat: configure nativewind v4"
```

---

## Task 4: Configure ESLint and Prettier

**Files:**
- Create: `.eslintrc.js`, `.prettierrc`
- Modify: `package.json` (add scripts)

- [ ] **Step 1: Install ESLint and Prettier packages**

```powershell
npm install --save-dev eslint-config-expo prettier eslint-config-prettier eslint-plugin-prettier
```

- [ ] **Step 2: Create .eslintrc.js**

```javascript
// .eslintrc.js
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  ignorePatterns: ['node_modules/', '.expo/', 'dist/'],
};
```

- [ ] **Step 3: Create .prettierrc**

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true
}
```

- [ ] **Step 4: Add lint and format scripts to package.json**

Open `package.json` and add to the `"scripts"` section:

```json
"lint": "eslint . --ext .ts,.tsx",
"format": "prettier --write \"**/*.{ts,tsx,js,json}\""
```

- [ ] **Step 5: Verify lint runs**

```powershell
npm run lint
```

Expected: runs without crashing (warnings about unused template code are OK).

- [ ] **Step 6: Commit**

```powershell
git add .eslintrc.js .prettierrc package.json
git commit -m "feat: configure eslint and prettier"
```

---

## Task 5: Define TypeScript Types

**Files:**
- Create: `types/event.ts`, `types/user.ts`, `types/navigation.ts`

- [ ] **Step 1: Create types/event.ts**

```typescript
// types/event.ts
export type SportType =
  | 'basketball'
  | 'football'
  | 'tennis'
  | 'volleyball'
  | 'running'
  | 'cycling'
  | 'swimming'
  | 'other';

export type EventStatus = 'open' | 'almost_full' | 'full' | 'cancelled' | 'completed';

export interface Event {
  id: string;
  title: string;
  sport: SportType;
  date: string;
  time: string;
  address: string;
  minPlayers: number;
  maxPlayers: number;
  currentPlayers: number;
  pricePerPerson: number;
  currency: 'KGS' | 'KZT' | 'USD';
  status: EventStatus;
  organizerId: string;
  description?: string;
  createdAt: string;
}

export interface EventFilters {
  sport?: SportType | 'all';
  status?: EventStatus;
  date?: string;
}
```

- [ ] **Step 2: Create types/user.ts**

```typescript
// types/user.ts
import { SportType } from './event';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  rating: number;
  eventsCreated: number;
  eventsJoined: number;
  createdAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  sports: SportType[];
}
```

- [ ] **Step 3: Create types/navigation.ts**

```typescript
// types/navigation.ts
export type TabParamList = {
  index: undefined;
  map: undefined;
  create: undefined;
  profile: undefined;
};
```

- [ ] **Step 4: Verify TypeScript compiles**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```powershell
git add types/
git commit -m "feat: define typescript types for events and users"
```

---

## Task 6: Create Mock Data and Services

**Files:**
- Create: `services/mockData.ts`, `services/events.ts`

- [ ] **Step 1: Create services/mockData.ts**

```typescript
// services/mockData.ts
import { Event } from '../types/event';
import { User } from '../types/user';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Алексей',
  rating: 4.8,
  eventsCreated: 12,
  eventsJoined: 34,
  createdAt: '2024-01-01T00:00:00Z',
};

export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'Баскет в пятницу',
    sport: 'basketball',
    date: '2026-06-27',
    time: '19:00',
    address: 'ул. Манаса 32, Бишкек',
    minPlayers: 10,
    maxPlayers: 20,
    currentPlayers: 14,
    pricePerPerson: 200,
    currency: 'KGS',
    status: 'open',
    organizerId: 'user-2',
    createdAt: '2026-06-20T10:00:00Z',
  },
  {
    id: 'event-2',
    title: 'Футбол 5×5',
    sport: 'football',
    date: '2026-06-25',
    time: '18:00',
    address: 'Парк Дружбы, поле №3',
    minPlayers: 10,
    maxPlayers: 10,
    currentPlayers: 9,
    pricePerPerson: 150,
    currency: 'KGS',
    status: 'almost_full',
    organizerId: 'user-3',
    createdAt: '2026-06-19T08:00:00Z',
  },
  {
    id: 'event-3',
    title: 'Теннис (парный)',
    sport: 'tennis',
    date: '2026-06-24',
    time: '09:00',
    address: 'Корт Ала-Тоо, Бишкек',
    minPlayers: 4,
    maxPlayers: 4,
    currentPlayers: 3,
    pricePerPerson: 350,
    currency: 'KGS',
    status: 'almost_full',
    organizerId: 'user-1',
    createdAt: '2026-06-18T12:00:00Z',
  },
  {
    id: 'event-4',
    title: 'Волейбол на пляже',
    sport: 'volleyball',
    date: '2026-06-29',
    time: '11:00',
    address: 'Пляж Иссык-Куль, Чолпон-Ата',
    minPlayers: 8,
    maxPlayers: 16,
    currentPlayers: 6,
    pricePerPerson: 100,
    currency: 'KGS',
    status: 'open',
    organizerId: 'user-4',
    createdAt: '2026-06-21T09:00:00Z',
  },
  {
    id: 'event-5',
    title: 'Утренняя пробежка',
    sport: 'running',
    date: '2026-06-24',
    time: '07:00',
    address: 'Парк Панфиловцев, Бишкек',
    minPlayers: 3,
    maxPlayers: 30,
    currentPlayers: 8,
    pricePerPerson: 0,
    currency: 'KGS',
    status: 'open',
    organizerId: 'user-5',
    createdAt: '2026-06-22T15:00:00Z',
  },
];
```

- [ ] **Step 2: Create services/events.ts**

```typescript
// services/events.ts
import { Event, EventFilters } from '../types/event';
import { MOCK_EVENTS } from './mockData';

export async function getEvents(filters?: EventFilters): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let events = [...MOCK_EVENTS];

  if (filters?.sport && filters.sport !== 'all') {
    events = events.filter((e) => e.sport === filters.sport);
  }

  if (filters?.status) {
    events = events.filter((e) => e.status === filters.status);
  }

  return events;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return MOCK_EVENTS.find((e) => e.id === id);
}
```

- [ ] **Step 3: Commit**

```powershell
git add services/
git commit -m "feat: add mock data and events service"
```

---

## Task 7: Create Zustand Stores

**Files:**
- Create: `store/useAuthStore.ts`, `store/useEventsStore.ts`

- [ ] **Step 1: Create store/useAuthStore.ts**

```typescript
// store/useAuthStore.ts
import { create } from 'zustand';
import { User } from '../types/user';
import { MOCK_USER } from '../services/mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: MOCK_USER,
  isAuthenticated: true,
  setUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
}));
```

- [ ] **Step 2: Create store/useEventsStore.ts**

```typescript
// store/useEventsStore.ts
import { create } from 'zustand';
import { SportType } from '../types/event';

interface EventsState {
  selectedSport: SportType | 'all';
  setSelectedSport: (sport: SportType | 'all') => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  selectedSport: 'all',
  setSelectedSport: (sport) => set({ selectedSport: sport }),
}));
```

- [ ] **Step 3: Commit**

```powershell
git add store/
git commit -m "feat: add zustand stores for auth and events"
```

---

## Task 8: Set Up Root Layout with Providers

**Files:**
- Modify: `app/_layout.tsx`

- [ ] **Step 1: Replace app/_layout.tsx**

```typescript
// app/_layout.tsx
import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  DM_Sans_400Regular,
  DM_Sans_500Medium,
  DM_Sans_600SemiBold,
  DM_Sans_700Bold,
  useFonts,
} from '@expo-google-fonts/dm-sans';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DM_Sans_400Regular,
    DM_Sans_500Medium,
    DM_Sans_600SemiBold,
    DM_Sans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#FAFAF8" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FAFAF8' } }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
```

- [ ] **Step 2: Verify app still runs**

```powershell
npx expo start --no-dev
```

Expected: app launches, splash screen shows, then default tab UI appears with DM Sans font loaded. Press `Ctrl+C`.

- [ ] **Step 3: Commit**

```powershell
git add app/_layout.tsx
git commit -m "feat: set up root layout with fonts, react query, and safe area"
```

---

## Task 9: Create UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Badge.tsx`

- [ ] **Step 1: Create components/ui/Button.tsx**

```typescript
// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: object; text: object }> = {
  primary: {
    container: { backgroundColor: '#FF4F2B' },
    text: { color: '#FFFFFF' },
  },
  secondary: {
    container: { backgroundColor: '#FFF0EC', borderWidth: 1, borderColor: '#FF4F2B' },
    text: { color: '#FF4F2B' },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    text: { color: '#FF4F2B' },
  },
};

const sizeStyles: Record<Size, { container: object; text: object }> = {
  sm: { container: { paddingVertical: 8, paddingHorizontal: 16 }, text: { fontSize: 13 } },
  md: { container: { paddingVertical: 12, paddingHorizontal: 20 }, text: { fontSize: 15 } },
  lg: { container: { paddingVertical: 16, paddingHorizontal: 24 }, text: { fontSize: 16 } },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const vs = variantStyles[variant];
  const ss = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        vs.container,
        ss.container,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#FF4F2B'} size="small" />
      ) : (
        <Text style={[styles.text, vs.text, ss.text]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'DM_Sans_600SemiBold',
  },
});
```

- [ ] **Step 2: Create components/ui/Card.tsx**

```typescript
// components/ui/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padding?: number;
}

export function Card({ children, padding = 16, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, { padding }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
```

- [ ] **Step 3: Create components/ui/Badge.tsx**

```typescript
// components/ui/Badge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'accent';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#E8FAF3', text: '#00A86B' },
  warning: { bg: '#FFF4E6', text: '#E08A00' },
  error: { bg: '#FFE8E8', text: '#D93025' },
  neutral: { bg: '#F5F5F5', text: '#6B6B6B' },
  accent: { bg: '#FFF0EC', text: '#FF4F2B' },
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const config = variantConfig[variant];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontFamily: 'DM_Sans_600SemiBold',
  },
});
```

- [ ] **Step 4: Commit**

```powershell
git add components/ui/
git commit -m "feat: add Button, Card, Badge UI primitives"
```

---

## Task 10: Create Layout Components and Custom Tab Bar

**Files:**
- Create: `components/layout/SafeScreen.tsx`, `components/layout/ScreenHeader.tsx`, `components/layout/CustomTabBar.tsx`

- [ ] **Step 1: Create components/layout/SafeScreen.tsx**

```typescript
// components/layout/SafeScreen.tsx
import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentPadding?: boolean;
}

export function SafeScreen({
  children,
  scrollable = false,
  style,
  contentPadding = true,
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    { paddingTop: insets.top },
    contentPadding && styles.padding,
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          { paddingTop: insets.top },
          contentPadding && styles.padding,
          style,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  padding: {
    paddingHorizontal: 20,
  },
});
```

- [ ] **Step 2: Create components/layout/ScreenHeader.tsx**

```typescript
// components/layout/ScreenHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
}

export function ScreenHeader({ title, subtitle, rightAction }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightAction ? (
        <TouchableOpacity onPress={rightAction.onPress} activeOpacity={0.7}>
          <Text style={styles.rightAction}>{rightAction.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 16,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    marginTop: 2,
  },
  rightAction: {
    fontSize: 14,
    fontFamily: 'DM_Sans_600SemiBold',
    color: '#FF4F2B',
  },
});
```

- [ ] **Step 3: Create components/layout/CustomTabBar.tsx**

```typescript
// components/layout/CustomTabBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, MapPin, Plus, User } from 'lucide-react-native';

const TAB_CONFIG = [
  { name: 'index', label: 'Главная', Icon: Home },
  { name: 'map', label: 'Карта', Icon: MapPin },
  { name: 'create', label: '', Icon: Plus, isFab: true },
  { name: 'profile', label: 'Профиль', Icon: User },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {TAB_CONFIG.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const isFocused = state.index === routeIndex;
        const { Icon, isFab } = tab;

        const onPress = () => {
          const route = state.routes[routeIndex];
          if (!route) return;
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        if (isFab) {
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.fabWrapper}
              activeOpacity={0.85}
            >
              <View style={styles.fab}>
                <Icon size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          );
        }

        const color = isFocused ? '#FF4F2B' : '#6B6B6B';

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Icon size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEA',
    paddingTop: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minHeight: 44,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'DM_Sans_500Medium',
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF4F2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#FF4F2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
```

- [ ] **Step 4: Commit**

```powershell
git add components/layout/
git commit -m "feat: add SafeScreen, ScreenHeader, and CustomTabBar components"
```

---

## Task 11: Set Up Tabs Layout

**Files:**
- Modify: `app/(tabs)/_layout.tsx`
- Create: `app/(tabs)/map.tsx`, `app/(tabs)/create.tsx`, `app/(tabs)/profile.tsx`

- [ ] **Step 1: Replace app/(tabs)/_layout.tsx**

```typescript
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { CustomTabBar } from '../../components/layout/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
```

- [ ] **Step 2: Create app/(tabs)/map.tsx (placeholder)**

```typescript
// app/(tabs)/map.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ScreenHeader } from '../../components/layout/ScreenHeader';

export default function MapScreen() {
  return (
    <SafeScreen>
      <ScreenHeader title="Карта событий" subtitle="Найди активность рядом" />
      <View style={styles.placeholder}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.placeholderText}>Карта появится здесь</Text>
        <Text style={styles.placeholderSubtext}>react-native-maps · Phase 2</Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0EC',
    borderRadius: 20,
    margin: 4,
    gap: 8,
  },
  mapEmoji: { fontSize: 48 },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'DM_Sans_600SemiBold',
    color: '#111111',
  },
  placeholderSubtext: {
    fontSize: 13,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
  },
});
```

- [ ] **Step 3: Create app/(tabs)/create.tsx (form scaffold)**

```typescript
// app/(tabs)/create.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { Button } from '../../components/ui/Button';

const SPORT_OPTIONS = ['🏀 Баскетбол', '⚽ Футбол', '🎾 Теннис', '🏐 Волейбол', '🏃 Бег'];

export default function CreateScreen() {
  return (
    <SafeScreen scrollable contentPadding>
      <ScreenHeader title="Создать событие" subtitle="Заполни детали события" />

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Вид спорта</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportRow}>
            {SPORT_OPTIONS.map((sport) => (
              <View key={sport} style={styles.sportChip}>
                <Text style={styles.sportChipText}>{sport}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Название события</Text>
          <TextInput
            style={styles.input}
            placeholder="Например: Баскет в пятницу"
            placeholderTextColor="#AAAAAA"
            editable={false}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Дата</Text>
            <TextInput style={styles.input} placeholder="27.06.2026" placeholderTextColor="#AAAAAA" editable={false} />
          </View>
          <View style={styles.rowSpacer} />
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Время</Text>
            <TextInput style={styles.input} placeholder="19:00" placeholderTextColor="#AAAAAA" editable={false} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Адрес / локация</Text>
          <TextInput
            style={styles.input}
            placeholder="ул. Манаса 32, Бишкек"
            placeholderTextColor="#AAAAAA"
            editable={false}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Мин. игроков</Text>
            <TextInput style={styles.input} placeholder="10" placeholderTextColor="#AAAAAA" editable={false} />
          </View>
          <View style={styles.rowSpacer} />
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Макс. игроков</Text>
            <TextInput style={styles.input} placeholder="20" placeholderTextColor="#AAAAAA" editable={false} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Стоимость (сом)</Text>
          <TextInput style={styles.input} placeholder="200" placeholderTextColor="#AAAAAA" editable={false} />
          <Text style={styles.hint}>Стоимость делится на мин. кол-во игроков автоматически</Text>
        </View>

        <View style={styles.submitSection}>
          <Button label="Создать событие" disabled fullWidth size="lg" />
          <Text style={styles.comingSoon}>Бронирование и оплата · Phase 2</Text>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  form: { gap: 4, paddingBottom: 32 },
  field: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontFamily: 'DM_Sans_600SemiBold',
    color: '#111111',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'DM_Sans_400Regular',
    color: '#111111',
    backgroundColor: '#FAFAF8',
  },
  hint: {
    fontSize: 12,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    marginTop: 6,
  },
  row: { flexDirection: 'row' },
  rowSpacer: { width: 12 },
  sportRow: { marginTop: 4 },
  sportChip: {
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sportChipText: {
    fontSize: 13,
    fontFamily: 'DM_Sans_500Medium',
    color: '#111111',
  },
  submitSection: { marginTop: 8, gap: 10, alignItems: 'center' },
  comingSoon: {
    fontSize: 12,
    fontFamily: 'DM_Sans_400Regular',
    color: '#AAAAAA',
  },
});
```

- [ ] **Step 4: Create app/(tabs)/profile.tsx**

```typescript
// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { MOCK_USER } from '../../services/mockData';

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const user = MOCK_USER;

  return (
    <SafeScreen scrollable>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.rating}>{user.rating.toFixed(1)}</Text>
          <Text style={styles.ratingLabel}>Рейтинг</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatCard value={user.eventsCreated} label="Создано" />
        <View style={styles.statDivider} />
        <StatCard value={user.eventsJoined} label="Участий" />
        <View style={styles.statDivider} />
        <StatCard value={`${user.rating}`} label="Рейтинг" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Мои события</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🏅</Text>
          <Text style={styles.emptyText}>История событий · Phase 2</Text>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F0F0EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarEmoji: { fontSize: 40 },
  name: {
    fontSize: 22,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: { fontSize: 14 },
  rating: {
    fontSize: 15,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEA',
    paddingVertical: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEA',
    marginVertical: 4,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyEmoji: { fontSize: 40 },
  emptyText: {
    fontSize: 14,
    fontFamily: 'DM_Sans_400Regular',
    color: '#AAAAAA',
  },
});
```

- [ ] **Step 5: Commit**

```powershell
git add app/(tabs)/
git commit -m "feat: set up tabs layout with map, create, and profile screens"
```

---

## Task 12: Build Home Screen with EventCard and EventList

**Files:**
- Create: `features/events/EventCard.tsx`, `features/events/CategoryFilter.tsx`, `features/events/EventList.tsx`, `hooks/useEvents.ts`
- Modify: `app/(tabs)/index.tsx`

- [ ] **Step 1: Create hooks/useEvents.ts**

```typescript
// hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/events';
import { EventFilters } from '../types/event';

export function useEvents(filters?: EventFilters) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => getEvents(filters),
  });
}
```

- [ ] **Step 2: Create features/events/EventCard.tsx**

```typescript
// features/events/EventCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Clock, Users } from 'lucide-react-native';
import { Event, EventStatus } from '../../types/event';

const SPORT_EMOJI: Record<string, string> = {
  basketball: '🏀',
  football: '⚽',
  tennis: '🎾',
  volleyball: '🏐',
  running: '🏃',
  cycling: '🚴',
  swimming: '🏊',
  other: '🏅',
};

const STATUS_CONFIG: Record<EventStatus, { label: string; bg: string; text: string }> = {
  open: { label: 'Открыт', bg: '#E8FAF3', text: '#00A86B' },
  almost_full: { label: 'Почти полный', bg: '#FFF4E6', text: '#E08A00' },
  full: { label: 'Полный', bg: '#FFE8E8', text: '#D93025' },
  cancelled: { label: 'Отменён', bg: '#F5F5F5', text: '#6B6B6B' },
  completed: { label: 'Завершён', bg: '#F5F5F5', text: '#6B6B6B' },
};

function formatDate(dateStr: string, time: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  return `${date.toLocaleDateString('ru-RU', options)} · ${time}`;
}

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const statusConfig = STATUS_CONFIG[event.status];
  const fillRatio = event.currentPlayers / event.maxPlayers;
  const progressColor = fillRatio >= 0.9 ? '#FF4F2B' : '#00C57A';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.topRow}>
        <Text style={styles.sportEmoji}>{SPORT_EMOJI[event.sport] ?? '🏅'}</Text>
        <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
          <Text style={[styles.badgeText, { color: statusConfig.text }]}>{statusConfig.label}</Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>{event.title}</Text>

      <View style={styles.infoRow}>
        <Clock size={13} color="#6B6B6B" strokeWidth={2} />
        <Text style={styles.infoText}>{formatDate(event.date, event.time)}</Text>
      </View>

      <View style={styles.infoRow}>
        <MapPin size={13} color="#6B6B6B" strokeWidth={2} />
        <Text style={styles.infoText} numberOfLines={1}>{event.address}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.playersRow}>
          <Users size={13} color="#6B6B6B" strokeWidth={2} />
          <Text style={styles.infoText}>
            {event.currentPlayers}/{event.maxPlayers}
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: `${fillRatio * 100}%` as any, backgroundColor: progressColor },
              ]}
            />
          </View>
        </View>
        <Text style={styles.price}>
          {event.pricePerPerson === 0 ? 'Бесплатно' : `${event.pricePerPerson} сом`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sportEmoji: { fontSize: 32 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'DM_Sans_600SemiBold',
  },
  title: {
    fontSize: 17,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
    marginBottom: 10,
    lineHeight: 23,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEA',
  },
  playersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEEEEA',
    borderRadius: 2,
    overflow: 'hidden',
    maxWidth: 56,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  price: {
    fontSize: 15,
    fontFamily: 'DM_Sans_700Bold',
    color: '#FF4F2B',
  },
});
```

- [ ] **Step 3: Create features/events/CategoryFilter.tsx**

```typescript
// features/events/CategoryFilter.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SportType } from '../../types/event';

type FilterSport = SportType | 'all';

const CATEGORIES: { key: FilterSport; label: string; emoji: string }[] = [
  { key: 'all', label: 'Все', emoji: '✨' },
  { key: 'basketball', label: 'Баскетбол', emoji: '🏀' },
  { key: 'football', label: 'Футбол', emoji: '⚽' },
  { key: 'tennis', label: 'Теннис', emoji: '🎾' },
  { key: 'volleyball', label: 'Волейбол', emoji: '🏐' },
  { key: 'running', label: 'Бег', emoji: '🏃' },
  { key: 'cycling', label: 'Велосипед', emoji: '🚴' },
];

interface CategoryFilterProps {
  selected: FilterSport;
  onSelect: (sport: FilterSport) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {CATEGORIES.map(({ key, label, emoji }) => {
        const isActive = selected === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            activeOpacity={0.75}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginHorizontal: -20 },
  container: { paddingHorizontal: 20, gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    borderColor: '#FF4F2B',
    backgroundColor: '#FFF0EC',
  },
  emoji: { fontSize: 14 },
  label: {
    fontSize: 13,
    fontFamily: 'DM_Sans_500Medium',
    color: '#6B6B6B',
  },
  labelActive: {
    color: '#FF4F2B',
    fontFamily: 'DM_Sans_600SemiBold',
  },
});
```

- [ ] **Step 4: Replace app/(tabs)/index.tsx**

```typescript
// app/(tabs)/index.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventCard } from '../../features/events/EventCard';
import { CategoryFilter } from '../../features/events/CategoryFilter';
import { useEvents } from '../../hooks/useEvents';
import { useEventsStore } from '../../store/useEventsStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Event, SportType } from '../../types/event';

type FilterSport = SportType | 'all';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { selectedSport, setSelectedSport } = useEventsStore();
  const currentUser = useAuthStore((s) => s.currentUser);

  const { data: events, isLoading } = useEvents(
    selectedSport !== 'all' ? { sport: selectedSport } : undefined,
  );

  const greeting = `Привет, ${currentUser?.name ?? 'спортсмен'} 👋`;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <FlatList<Event>
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.subtitle}>Найди событие сегодня</Text>
            <CategoryFilter
              selected={selectedSport}
              onSelect={(sport) => setSelectedSport(sport as FilterSport)}
            />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator color="#FF4F2B" size="large" />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyText}>Нет событий по этому фильтру</Text>
            </View>
          )
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 4,
  },
  greeting: {
    fontSize: 26,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loadingState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
    gap: 12,
  },
  emptyEmoji: { fontSize: 40 },
  emptyText: {
    fontSize: 15,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
  },
});
```

- [ ] **Step 5: Commit**

```powershell
git add features/events/ hooks/ app/(tabs)/index.tsx
git commit -m "feat: build home screen with EventCard, CategoryFilter, and useEvents hook"
```

---

## Task 13: Create useColorScheme Hook

**Files:**
- Create: `hooks/useColorScheme.ts`

- [ ] **Step 1: Create hooks/useColorScheme.ts**

```typescript
// hooks/useColorScheme.ts
import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme() {
  const scheme = useRNColorScheme();
  return scheme ?? 'light';
}
```

- [ ] **Step 2: Commit**

```powershell
git add hooks/useColorScheme.ts
git commit -m "feat: add useColorScheme hook"
```

---

## Task 14: Final Verification — Run the App

- [ ] **Step 1: Run TypeScript check**

```powershell
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Run ESLint**

```powershell
npm run lint
```

Expected: no errors (warnings OK).

- [ ] **Step 3: Start Expo dev server**

```powershell
npx expo start
```

- [ ] **Step 4: Verify in Expo Go or emulator — checklist**

Open the app and check each item:

- [ ] App launches without crash, DM Sans font renders
- [ ] Home tab: greeting shows "Привет, Алексей 👋", category chips visible
- [ ] Home tab: 5 event cards load after ~300ms loading indicator
- [ ] Home tab: tapping a category chip filters the list (basketball shows 1 card, etc.)
- [ ] Map tab: placeholder with emoji and text, no crash
- [ ] Create tab: FAB button in center of tab bar, coral color, elevated shadow
- [ ] Create tab: form scaffold visible, all fields non-editable, submit button disabled
- [ ] Profile tab: avatar emoji, name "Алексей", stats row (12/34/4.8)
- [ ] Back to Home: transition is smooth

- [ ] **Step 5: Final commit**

```powershell
git add .
git commit -m "feat: phase 1 complete — expo project scaffold with navigation and mock screens"
```

---

## Summary

After Task 14 the app will have:
- Full Expo Router tab navigation with custom tab bar (FAB Create button)
- Clean Athletic Light design system (DM Sans, coral `#FF4F2B`, warm white `#FAFAF8`)
- Home screen with EventCard list, category filter, React Query loading state
- Map, Create, Profile screens as scaffolds
- Zustand stores (auth, events filter)
- All types, services, and mock data in place
- ESLint + Prettier configured
- TypeScript strict mode, 0 errors
