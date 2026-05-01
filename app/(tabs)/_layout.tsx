import React from 'react';
import { Tabs } from 'expo-router';
import { Search, Activity, Leaf, Grid3X3, Settings } from 'lucide-react-native';
import { brand } from '../../src/theme/colors';
import { HeaderLogo } from '../../src/components/HeaderLogo';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brand.lightSage,
        tabBarInactiveTintColor: brand.whiteSubtle,
        tabBarStyle: { backgroundColor: brand.darkGreen, borderTopColor: 'rgba(255,255,255,0.1)' },
        headerStyle: { backgroundColor: brand.darkGreen },
        headerTintColor: brand.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => <HeaderLogo />,
        // Pin the headerLeft slot to the top-left of the header so the logo
        // hugs the top edge instead of being vertical-centered. Horizontal
        // alignment with content (16px) is handled inside HeaderLogo itself.
        headerLeftContainerStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="diseases"
        options={{
          title: 'Diseases',
          tabBarIcon: ({ color, size }) => <Activity color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: 'Profiles',
          tabBarIcon: ({ color, size }) => <Leaf color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="matrix"
        options={{
          title: 'Matrix',
          tabBarIcon: ({ color, size }) => <Grid3X3 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
