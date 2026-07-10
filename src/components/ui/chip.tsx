import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== 'web') Haptics.selectionAsync();
        onPress?.();
      }}
      style={[
        styles.chip,
        {
          backgroundColor: active ? theme.primary : theme.card,
          borderColor: active ? 'transparent' : theme.border,
        },
      ]}
    >
      <Text style={{ color: active ? '#FFFFFF' : theme.textSecondary, fontWeight: '600', fontSize: 13 }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.pill,
    borderWidth: 1,
    marginRight: 8,
  },
});
