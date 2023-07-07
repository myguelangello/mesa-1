import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import StackRoutes from './stack.routes'
import Profile from '../screens/Profile'

import Icon from '@expo/vector-icons/Ionicons'

export default function TabRoutes() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'home') {
            iconName = focused ? 'ios-home' : 'ios-home-sharp'
          } else if (route.name === 'profile') {
            iconName = focused ? 'ios-person' : 'ios-person-sharp'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#875a33',
        tabBarInactiveTintColor: '#9e9ea0',
      })}
    >
      <Tab.Screen name="home" component={StackRoutes} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  )
}
