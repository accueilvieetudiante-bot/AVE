import { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FoodAidCard } from '@/components/hub/food-aid-card';
import { SituationPicker, type SituationOption } from '@/components/hub/situation-picker';
import { EmptyState } from '@/components/ui/empty-state';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { FoodAidOrg, FoodNeed } from '@/data/types';

const options: SituationOption<FoodNeed>[] = [
  { tag: 'courses', emoji: '🛒', label: 'Faire mes courses moins cher' },
  { tag: 'gratuit', emoji: '🎁', label: 'Recevoir une aide gratuite' },
  { tag: 'difficulte', emoji: '🎓', label: 'Je suis en difficulté financière' },
  { tag: 'distribution', emoji: '📍', label: 'Trouver une distribution' },
];

export default function AidesAlimentairesScreen() {
  const content = useCityContent();
  const [need, setNeed] = useState<FoodNeed | null>(null);

  const filtered = useMemo(() => {
    if (!need) return content.foodAid;
    return content.foodAid.filter((org) => org.needs.includes(need));
  }, [need, content.foodAid]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<FoodAidOrg>
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <SituationPicker
              question="De quoi as-tu besoin aujourd'hui ?"
              options={options}
              selected={need}
              onSelect={setNeed}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FoodAidCard org={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState title="Aucune structure trouvée" description="Essayez un autre besoin." />
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
