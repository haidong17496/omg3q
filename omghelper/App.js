// App.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainScreen from './src/screens/MainScreen';
import PlanningScreen from './src/screens/PlanningScreen'; 
import SettingsScreen from './src/screens/SettingsScreen';

import { fetchRemoteConfig } from './src/constants/Config';
import { checkAndUpdateDatabase } from './src/services/SyncService';
import { COLORS } from './src/theme/Theme';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: '#16161a',
    text: '#ffffff',
    border: '#222',
  },
};

function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        initialRouteName="Tra cứu"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#16161a',
            borderTopWidth: 1,
            borderTopColor: '#222',
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: 4 },
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Tra cứu') iconName = 'database-search';
            else if (route.name === 'Kế hoạch') iconName = 'clipboard-text-clock-outline';
            else if (route.name === 'Cài đặt') iconName = 'cog-outline';
            return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Tra cứu" component={MainScreen} />
        <Tab.Screen name="Kế hoạch" component={PlanningScreen} />
        <Tab.Screen name="Cài đặt" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Đang khởi tạo...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoadingMsg("Đang tải cấu hình...");
        await fetchRemoteConfig();
        setLoadingMsg("Đang đồng bộ dữ liệu...");
        await checkAndUpdateDatabase();
        setIsReady(true);
      } catch (e) {
        console.error("Init Error:", e);
        setError("Lỗi khởi tạo. Vui lòng kiểm tra internet.");
      }
    };
    initApp();
  }, []);

  if (error) return <View style={styles.centered}><Text style={{color:'#fff'}}>{error}</Text></View>;

  if (!isReady) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: '#888', fontSize: 12, marginTop: 20 }}>{loadingMsg}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }
});