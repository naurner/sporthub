import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SportType } from '../../types/event';

type FilterSport = SportType | 'all';

const CATEGORIES: { key: FilterSport; label: string; emoji: string }[] = [
  { key: 'all', label: 'Все', emoji: '✨' },
  { key: 'basketball', label: 'Баскетбол', emoji: '🏀' },
  { key: 'football', label: 'Футбол', emoji: '⚽' },
  { key: 'tennis', label: 'Теннис', emoji: '🎾' },
  { key: 'volleyball', label: 'Волейбол', emoji: '🏐' },
  { key: 'running', label: 'Бег', emoji: '🏃' },
  { key: 'cycling', label: 'Велосипед', emoji: '🚴' },
];

interface CategoryFilterProps {
  selected: FilterSport;
  onSelect: (sport: FilterSport) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      {CATEGORIES.map(({ key, label, emoji }) => {
        const isActive = selected === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            activeOpacity={0.75}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginHorizontal: -20 },
  container: { paddingHorizontal: 20, gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    borderColor: '#FF4F2B',
    backgroundColor: '#FFF0EC',
  },
  emoji: { fontSize: 14 },
  label: {
    fontSize: 13,
    fontFamily: 'DM_Sans_500Medium',
    color: '#6B6B6B',
  },
  labelActive: {
    color: '#FF4F2B',
    fontFamily: 'DM_Sans_600SemiBold',
  },
});
