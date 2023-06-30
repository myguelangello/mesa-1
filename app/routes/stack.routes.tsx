import { createStackNavigator } from '@react-navigation/stack'
import Services from '../screens/Services'
import ServiceDetails from '../screens/ServiceDetails'

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="services" component={Services} />
      <Stack.Screen name="details" component={ServiceDetails} />
    </Stack.Navigator>
  )
}
