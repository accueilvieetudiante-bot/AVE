import { FlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/hub/app-card';
import { Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import type { AppItem } from '@/data/types';

export default function AppsScreen() {
  const content = useCityContent();

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <FlashList<AppItem>
        data={content.apps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <AppCard app={item} />
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
  item: { marginBottom: Spacing.three },
});
