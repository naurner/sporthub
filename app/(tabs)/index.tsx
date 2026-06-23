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
            <View style={styles.centerState}>
              <ActivityIndicator color="#FF4F2B" size="large" />
            </View>
          ) : (
            <View style={styles.centerState}>
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
  },
  greeting: {
    fontSize: 26,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
    marginBottom: 4,
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
  centerState: {
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
