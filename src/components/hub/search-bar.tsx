import { Search, X } from 'lucide-react-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Que cherches-tu aujourd\'hui ?',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
    >
      <Search size={18} color={theme.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text }]}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <X size={16} color={theme.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    height: 48,
  },
  input: { flex: 1, fontSize: 15 },
});
