import { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmergencyBanner } from '@/components/hub/emergency-banner';
import { EmergencyContactRow } from '@/components/hub/emergency-contact-row';
import { SituationPicker, type SituationOption } from '@/components/hub/situation-picker';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { EmergencyContact, EmergencyNeed } from '@/data/types';

const options: SituationOption<EmergencyNeed>[] = [
  { tag: 'medical', emoji: '🏥', label: 'Médical' },
  { tag: 'danger', emoji: '🚨', label: 'Danger' },
  { tag: 'detresse', emoji: '🧠', label: 'Détresse' },
  { tag: 'social', emoji: '🏠', label: 'Social' },
];

export default function UrgencesScreen() {
  const content = useCityContent();
  const [need, setNeed] = useState<EmergencyNeed | null>(null);

  const featured = content.emergency.filter((c) => c.featured);
  const filtered = useMemo(() => {
    if (!need) return content.emergency;
    return content.emergency.filter((contact) => contact.needs.includes(need));
  }, [need, content.emergency]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<EmergencyContact>
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <EmergencyBanner contacts={featured} />
            <SituationPicker
              question="Quel est ton besoin ?"
              options={options}
              selected={need}
              onSelect={setNeed}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <EmergencyContactRow contact={item} />
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  list: { padding: Spacing.four },
  header: { gap: Spacing.four, marginBottom: Spacing.four },
  item: { marginBottom: Spacing.three },
});
