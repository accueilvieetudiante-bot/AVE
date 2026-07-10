import { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HealthOrgCard } from '@/components/hub/health-org-card';
import { SituationPicker, type SituationOption } from '@/components/hub/situation-picker';
import { EmptyState } from '@/components/ui/empty-state';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { HealthOrg, HealthSituation } from '@/data/types';

const options: SituationOption<HealthSituation>[] = [
  { tag: 'fatigue', emoji: '🤒', label: 'Fatigue / Stress' },
  { tag: 'moral', emoji: '😔', label: 'Moral difficile' },
  { tag: 'parler', emoji: '🤝', label: 'Besoin de parler' },
  { tag: 'medecin', emoji: '🩺', label: "Besoin d'un médecin" },
];

export default function SanteScreen() {
  const content = useCityContent();
  const [situation, setSituation] = useState<HealthSituation | null>(null);

  const filtered = useMemo(() => {
    if (!situation) return content.health;
    return content.health.filter((org) => org.situations.includes(situation));
  }, [situation, content.health]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<HealthOrg>
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <SituationPicker
              question="Comment te sens-tu aujourd'hui ?"
              options={options}
              selected={situation}
              onSelect={setSituation}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <HealthOrgCard org={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState title="Aucune structure trouvée" description="Essayez une autre situation." />
        }
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  list: { padding: Spacing.four },
  header: { marginBottom: Spacing.four },
  item: { marginBottom: Spacing.three },
});
