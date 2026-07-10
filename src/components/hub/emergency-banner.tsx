import * as Haptics from 'expo-haptics';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Phone } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import type { EmergencyContact } from '@/data/types';

export function EmergencyBanner({ contacts }: { contacts: EmergencyContact[] }) {
  return (
    <View style={[styles.banner, { backgroundColor: '#7F1D1D' }]}>
      <ThemedText style={styles.title}>🚨 En cas d&apos;urgence, appelez immédiatement</ThemedText>
      <View style={styles.grid}>
        {contacts.map((contact) => (
          <Pressable
            key={contact.id}
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
              }
              Linking.openURL(`tel:${contact.phone.replace(/\s/g, '')}`);
            }}
            style={styles.button}
          >
            <Phone size={16} color="#7F1D1D" />
            <ThemedText style={styles.number}>{contact.phone}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { borderRadius: Radius.xl, padding: Spacing.four, gap: Spacing.three },
  title: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, justifyContent: 'center' },
  button: {
    minWidth: 80,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    gap: 4,
  },
  number: { color: '#7F1D1D', fontWeight: '800', fontSize: 20 },
});
