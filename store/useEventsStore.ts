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
