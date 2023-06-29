import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'

import Loading from './app/components/Loading'
import Services from './app/screens/Services'

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
    <SafeAreaProvider>
      <Services />
      <StatusBar style="auto" translucent />
    </SafeAreaProvider>
  )
}
