import { BlurView } from 'expo-blur';
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Compass, Home, LifeBuoy } from 'lucide-react-native';
import { Platform, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();
SplashScreen.hideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            position: 'absolute',
            borderTopWidth: 0,
            backgroundColor: Platform.OS === 'android' ? theme.backgroundElement : 'transparent',
            elevation: 0,
          },
          tabBarBackground: () =>
            Platform.OS !== 'android' ? (
              <BlurView
                intensity={60}
                tint={scheme === 'dark' ? 'dark' : 'light'}
                style={{ flex: 1 }}
              />
            ) : null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ title: 'Accueil', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
        />
        <Tabs.Screen
          name="evenements"
          options={{
            title: 'Événements',
            tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="hub"
          options={{
            title: 'Hub',
            tabBarIcon: ({ color, size }) => <LifeBuoy color={color} size={size} />,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
