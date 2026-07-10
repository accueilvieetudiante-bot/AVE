import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SituationOption<T extends string> = {
  tag: T;
  emoji: string;
  label: string;
};

export function SituationPicker<T extends string>({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string;
  options: SituationOption<T>[];
  selected: T | null;
  onSelect: (tag: T | null) => void;
}) {
  const theme = useTheme();

  return (
    <View style={{ gap: Spacing.two }}>
      <ThemedText type="smallBold">{question}</ThemedText>
      <View style={styles.grid}>
        {options.map((option) => {
          const active = selected === option.tag;
          return (
            <Pressable
              key={option.tag}
              onPress={() => {
                if (Platform.OS !== 'web') Haptics.selectionAsync();
                onSelect(active ? null : option.tag);
              }}
              style={[
                styles.option,
                {
                  backgroundColor: active ? theme.primary : theme.card,
                  borderColor: active ? 'transparent' : theme.border,
                },
              ]}
            >
              <ThemedText style={styles.emoji}>{option.emoji}</ThemedText>
              <ThemedText
                type="smallBold"
                style={{ color: active ? '#FFFFFF' : theme.text, textAlign: 'center' }}
              >
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  option: {
    width: '48%',
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    gap: 6,
  },
  emoji: { fontSize: 26 },
});
