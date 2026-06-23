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
