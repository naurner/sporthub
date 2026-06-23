import React from 'react';
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentPadding?: boolean;
}

export function SafeScreen({
  children,
  scrollable = false,
  style,
  contentPadding = true,
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  if (scrollable) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          { paddingTop: insets.top + 16 },
          contentPadding && styles.padding,
          style,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16 },
        contentPadding && styles.padding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  padding: {
    paddingHorizontal: 20,
  },
});
