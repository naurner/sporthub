# SportHub — Документация для бэкэндера

Привет. Здесь всё что нужно знать, чтобы написать бэк для SportHub — без лишней воды.

## Суть приложения

Пользователи создают спортивные события. Другие пользователи к ним присоединяются и платят. Стоимость аренды площадки делится на минимальное количество игроков — это гарантирует организатору окупаемость.

**Поток для пользователя:**
1. Открывает приложение → видит события рядом
2. Нажимает «Создать» → заполняет форму (вид спорта, место, время, мин/макс игроков, цена)
3. Другие пользователи находят событие → платят → получают бронь
4. Если набралось минимальное количество — бронирование площадки подтверждается автоматически
5. Если мин. кол-во не набралось — деньги возвращаются (Phase 3)

---

## Технические требования к бэку

### Рекомендуемый стек (не обязательно, просто совет)
- **Node.js** + **Fastify** или **Express**
- **PostgreSQL** + **Prisma**
- **JWT** для авторизации
- **Redis** для OTP-кодов и кэша
- **SMS-шлюз** для OTP (Twilio, или любой местный провайдер)

### Базовые требования
- REST API, JSON
- Авторизация через JWT Bearer токен
- Все даты в ISO 8601 (`2026-06-27T19:00:00Z`)
- Все суммы в минимальных единицах валюты (тиины для сом)
- Пагинация через `?page=1&limit=20`

---

## Модели данных

### User

```typescript
{
  id: string;              // uuid
  name: string;
  phone: string;           // +996XXXXXXXXX
  avatar?: string;         // URL
  rating: number;          // 0.0 - 5.0
  eventsCreated: number;
  eventsJoined: number;
  createdAt: string;       // ISO 8601
}
```

### Event

```typescript
{
  id: string;              // uuid
  title: string;
  sport: SportType;        // см. ниже
  date: string;            // "2026-06-27"
  time: string;            // "19:00"
  address: string;
  lat?: number;            // широта (для карты)
  lng?: number;            // долгота (для карты)
  minPlayers: number;
  maxPlayers: number;
  currentPlayers: number;  // вычисляемое поле
  pricePerPerson: number;  // в сомах
  currency: "KGS" | "KZT" | "USD";
  status: EventStatus;     // см. ниже
  organizerId: string;     // User.id
  organizer: User;         // вложенный объект
  description?: string;
  createdAt: string;
}
```

### Типы

```typescript
// Виды спорта
type SportType =
  | "basketball" | "football" | "tennis"
  | "volleyball" | "running" | "cycling"
  | "swimming" | "other";

// Статус события
type EventStatus =
  | "open"         // принимает участников
  | "almost_full"  // осталось ≤ 2 места
  | "full"         // мест нет
  | "cancelled"    // отменено
  | "completed";   // прошло
```

> `status` вычисляется на бэке автоматически на основе `currentPlayers`, `maxPlayers` и даты события. Фронт его не меняет напрямую.

---

## API Эндпоинты

### Авторизация

```
POST /api/auth/send-otp
POST /api/auth/verify-otp
GET  /api/auth/me
```

#### POST /api/auth/send-otp
Отправить OTP-код на телефон.

```json
// Request
{ "phone": "+996700123456" }

// Response 200
{ "message": "OTP sent", "expiresIn": 120 }

// Response 429
{ "error": "too_many_requests", "retryAfter": 60 }
```

#### POST /api/auth/verify-otp
Верификация кода → получить JWT.

```json
// Request
{ "phone": "+996700123456", "code": "1234" }

// Response 200
{
  "token": "eyJ...",
  "user": { ...User }
}

// Response 401
{ "error": "invalid_code" }
```

#### GET /api/auth/me
Текущий пользователь. Требует `Authorization: Bearer <token>`.

```json
// Response 200
{ ...User }
```

---

### Пользователи

```
GET   /api/users/:id
PATCH /api/users/me
```

#### GET /api/users/:id
Публичный профиль пользователя.

```json
// Response 200
{ ...User }
```

#### PATCH /api/users/me
Обновить свой профиль. Требует авторизацию.

```json
// Request (все поля опциональны)
{ "name": "Алексей", "avatar": "https://..." }

// Response 200
{ ...User }
```

---

### События

```
GET    /api/events
GET    /api/events/:id
POST   /api/events
PATCH  /api/events/:id
DELETE /api/events/:id
```

#### GET /api/events
Список событий с фильтрацией.

**Query параметры:**
| Параметр | Тип | Описание |
|---|---|---|
| `sport` | string | Фильтр по виду спорта |
| `status` | string | Фильтр по статусу |
| `date` | string | Конкретная дата `2026-06-27` |
| `lat` | number | Широта пользователя |
| `lng` | number | Долгота пользователя |
| `radius` | number | Радиус в км (default: 10) |
| `page` | number | Страница (default: 1) |
| `limit` | number | Элементов на странице (default: 20) |

