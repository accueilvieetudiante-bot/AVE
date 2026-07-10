import { StyleSheet, View } from 'react-native';
import { Inbox, type LucideIcon } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  const theme = useTheme();

  return (
    <GlassCard style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: theme.backgroundElement }]}>
        <Icon size={20} color={theme.textSecondary} />
      </View>
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      {description && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', paddingVertical: Spacing.five, paddingHorizontal: Spacing.four, gap: 8 },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  title: { textAlign: 'center' },
  description: { textAlign: 'center' },
});
