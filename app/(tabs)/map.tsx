import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ScreenHeader } from '../../components/layout/ScreenHeader';

export default function MapScreen() {
  return (
    <SafeScreen>
      <ScreenHeader title="Карта событий" subtitle="Найди активность рядом" />
      <View style={styles.placeholder}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.placeholderText}>Карта появится здесь</Text>
        <Text style={styles.placeholderSubtext}>react-native-maps · Phase 2</Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0EC',
    borderRadius: 20,
    marginBottom: 8,
    gap: 8,
  },
  mapEmoji: { fontSize: 48 },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'DMSans_600SemiBold',
    color: '#111111',
  },
  placeholderSubtext: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    color: '#6B6B6B',
  },
});
