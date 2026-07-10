import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { getIcon } from '@/components/icon-map';
import { Gradients, Radius, Spacing } from '@/constants/theme';
import type { CityMeta } from '@/data/types';

export function Hero({ city }: { city: CityMeta }) {
  return (
    <LinearGradient
      colors={Gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.glow} pointerEvents="none" />

      <ThemedText style={styles.title}>🏙️ {city.name}</ThemedText>
      <ThemedText style={styles.tagline}>{city.tagline}</ThemedText>

      <View style={styles.statsRow}>
        {city.stats.map((stat, i) => {
          const Icon = getIcon(stat.icon);
          return (
            <View key={stat.label} style={styles.statItem}>
              <Icon size={18} color="#FFFFFF" />
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                delay={i * 150}
                style={styles.statValue}
              />
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </View>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.four,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: '700' },
  tagline: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4, marginBottom: Spacing.four },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', gap: 2, flex: 1 },
  statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, textAlign: 'center' },
});