```json
// Response 200
{
  "data": [ ...Event[] ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

#### GET /api/events/:id
Детали события.

```json
// Response 200
{ ...Event, "participants": [ ...User[] ] }

// Response 404
{ "error": "event_not_found" }
```

#### POST /api/events
Создать событие. Требует авторизацию.

```json
// Request
{
  "title": "Баскет в пятницу",
  "sport": "basketball",
  "date": "2026-06-27",
  "time": "19:00",
  "address": "ул. Манаса 32, Бишкек",
  "lat": 42.8746,
  "lng": 74.5698,
  "minPlayers": 10,
  "maxPlayers": 20,
  "pricePerPerson": 200,
  "currency": "KGS",
  "description": "Приходите в кроссовках"
}

// Response 201
{ ...Event }

// Response 422
{
  "error": "validation_error",
  "fields": { "minPlayers": "must be less than maxPlayers" }
}
```

#### PATCH /api/events/:id
Обновить событие. Только организатор. Требует авторизацию.

```json
// Request (все поля опциональны)
{ "title": "Новое название", "maxPlayers": 25 }

// Response 200
{ ...Event }

// Response 403
{ "error": "forbidden" }
```

#### DELETE /api/events/:id
Отменить событие. Только организатор. Требует авторизацию.

```json
// Response 200
{ "message": "Event cancelled" }
```

---

### Участие в событиях

```
POST   /api/events/:id/join
DELETE /api/events/:id/leave
GET    /api/events/:id/participants
GET    /api/users/me/events
```

#### POST /api/events/:id/join
Присоединиться к событию. Требует авторизацию.

```json
// Response 200
{ "message": "Joined successfully", "event": { ...Event } }

// Response 409
{ "error": "already_joined" }

// Response 410
{ "error": "event_full" }
```

#### DELETE /api/events/:id/leave
Покинуть событие. Требует авторизацию.

```json
// Response 200
{ "message": "Left successfully" }

// Response 400
{ "error": "cannot_leave_started_event" }
```

#### GET /api/events/:id/participants
Список участников события.

```json
// Response 200
{ "data": [ ...User[] ] }
```

#### GET /api/users/me/events
Мои события (созданные + участвую). Требует авторизацию.

```json
// Response 200
{
  "organized": [ ...Event[] ],
  "joined": [ ...Event[] ]
}
```

---

## Формат ошибок

Всегда один и тот же формат:

```json
{
  "error": "snake_case_error_code",
  "message": "Human readable message",
  "fields": {}  // только для validation_error
}
```

**HTTP коды:**
| Код | Когда |
|---|---|
| `200` | OK |
| `201` | Создано |
| `400` | Неверный запрос |
| `401` | Не авторизован |
| `403` | Нет прав |
| `404` | Не найдено |
| `409` | Конфликт |
| `422` | Ошибка валидации |
| `429` | Слишком много запросов |
| `500` | Ошибка сервера |

---

## Авторизация

Все защищённые эндпоинты требуют заголовок:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

JWT payload:
```json
{
  "sub": "user-uuid",
  "phone": "+996700123456",
  "iat": 1719484800,
  "exp": 1722076800
}
```

Срок жизни токена: **30 дней**.

---

## Что реализовать в первую очередь (Phase 2)

Порядок реализации по приоритету:

1. `POST /api/auth/send-otp` + `POST /api/auth/verify-otp` — без этого всё остальное невозможно
2. `GET /api/auth/me` — фронт загружает пользователя при старте
3. `GET /api/events` — главный экран приложения
4. `GET /api/events/:id` — карточка события
5. `POST /api/events` — создание события
6. `POST /api/events/:id/join` — присоединиться к событию
7. `DELETE /api/events/:id/leave` — покинуть событие
8. `GET /api/users/me/events` — мои события в профиле

---

## Переменные окружения (пример для бэка)

```bash
# .env (бэкенд)
DATABASE_URL=postgresql://user:password@localhost:5432/sporthub
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=30d

# SMS провайдер
SMS_PROVIDER=twilio           # или любой другой
TWILIO_ACCOUNT_SID=ACxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx

# Redis (для OTP)
REDIS_URL=redis://localhost:6379

# Сервер
PORT=3000
NODE_ENV=development

# CORS — URL фронтенда
FRONTEND_URL=http://localhost:8081
```

---

## Как подключить к фронтенду

Фронтенд читает адрес API из переменной окружения:

```bash
# sporthub/.env
EXPO_PUBLIC_API_URL=http://YOUR_SERVER_IP:3000/api
```

Файл сервиса на фронте — [services/events.ts](../../services/events.ts). Сейчас там возвращаются моковые данные — нужно заменить на `fetch`/`axios` к реальному API. Структура ответа уже совпадает с тем, что описано выше.

---

## Вопросы?

Создай Issue в этом репозитории — разберёмся.
