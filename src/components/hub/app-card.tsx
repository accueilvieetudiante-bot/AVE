import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { AppItem } from '@/data/types';

export function AppCard({ app }: { app: AppItem }) {
  const theme = useTheme();
  const downloadUrl = app.iosUrl ?? app.androidUrl ?? app.websiteUrl;

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.logo, { backgroundColor: app.color }]}>
          <ThemedText style={styles.logoLetter}>{app.name.slice(0, 1)}</ThemedText>
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText type="smallBold">{app.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {app.question}
          </ThemedText>
        </View>
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        {app.description}
      </ThemedText>

      <View style={styles.featureRow}>
        {app.features.map((feature) => (
          <View key={feature} style={[styles.featurePill, { borderColor: app.color }]}>
            <ThemedText type="small" style={{ color: app.color, fontSize: 11 }}>
              {feature}
            </ThemedText>
          </View>
        ))}
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.why}>
        💡 {app.whyUse}
      </ThemedText>

      <View style={styles.actions}>
        {downloadUrl && (
          <GradientButton
            label="Télécharger"
            gradient={[app.color, app.color]}
            onPress={() => Linking.openURL(downloadUrl)}
            style={{ flex: 1 }}
          />
        )}
        {app.websiteUrl && (
          <Pressable
            onPress={() => Linking.openURL(app.websiteUrl!)}
            style={[styles.siteButton, { borderColor: theme.border }]}
          >
            <ThemedText type="small" style={{ color: theme.text, fontWeight: '600' }}>
              Site officiel
            </ThemedText>
          </Pressable>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: Spacing.three, gap: Spacing.two },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  logo: { width: 44, height: 44, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  logoLetter: { color: '#FFFFFF', fontWeight: '700', fontSize: 18 },
  featureRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  featurePill: { borderWidth: 1, borderRadius: Radius.pill, paddingVertical: 3, paddingHorizontal: 10 },
  why: { fontStyle: 'italic' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 4, alignItems: 'center' },
  siteButton: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
