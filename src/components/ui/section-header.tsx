import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: Spacing.two, gap: 2 },
  title: { fontSize: 15, textTransform: 'uppercase', letterSpacing: 0.4 },
});
