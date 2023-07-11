import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from '../screens/Profile'
import Services from '../screens/Services'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function TabRoutes() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Services') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline'
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          )
        },
        tabBarActiveTintColor: '#875a33',
        tabBarInactiveTintColor: '#9e9ea0',
      })}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Services" component={Services} />
    </Tab.Navigator>
  )
}
