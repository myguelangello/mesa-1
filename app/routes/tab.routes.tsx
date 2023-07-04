import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/Ionicons'

import Profile from '../screens/Profile'
import StackRoutes from './stack.routes'
import React from 'react'

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'services') {
            iconName = focused ? 'ios-home' : 'ios-home'
          } else if (route.name === 'User') {
            iconName = focused ? 'ios-list' : 'ios-list-outline'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#875a33',
        tabBarInactiveTintColor: '#bebebf',
      })}
    >
      <Tab.Screen name="services" component={StackRoutes} />

      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  )
}
