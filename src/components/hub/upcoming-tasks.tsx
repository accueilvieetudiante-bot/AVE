import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { CheckCircle2 } from 'lucide-react-native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { UpcomingTask } from '@/data/types';

export function UpcomingTasksSection({ tasks }: { tasks: UpcomingTask[] }) {
  const theme = useTheme();

  return (
    <View style={{ gap: Spacing.two }}>
      <SectionHeader title="✨ Les démarches du moment" />
      <GlassCard style={{ padding: Spacing.two }}>
        {tasks.map((task, i) => (
          <Link key={task.id} href={task.href as never} asChild>
            <Pressable
              onPress={() => {
                if (Platform.OS !== 'web') Haptics.selectionAsync();
              }}
              style={StyleSheet.flatten([
                styles.row,
                i < tasks.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
              ])}
            >
              <CheckCircle2 size={16} color={theme.success} />
              <View style={{ flex: 1 }}>
                <ThemedText type="small">{task.title}</ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {task.windowLabel}
              </ThemedText>
            </Pressable>
          </Link>
        ))}
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
});
