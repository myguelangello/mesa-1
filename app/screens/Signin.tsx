import { useState } from 'react'

import * as WebBrowser from 'expo-web-browser'
import { Text, TouchableOpacity, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// imports OAuth2 Google
import * as AuthSession from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

import { UserProps } from '../components/User'

WebBrowser.maybeCompleteAuthSession()

type SignInProps = {
  navigation: any
}

type AuthResponse = {
  type: string
  params: {
    access_token: string
  }
}

export default function Signin({ navigation }: SignInProps) {
  const [userData, setUserData] = useState<UserProps>(null as UserProps)

  async function handleGoogleSignIn() {
    try {
      const CLIENT_ID =
        '506374344454-jfffptb28rsqpiabunlenido01gldca3.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@myguel/mobile'
      const SCOPE = encodeURI('profile email')
      const RESPONSE_TYPE = 'token'

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse

      if (type === 'success') {
        await SecureStore.setItemAsync('access_token', params.access_token)

        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        )
        const user = await response.json()

        setUserData(user)

        const store = await SecureStore.getItemAsync('access_token')
        if (store !== null && user !== null) {
          navigation.navigate('Home', { userData })
        }
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível fazer o login. Por favor, tente novamente.',
      )
      console.error(error)
    }
  }
  return (
    <SafeAreaView className="flex h-screen flex-1 items-center justify-center">
      <View className="flex h-4/5 w-full flex-col items-center justify-between">
        <View className="flex w-full items-start justify-start px-2">
          <Text className="text-start font-interMedium text-4xl text-zinc-800">
            Entre no Mesa 1
          </Text>
          <View className="flex items-start justify-start">
            <Text className="text-start font-interMedium text-lg text-zinc-600">
              E veja as oportunidades surgirem para você rapidamente
            </Text>
          </View>
        </View>
        <View className="mt-20 flex w-full items-center justify-center px-2">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex w-full items-center justify-center rounded-lg bg-red-500 p-4"
            onPress={handleGoogleSignIn}
          >
            <Text className="text-lg text-zinc-50">Entrar com o Google</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-12 flex">
          <Text className="text-center text-sm text-zinc-600 underline">
            Política de privacidade
          </Text>
          <Text className="text-center text-sm text-zinc-600 underline">
            Termos de uso
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}