import { useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip } from '@/components/ui/chip';
import { TipCard } from '@/components/hub/tip-card';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { Tip, TipPriority } from '@/data/types';

const filters: { tag: TipPriority | 'tous'; label: string }[] = [
  { tag: 'tous', label: 'Tous' },
  { tag: 'urgent', label: '🔴 Urgent' },
  { tag: 'important', label: '🟠 Important' },
  { tag: 'a-savoir', label: '🟡 À savoir' },
  { tag: 'bon-plan', label: '🟢 Bon plan' },
];

export default function ConseilsScreen() {
  const content = useCityContent();
  const [active, setActive] = useState<TipPriority | 'tous'>('tous');

  const filtered = useMemo(() => {
    if (active === 'tous') return content.tips;
    return content.tips.filter((tip) => tip.priority === active);
  }, [active, content.tips]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<Tip>
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
            {filters.map((f) => (
              <Chip key={f.tag} label={f.label} active={active === f.tag} onPress={() => setActive(f.tag)} />
            ))}
          </ScrollView>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TipCard tip={item} />
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
  filters: { marginBottom: Spacing.four },
  item: { marginBottom: Spacing.three },
});
