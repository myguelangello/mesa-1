import { useEffect, useState } from 'react'

// imports OAuth2 Google
import * as AuthSession from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TouchableOpacity, View, Alert } from 'react-native'

import { RadioGroup, RadioButtonProps } from 'react-native-radio-buttons-group'
import { api } from '../../src/lib/api'

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

type UserSecureStore = {
  id: number | null
  name: string
  email: string
  picture: string
  available: boolean
  role: string
}

export default function Signin({ navigation }: SignInProps) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false)
  const [roleUser, setRoleUser] = useState<string | undefined>()
  const radioButtons: RadioButtonProps[] = [
    { id: '1', label: 'Estou em busca de emprego' },
    {
      id: '2',
      label: 'Estou em busca de um colaborador',
    },
  ]

  useEffect(() => {
    async function verifyLogged() {
      await SecureStore.getItemAsync('user').then((user) => {
        setIsUserAuthenticated(!!user)
        if (user) {
          navigation.navigate('Home')
        }
      })
    }
    if (isUserAuthenticated) {
      navigation.navigate('Home')
    }
    verifyLogged()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        await SecureStore.setItemAsync('access_token', params.access_token) // setando o token de acesso no secure store
        const response = await api.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        ) // pegando os dados do usuário logado

        const user = await response.data // setando os dados do usuário logado
        user.role = roleUser // setando o tipo de usuário logado [1 - employee, 2 - contractor
        user.available = true // setando o status de disponibilidade do usuário logado
        user.id = null // setando o id como undefined para não dar erro na requisição

        await SecureStore.setItemAsync('user', JSON.stringify(user)) // setando os dados do usuário logado no secure store

        const access_token = await SecureStore.getItemAsync('access_token') // pegando o token de acesso do secure store

        const user_secure_store = await SecureStore.getItemAsync('user').then(
          (user) => {
            return JSON.parse(user) as UserSecureStore
          },
        ) // pegando os dados do usuário logado no secure store

        if (
          access_token !== null &&
          user_secure_store !== null &&
          roleUser !== undefined
        ) {
          await handleRegisterUser(
            user_secure_store.name,
            user_secure_store.email,
            user_secure_store.picture,
            user_secure_store.available,
            user_secure_store.role,
          )
        }
      }
    } catch (error) {
      Alert.alert('Erro ao logar com o Google', 'Por favor, tente novamente.')
      console.error(error)
    }
  }

  async function handleRegisterUser(
    name: string,
    email: string,
    picture: string,
    available: boolean,
    role: string,
    bio?: string,
  ) {
    try {
      if (role === '1') {
        const response = await api.post('/api/employees/', {
          name,
          email,
          available,
        })

        if (response.status === 201) {
          const updatedEmployees: UserSecureStore = {
            id: response.data.id,
            name,
            email,
            picture,
            available,
            role,
          }
          await updateUserInSecureStore(updatedEmployees) // atualizando os dados do usuário logado no secure store

          Alert.alert(
            'Bem-vindo ao Mesa 1!',
            'Agora você pode encontrar um emprego de forma fácil.',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
              },
            ],
          )
        } else if (response.status === 400) {
          Alert.alert(
            'Usuário já cadastrado.',
            'Bem-bem-vindo de volta ao Mesa 1!',
            [
              {
                text: 'Entrar',
                onPress: () => navigation.navigate('Home'),
              },
            ],
          )
        } else {
          Alert.alert(
            'Não foi possível entrar como empregado.',
            'Experimente mudar o perfil ou então tente mais tarde.',
          )
        }
      } else if (role === '2') {
        const response = await api.post('/api/contractors/', {
          name,
          email,
          bio,
        })
        if (response.status === 201) {
          const updatedContractors: UserSecureStore = {
            id: response.data.id,
            name,
            email,
            picture,
            available,
            role,
          }
          await updateUserInSecureStore(updatedContractors) // atualizando os dados do usuário logado no secure store

          Alert.alert(
            'Bem-vindo ao Mesa 1!',
            'Agora você pode encontrar um colaborador de forma fácil.',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
              },
            ],
          )
        } else if (response.status === 400) {
          Alert.alert(
            'Usuário já cadastrado.',
            'Bem-bem-vindo de volta ao Mesa 1!',
            [
              {
                text: 'Entrar',
                onPress: () => navigation.navigate('Home'),
              },
            ],
          )
        } else {
          Alert.alert(
            'Não foi possível entrar como contratante.',
            'Experimente mudar o perfil ou então tente mais tarde.',
          )
        }
      }
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Erro ao entrar no Mesa 1',
        'Não foi possível acessar. Por favor, tente novamente.',
      )
    }
  }
  /* Função criada para atualizar o ID do usuário do Google para o do BANCO */
  async function updateUserInSecureStore(user: UserSecureStore) {
    try {
      const currentUser = await SecureStore.getItemAsync('user')
      if (currentUser !== null) {
        console.log('é diferente de null')

        const parsedUser: UserSecureStore = JSON.parse(currentUser)
        parsedUser.id = user.id // Atualizando o id do usuário logado para o id do usuário criado no banco

        const updatedUser: string = JSON.stringify(parsedUser) // transformando o objeto em string para poder salvar no secure store

        await SecureStore.setItemAsync('user', updatedUser) // atualizando o usuário logado no secure store já com novo id
        console.log('ID do usuário atualizado com sucesso!', 'ID: ', user.id)
        console.log('updatedUser', updatedUser)
      } else {
        console.log(
          'Usuário não encontrado no secure store.',
          'Não foi possível atualizar o ID do usuário.',
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar o valor do usuário', error)
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
        <View className="mt-20 flex h-48 w-full items-center justify-between px-2">
          <View className="w-full items-start justify-center gap-2 ">
            <Text className="text-start font-interMedium text-lg text-zinc-700">
              Qual o seu perfil e objetivo?
            </Text>
            <RadioGroup
              containerStyle={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
              radioButtons={radioButtons}
              onPress={setRoleUser}
              selectedId={roleUser}
            />
          </View>

          {roleUser && (
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex w-full items-center justify-center rounded-lg bg-red-500 p-4"
              onPress={handleGoogleSignIn}
            >
              <Text className="text-lg text-zinc-50">Entrar com o Google</Text>
            </TouchableOpacity>
          )}
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
