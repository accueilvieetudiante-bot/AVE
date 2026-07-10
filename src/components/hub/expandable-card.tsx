import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { ChevronDown } from 'lucide-react-native';
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function ExpandableCard({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <GlassCard style={styles.card}>
      <Pressable
        onPress={() => {
          if (Platform.OS !== 'web') Haptics.selectionAsync();
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((v) => !v);
        }}
        style={styles.header}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <ThemedText type="smallBold">{title}</ThemedText>
          {subtitle && (
            <ThemedText type="small" themeColor="textSecondary">
              {subtitle}
            </ThemedText>
          )}
          {badge}
        </View>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <ChevronDown size={18} color={theme.textSecondary} />
        </View>
      </Pressable>
      {open && <View style={styles.body}>{children}</View>}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: Spacing.three, gap: 0 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two },
  body: { marginTop: Spacing.three, gap: Spacing.two },
});
