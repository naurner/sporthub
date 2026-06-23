import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
}

export function ScreenHeader({ title, subtitle, rightAction }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {rightAction ? (
        <TouchableOpacity onPress={rightAction.onPress} activeOpacity={0.7}>
          <Text style={styles.rightAction}>{rightAction.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 16,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DM_Sans_700Bold',
    color: '#111111',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    marginTop: 2,
  },
  rightAction: {
    fontSize: 14,
    fontFamily: 'DM_Sans_600SemiBold',
    color: '#FF4F2B',
  },
});
