import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Radius, Spacing } from '@/constants/theme';

export function CategoryCard({
  href,
  icon: Icon,
  color,
  title,
  description,
}: {
  href: string;
  icon: LucideIcon;
  color: string;
  title: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        router.push(href as never);
      }}
    >
      <GlassCard style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: `${color}22` }]}>
          <Icon size={20} color={color} />
        </View>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {description}
        </ThemedText>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { width: '47%' },
  card: { padding: Spacing.three, gap: 6, minHeight: 140, justifyContent: 'space-between' },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
