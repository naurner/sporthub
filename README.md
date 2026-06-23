# SportHub — Платформа для спортивных событий

Приложение, где любой человек может создать спортивное событие или присоединиться к существующему — с предоплатой и автоматическим делением стоимости аренды локации.

**Пример события:** «Баскетбол в пятницу, ул. Манаса 32, 19:00, мин. 10 / макс. 20 человек, 200 сом»

---

## Стек

| Слой | Технология |
|---|---|
| Mobile | React Native + Expo (managed) |
| Routing | Expo Router v3 (file-based) |
| State | Zustand |
| Server state | TanStack React Query |
| Forms | React Hook Form + Zod |
| Styling | NativeWind v4 (Tailwind) |
| Backend | [→ docs/backend/](docs/backend/) |

---

## Быстрый старт (фронтенд)

```bash
# 1. Клонировать
git clone <repo-url>
cd sporthub

# 2. Зависимости
npm install

# 3. Переменные окружения
cp .env.example .env
# вписать API_URL бэкенда

# 4. Запуск
npx expo start
```

Открыть в [Expo Go](https://expo.dev/client) на телефоне (сканировать QR) или в эмуляторе (`a` — Android, `i` — iOS).

---

## Структура проекта

```
app/
  _layout.tsx          # Root layout: провайдеры (QueryClient, SafeArea, шрифты)
  (tabs)/
    index.tsx          # Home — лента событий
    map.tsx            # Map — карта событий (Phase 2)
    create.tsx         # Create — создание события
    profile.tsx        # Profile — профиль пользователя

components/
  ui/                  # Button, Card, Badge — переиспользуемые примитивы
  layout/              # SafeScreen, ScreenHeader, CustomTabBar

features/
  events/              # EventCard, CategoryFilter — компоненты ленты

hooks/
  useEvents.ts         # React Query: запрос списка событий
  useColorScheme.ts

services/
  events.ts            # Слой API для событий (сейчас моки)
  mockData.ts          # Моковые данные — заменить на реальный API

store/
  useAuthStore.ts      # Текущий пользователь
  useEventsStore.ts    # Фильтр по виду спорта

types/
  event.ts             # Event, SportType, EventStatus, EventFilters
  user.ts              # User, UserProfile
  navigation.ts        # Tab navigation types
```

---

## Для бэкэндера

→ **[docs/backend/](docs/backend/)** — там всё: API-спецификация, модели, авторизация, что писать в первую очередь.

---

## Переменные окружения

```bash
# .env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Статус проекта

| Phase | Статус | Описание |
|---|---|---|
| Phase 1 | ✅ Готово | UI scaffold, моковые данные, навигация |
| Phase 2 | 🔄 В работе | Реальный API, авторизация, карта |
| Phase 3 | 📋 Planned | Оплата, бронирование локаций |
