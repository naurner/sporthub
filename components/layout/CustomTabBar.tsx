import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, MapPin, Plus, User } from 'lucide-react-native';

const TAB_CONFIG = [
  { name: 'index', label: 'Главная', Icon: Home },
  { name: 'map', label: 'Карта', Icon: MapPin },
  { name: 'create', label: '', Icon: Plus, isFab: true },
  { name: 'profile', label: 'Профиль', Icon: User },
];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {TAB_CONFIG.map((tab) => {
        const routeIndex = state.routes.findIndex((r) => r.name === tab.name);
        const isFocused = state.index === routeIndex;
        const { Icon, isFab } = tab;

        const onPress = () => {
          const route = state.routes[routeIndex];
          if (!route) return;
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        if (isFab) {
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              style={styles.fabWrapper}
              activeOpacity={0.85}
            >
              <View style={styles.fab}>
                <Icon size={24} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          );
        }

        const color = isFocused ? '#FF4F2B' : '#6B6B6B';

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Icon size={22} color={color} strokeWidth={isFocused ? 2.5 : 2} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEA',
    paddingTop: 8,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    minHeight: 44,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'DM_Sans_500Medium',
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF4F2B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#FF4F2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
