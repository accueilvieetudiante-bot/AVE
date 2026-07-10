import { BlurView } from 'expo-blur';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Radius, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export type GlassCardProps = ViewProps & {
  radius?: number;
  intensity?: number;
};

export function GlassCard({ style, radius = Radius.lg, intensity = 40, children, ...rest }: GlassCardProps) {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <View style={[styles.wrapper, { borderRadius: radius }, Shadows.soft, style]} {...rest}>
      <BlurView
        intensity={intensity}
        tint={scheme === 'dark' ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: theme.glassBg, borderRadius: radius, borderWidth: 1, borderColor: theme.glassBorder },
        ]}
      />
      <View style={{ borderRadius: radius }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
});
