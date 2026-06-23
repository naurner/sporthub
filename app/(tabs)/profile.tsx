import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const user = MOCK_USER;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
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
        <StatCard value={user.rating.toFixed(1)} label="Рейтинг" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Мои события</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🏅</Text>
          <Text style={styles.emptyText}>История событий · Phase 2</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    alignItems: 'center',
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
    fontFamily: 'DMSans_700Bold',
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
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
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
    fontFamily: 'DMSans_700Bold',
    color: '#111111',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
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
    fontFamily: 'DMSans_700Bold',
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
    fontFamily: 'DMSans_400Regular',
    color: '#AAAAAA',
  },
});
