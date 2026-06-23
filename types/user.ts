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
