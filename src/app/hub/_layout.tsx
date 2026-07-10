import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function HubLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Hub Étudiant', headerShown: false }} />
      <Stack.Screen name="apps" options={{ title: 'Applications utiles' }} />
      <Stack.Screen name="sante" options={{ title: 'Santé & Bien-être' }} />
      <Stack.Screen name="urgences" options={{ title: "Numéros d'urgence" }} />
      <Stack.Screen name="aides-financieres" options={{ title: 'Aides financières' }} />
      <Stack.Screen name="aides-alimentaires" options={{ title: 'Aides alimentaires' }} />
      <Stack.Screen name="conseils" options={{ title: 'Conseils AVE' }} />
    </Stack>
  );
}
