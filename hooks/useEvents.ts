import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../services/events';
import { EventFilters } from '../types/event';

export function useEvents(filters?: EventFilters) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => getEvents(filters),
  });
}
