import { createStackNavigator } from '@react-navigation/stack'

import TabRoutes from './tab.routes'
import ServiceDetails from '../screens/ServiceDetails'
import CreateService from '../screens/CreateService'
import Signin from '../screens/Signin'

export type RootStackParamList = {
  SignIn: undefined
  Home: undefined
  NewService: undefined
  Details: {
    serviceId: number
  }
  Profile: {
    user: undefined
  }
}

const Stack = createStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={Signin} />
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen name="NewService" component={CreateService} />
      <Stack.Screen name="Details" component={ServiceDetails} />
    </Stack.Navigator>
  )
}
