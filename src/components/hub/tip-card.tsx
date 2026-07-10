import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Alert, Platform, Pressable, Share, StyleSheet, View } from 'react-native';
import { Bell, Heart, Pin, Share2 } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Tip, TipPriority } from '@/data/types';

const priorityConfig: Record<TipPriority, { emoji: string; label: string; color: string }> = {
  urgent: { emoji: '🔴', label: 'Urgent', color: '#EF4444' },
  important: { emoji: '🟠', label: 'Important', color: '#F59E0B' },
  'a-savoir': { emoji: '🟡', label: 'À savoir', color: '#EAB308' },
  'bon-plan': { emoji: '🟢', label: 'Bon plan', color: '#22C55E' },
};

export function TipCard({ tip }: { tip: Tip }) {
  const theme = useTheme();
  const config = priorityConfig[tip.priority];
  const [favorite, setFavorite] = useState(false);
  const [pinned, setPinned] = useState(false);

  function haptic() {
    if (Platform.OS !== 'web') Haptics.selectionAsync();
  }

  return (
    <GlassCard style={styles.card}>
      <View style={[styles.badge, { backgroundColor: `${config.color}22` }]}>
        <ThemedText style={{ fontSize: 11, color: config.color, fontWeight: '700' }}>
          {config.emoji} {config.label}
        </ThemedText>
      </View>
      <ThemedText type="smallBold">{tip.title}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {tip.body}
      </ThemedText>

      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            haptic();
            setFavorite((v) => !v);
          }}
          hitSlop={8}
        >
          <Heart size={16} color={favorite ? theme.danger : theme.textSecondary} fill={favorite ? theme.danger : 'none'} />
        </Pressable>
        <Pressable
          onPress={() => {
            haptic();
            setPinned((v) => !v);
          }}
          hitSlop={8}
        >
          <Pin size={16} color={pinned ? theme.primary : theme.textSecondary} fill={pinned ? theme.primary : 'none'} />
        </Pressable>
        <Pressable
          onPress={() => {
            haptic();
            Share.share({ message: `${tip.title} — ${tip.body}` });
          }}
          hitSlop={8}
        >
          <Share2 size={16} color={theme.textSecondary} />
        </Pressable>
        <Pressable
          onPress={() => {
            haptic();
            Alert.alert('Rappel programmé', 'Nous vous notifierons pour ce conseil.');
          }}
          hitSlop={8}
        >
          <Bell size={16} color={theme.textSecondary} />
        </Pressable>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: Spacing.three, gap: 6 },
  badge: { alignSelf: 'flex-start', borderRadius: Radius.pill, paddingVertical: 3, paddingHorizontal: 10 },
  actions: { flexDirection: 'row', gap: Spacing.four, marginTop: Spacing.two },
});
