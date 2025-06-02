import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Compass, 
  MessageSquare, 
  BellRing, 
  User 
} from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';
import { theme } from '@/constants/theme';

function TabBarIcon({ Icon, isFocused }: { Icon: any, isFocused: boolean }) {
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    scale.value = withTiming(isFocused ? 1.15 : 1, { duration: 200 });
    return {
      transform: [{ scale: scale.value }]
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Icon 
        size={24} 
        color={isFocused ? theme.colors.primary[600] : theme.colors.gray[400]} 
        strokeWidth={isFocused ? 2.5 : 2}
      />
    </Animated.View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary[600],
        tabBarInactiveTintColor: theme.colors.gray[400],
        tabBarStyle: {
          ...styles.tabBar,
          height: 64 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={Compass} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ focused }) => (
            <View>
              <TabBarIcon Icon={MessageSquare} isFocused={focused} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <View>
              <TabBarIcon Icon={BellRing} isFocused={focused} />
              <View style={styles.notificationBadge} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={User} isFocused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 12,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginTop: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error[500],
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
});