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
