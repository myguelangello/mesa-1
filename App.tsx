import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

import { useFonts, Inter_600SemiBold } from '@expo-google-fonts/inter'
import { Loading } from './app/components/Loading'
import { Button } from './app/components/Button'

export default function App() {
  const [hasLoadedFonts] = useFonts({ Inter_600SemiBold })

  if (!hasLoadedFonts) {
    return <Loading />
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 px-5">
      <Text className="font-inter text-3xl leading-tight text-gray-950">
        Olá, bem-vindo ao Mesa1
      </Text>

      <View className="w-full items-center">
        {/* <Button
          title="Continue com Google"
          activeOpacity={0.8}
          className="mt-14"
          icon="sign-in-alt"
        /> */}
        {/* <Text className="mt-4 font-inter text-sm text-gray-300">ou</Text> */}

        <Button icon="google" title="Continuar com Google" className="mt-14" />
        {/* <User /> */}
      </View>

      <StatusBar style="auto" />
    </View>
  )
}
