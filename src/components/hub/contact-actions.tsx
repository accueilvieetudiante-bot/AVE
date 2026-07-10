import * as Haptics from 'expo-haptics';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Phone, Mail, Globe, AtSign, MapPin } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Action = {
  icon: typeof Phone;
  label: string;
  onPress: () => void;
};

export function ContactActions({
  phone,
  email,
  website,
  instagram,
  address,
}: {
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  address?: string;
}) {
  const theme = useTheme();

  const actions: Action[] = [];
  if (phone) {
    actions.push({
      icon: Phone,
      label: 'Appeler',
      onPress: () => Linking.openURL(`tel:${phone.replace(/\s/g, '')}`),
    });
  }
  if (email) {
    actions.push({ icon: Mail, label: 'Écrire', onPress: () => Linking.openURL(`mailto:${email}`) });
  }
  if (website) {
    actions.push({ icon: Globe, label: 'Site', onPress: () => Linking.openURL(website) });
  }
  if (instagram) {
    const handle = instagram.replace('@', '');
    actions.push({
      icon: AtSign,
      label: 'Instagram',
      onPress: () => Linking.openURL(`https://instagram.com/${handle}`),
    });
  }
  if (address) {
    actions.push({
      icon: MapPin,
      label: 'Itinéraire',
      onPress: () =>
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`),
    });
  }

  if (actions.length === 0) return null;

  return (
    <View style={styles.row}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          onPress={() => {
            if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            action.onPress();
          }}
          style={[styles.action, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
        >
          <action.icon size={14} color={theme.primary} />
          <ThemedText type="small" style={{ color: theme.primary, fontWeight: '600' }}>
            {action.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
});
