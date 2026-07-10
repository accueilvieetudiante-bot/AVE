import { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FinancialAidCard } from '@/components/hub/financial-aid-card';
import { SituationPicker, type SituationOption } from '@/components/hub/situation-picker';
import { EmptyState } from '@/components/ui/empty-state';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { FinancialAid, FinancialSituation } from '@/data/types';

const options: SituationOption<FinancialSituation>[] = [
  { tag: 'etudiant', emoji: '🎓', label: 'Étudiant' },
  { tag: 'alternance', emoji: '💼', label: 'Alternance' },
  { tag: 'logement', emoji: '🏠', label: 'Logement' },
  { tag: 'transport', emoji: '🚉', label: 'Transport' },
  { tag: 'sante', emoji: '🩺', label: 'Santé' },
  { tag: 'urgence', emoji: '🚨', label: 'Urgence financière' },
];

export default function AidesFinancieresScreen() {
  const content = useCityContent();
  const [situation, setSituation] = useState<FinancialSituation | null>(null);

  const filtered = useMemo(() => {
    if (!situation) return content.financialAid;
    return content.financialAid.filter((aid) => aid.situations.includes(situation));
  }, [situation, content.financialAid]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<FinancialAid>
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <SituationPicker
              question="Quelle est ta situation ?"
              options={options}
              selected={situation}
              onSelect={setSituation}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FinancialAidCard aid={item} />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState title="Aucune aide trouvée" description="Essayez une autre situation." />
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
