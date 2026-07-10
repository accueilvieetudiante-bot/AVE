import * as Haptics from 'expo-haptics';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import { MessageSquare, Phone } from 'lucide-react-native';

import { ThemedText } from '@/components/themed-text';
import { GlassCard } from '@/components/ui/glass-card';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { EmergencyContact } from '@/data/types';

export function EmergencyContactRow({ contact }: { contact: EmergencyContact }) {
  const theme = useTheme();

  function call() {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${contact.phone.replace(/\s/g, '')}`);
  }

  function sms() {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`sms:${contact.phone.replace(/\s/g, '')}`);
  }

  return (
    <GlassCard style={styles.card}>
      <View style={{ flex: 1, gap: 2 }}>
        <ThemedText type="smallBold">{contact.name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {contact.description}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {contact.availability}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={call} style={[styles.callButton, { backgroundColor: theme.danger }]}>
          <Phone size={14} color="#FFFFFF" />
          <ThemedText style={styles.callLabel}>{contact.phone}</ThemedText>
        </Pressable>
        {contact.smsCapable && (
          <Pressable onPress={sms} style={[styles.iconButton, { backgroundColor: theme.backgroundElement }]}>
            <MessageSquare size={16} color={theme.text} />
          </Pressable>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: Spacing.three, flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  actions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
  },
  callLabel: { color: '#FFFFFF', fontWeight: '700' },
  iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
