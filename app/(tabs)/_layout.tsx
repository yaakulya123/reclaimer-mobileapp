import { Link, Tabs } from 'expo-router';
import { Home, Map, ScanLine, User, Wallet } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

function TabBarIcon(props: {
  icon: React.ElementType;
  color: string;
}) {
  const Icon = props.icon;
  return <Icon size={28} style={{ marginBottom: -3 }} color={props.color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          elevation: 0,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme ?? 'light'].border,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? 'light'].text,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon icon={Home} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <User
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Find',
          tabBarIcon: ({ color }) => <TabBarIcon icon={Map} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Deposit',
          tabBarIcon: ({ color }) => <TabBarIcon icon={ScanLine} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <TabBarIcon icon={Wallet} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon icon={User} color={color} />,
        }}
      />
    </Tabs>
  );
}
