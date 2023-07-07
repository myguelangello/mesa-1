/* eslint-disable no-unused-vars */
import 'react-native-gesture-handler'
import React, { useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// imports OAuth2 Google
import * as AuthSession from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

// eslint-disable-next-line no-unused-vars
import Routes from './app/routes'
import Loading from './app/components/Loading'
import { StatusBar } from 'expo-status-bar'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'

WebBrowser.maybeCompleteAuthSession()

type AuthResponse = {
  type: string
  params: {
    access_token: string
    /* token_type: string
    expires_in: string */
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState(null)

  const [hasLoadedFonts] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  if (!hasLoadedFonts) {
    return <Loading />
  }

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
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        )
        const userFetcher = await response.json()
        console.log(userFetcher)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center">
        <StatusBar />
        <TouchableOpacity
          className="rounded-full bg-red-500 p-4"
          onPress={handleGoogleSignIn}
        >
          <Text className="text-zinc-50">Sign In With Google</Text>
        </TouchableOpacity>
        {/* <Routes /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
