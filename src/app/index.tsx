import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="small" themeColor="textSecondary">
            Salut 👋 · Aix-en-Provence
          </ThemedText>
          <ThemedText type="subtitle">AVE</ThemedText>
        </View>

        <GlassCard style={styles.card}>
          <ThemedText type="smallBold">🔥 Événement à la une</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Retrouvez les événements de votre campus dans l&apos;onglet Événements.
          </ThemedText>
        </GlassCard>

        <GlassCard style={styles.card}>
          <ThemedText type="smallBold">🧭 Besoin d&apos;aide ?</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Ouvrez l&apos;onglet Hub pour trouver une aide, un numéro d&apos;urgence ou
            une application utile en quelques secondes.
          </ThemedText>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  header: { gap: 2, marginBottom: Spacing.two },
  card: { padding: Spacing.four, gap: 6 },
});
