import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'accent';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantConfig: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#E8FAF3', text: '#00A86B' },
  warning: { bg: '#FFF4E6', text: '#E08A00' },
  error: { bg: '#FFE8E8', text: '#D93025' },
  neutral: { bg: '#F5F5F5', text: '#6B6B6B' },
  accent: { bg: '#FFF0EC', text: '#FF4F2B' },
};

export function Badge({ label, variant = 'neutral' }: BadgeProps) {
  const config = variantConfig[variant];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontFamily: 'DMSans_600SemiBold',
  },
});
