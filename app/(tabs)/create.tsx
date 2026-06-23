import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { Button } from '../../components/ui/Button';

const SPORT_OPTIONS = ['🏀 Баскетбол', '⚽ Футбол', '🎾 Теннис', '🏐 Волейбол', '🏃 Бег'];

export default function CreateScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="Создать событие" subtitle="Заполни детали события" />

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Вид спорта</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sportRow}>
            {SPORT_OPTIONS.map((sport) => (
              <View key={sport} style={styles.sportChip}>
                <Text style={styles.sportChipText}>{sport}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Название события</Text>
          <TextInput
            style={styles.input}
            placeholder="Например: Баскет в пятницу"
            placeholderTextColor="#AAAAAA"
            editable={false}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Дата</Text>
            <TextInput
              style={styles.input}
              placeholder="27.06.2026"
              placeholderTextColor="#AAAAAA"
              editable={false}
            />
          </View>
          <View style={styles.rowSpacer} />
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Время</Text>
            <TextInput
              style={styles.input}
              placeholder="19:00"
              placeholderTextColor="#AAAAAA"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Адрес / локация</Text>
          <TextInput
            style={styles.input}
            placeholder="ул. Манаса 32, Бишкек"
            placeholderTextColor="#AAAAAA"
            editable={false}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Мин. игроков</Text>
            <TextInput
              style={styles.input}
              placeholder="10"
              placeholderTextColor="#AAAAAA"
              editable={false}
            />
          </View>
          <View style={styles.rowSpacer} />
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Макс. игроков</Text>
            <TextInput
              style={styles.input}
              placeholder="20"
              placeholderTextColor="#AAAAAA"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Стоимость (сом)</Text>
          <TextInput
            style={styles.input}
            placeholder="200"
            placeholderTextColor="#AAAAAA"
            editable={false}
          />
          <Text style={styles.hint}>
            Стоимость делится на мин. кол-во игроков автоматически
          </Text>
        </View>

        <View style={styles.submitSection}>
          <Button label="Создать событие" disabled fullWidth size="lg" />
          <Text style={styles.comingSoon}>Бронирование и оплата · Phase 2</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  form: { gap: 4 },
  field: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontFamily: 'DM_Sans_600SemiBold',
    color: '#111111',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'DM_Sans_400Regular',
    color: '#111111',
    backgroundColor: '#FAFAF8',
  },
  hint: {
    fontSize: 12,
    fontFamily: 'DM_Sans_400Regular',
    color: '#6B6B6B',
    marginTop: 6,
  },
  row: { flexDirection: 'row' },
  rowSpacer: { width: 12 },
  sportRow: { marginTop: 4 },
  sportChip: {
    borderWidth: 1.5,
    borderColor: '#EEEEEA',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sportChipText: {
    fontSize: 13,
    fontFamily: 'DM_Sans_500Medium',
    color: '#111111',
  },
  submitSection: { marginTop: 8, gap: 10, alignItems: 'center' },
  comingSoon: {
    fontSize: 12,
    fontFamily: 'DM_Sans_400Regular',
    color: '#AAAAAA',
  },
});
