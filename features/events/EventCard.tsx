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

      <Text style={styles.title} numberOfLines={2}>
        {event.title}
      </Text>

      <View style={styles.infoRow}>
        <Clock size={13} color="#6B6B6B" strokeWidth={2} />
        <Text style={styles.infoText}>{formatDate(event.date, event.time)}</Text>
      </View>

      <View style={styles.infoRow}>
        <MapPin size={13} color="#6B6B6B" strokeWidth={2} />
        <Text style={styles.infoText} numberOfLines={1}>
          {event.address}
        </Text>
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
                { width: `${Math.min(fillRatio * 100, 100)}%` as any, backgroundColor: progressColor },
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
