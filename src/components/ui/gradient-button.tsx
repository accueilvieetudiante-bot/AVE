import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Gradients, Radius } from '@/constants/theme';

export type GradientButtonProps = PressableProps & {
  label: string;
  size?: 'md' | 'lg';
  gradient?: readonly [string, string];
  disabled?: boolean;
};

export function GradientButton({
  label,
  size = 'md',
  gradient = Gradients.brand,
  disabled,
  onPress,
  style,
  ...rest
}: GradientButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={(e) => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
      style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }, style as object]}
      {...rest}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.base, size === 'lg' ? styles.lg : styles.md]}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  md: { paddingVertical: 12, paddingHorizontal: 20 },
  lg: { paddingVertical: 16, paddingHorizontal: 28 },
  label: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
});
