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
        // hugs the top edge instead of being vertical-centered. The elements
        // Header applies a default `marginStart: 16` to its left container
        // when no back button is present (and a `marginEnd` next to the
        // title) — we zero those out so the logo's only horizontal offset
        // is the Pressable's own paddingLeft: 16, landing on the 16px
        // content gutter exactly.
        headerLeftContainerStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingHorizontal: 0,
          marginLeft: 0,
          marginRight: 0,
          marginStart: 0,
          marginEnd: 0,
          marginHorizontal: 0,
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
