import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'

import Routes from './app/routes'
import Loading from './app/components/Loading'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  if (!hasLoadedFonts) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar />
        <Routes />
      </SafeAreaProvider>
    </NavigationContainer>
  )
}
