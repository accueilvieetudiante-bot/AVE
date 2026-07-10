import { useState } from 'react';
import { Link } from 'expo-router';
import {
  HeartPulse,
  PhoneCall,
  Smartphone,
  UtensilsCrossed,
  Wallet,
  Lightbulb,
} from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Hero } from '@/components/hub/hero';
import { SearchBar } from '@/components/hub/search-bar';
import { CategoryCard } from '@/components/hub/category-card';
import { UpcomingTasksSection } from '@/components/hub/upcoming-tasks';
import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { SectionHeader } from '@/components/ui/section-header';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useCityContent } from '@/hooks/use-city-content';
import { useUniversalSearch } from '@/hooks/use-universal-search';
import { useTheme } from '@/hooks/use-theme';

const categories = [
  {
    href: '/hub/apps',
    icon: Smartphone,
    color: '#2563EB',
    title: 'Applications utiles',
    description: 'Le App Store de la vie étudiante à Aix.',
  },
  {
    href: '/hub/sante',
    icon: HeartPulse,
    color: '#EC4899',
    title: 'Santé & Bien-être',
    description: 'Écoute, médecins, psychologues.',
  },
  {
    href: '/hub/urgences',
    icon: PhoneCall,
    color: '#EF4444',
    title: "Numéros d'urgence",
    description: 'Appel direct, en un geste.',
  },
  {
    href: '/hub/aides-financieres',
    icon: Wallet,
    color: '#8B5CF6',
    title: 'Aides financières',
    description: 'APL, bourses, aides mobilité.',
  },
  {
    href: '/hub/aides-alimentaires',
    icon: UtensilsCrossed,
    color: '#F59E0B',
    title: 'Aides alimentaires',
    description: 'Épiceries solidaires, distributions.',
  },
  {
    href: '/hub/conseils',
    icon: Lightbulb,
    color: '#22C55E',
    title: 'Conseils AVE',
    description: 'Ce qu\'il faut savoir cette semaine.',
  },
];

export default function HubScreen() {
  const content = useCityContent();
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const results = useUniversalSearch(query, content);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Hero city={content.meta} />

        <SearchBar value={query} onChangeText={setQuery} />

        {results.length > 0 && (
          <GlassCard style={{ padding: Spacing.two }}>
            {results.map((result) => (
              <Link key={`${result.category}-${result.id}`} href={result.href as never} asChild>
                <Pressable style={styles.resultRow}>
                  <View style={{ flex: 1 }}>
                    <ThemedText type="small">{result.title}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                      {result.subtitle}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" style={{ color: theme.primary }}>
                    {result.categoryLabel}
                  </ThemedText>
                </Pressable>
              </Link>
            ))}
          </GlassCard>
        )}

        {query.trim().length === 0 && (
          <>
            <View style={styles.grid}>
              {categories.map((category) => (
                <CategoryCard key={category.href} {...category} />
              ))}
            </View>

            <UpcomingTasksSection tasks={content.upcomingTasks} />

            <View style={{ gap: Spacing.two }}>
              <SectionHeader title="💡 Conseil du moment" />
              {content.tips[0] && (
                <GlassCard style={{ padding: Spacing.three, gap: 6 }}>
                  <ThemedText type="smallBold">{content.tips[0].title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {content.tips[0].body}
                  </ThemedText>
                  <Link href="/hub/conseils" asChild>
                    <Pressable>
                      <ThemedText type="small" style={{ color: theme.primary, fontWeight: '600' }}>
                        Voir tous les conseils →
                      </ThemedText>
                    </Pressable>
                  </Link>
                </GlassCard>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.four,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
});
