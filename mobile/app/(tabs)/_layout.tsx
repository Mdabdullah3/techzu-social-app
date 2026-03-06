import TopHeader from '@/components/common/TopHeader';
import { COLORS } from '@/constants/Theme';
import { Tabs } from 'expo-router';
import { Home, Mail, Plus, Search } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#444',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'rgba(5,5,5,0.95)',
          borderTopColor: '#1A1A1A',
          height: 55,
          position: 'absolute',
          elevation: 0,
        },
        // Global header
        header: () => <TopHeader />,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home size={24} color={color} strokeWidth={2.5} />
        }}
      />

      {/* --- ELITE CREATE POST CONFIG --- */}
      <Tabs.Screen
        name="create-post"
        options={{
          headerShown: false,      // 1. THIS HIDES YOUR TOPBAR
          tabBarStyle: { display: 'none' }, // 2. THIS HIDES THE BOTTOM TABS (Focus Mode)
          tabBarIcon: ({ color }) => (
            <View style={styles.postBtn}>
              <Plus size={24} color="white" strokeWidth={3} />
            </View>
          )
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => <Mail size={24} color={color} strokeWidth={2.5} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  postBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Floating effect
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10
  }
});