import { StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function InfoRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Icon size={15} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary" style={{ flex: 1 }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
});
