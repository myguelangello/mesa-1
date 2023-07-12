import { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../routes/stack.routes'

import Title from '../components/Title'
import ServiceCard from '../components/ServiceCard'

import { FetchedServiceProps } from './Services' // Services Props

import {
  convertPostedAgo,
  convertDate,
} from '../../src/utils/convert-date-and-time' // Date and Time
import { api } from '../../src/lib/api' // API
import { UserProps } from '../components/User'

import * as SecureStore from 'expo-secure-store'

// type route and navigation props
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp
  route: ProfileScreenRouteProp
  user: UserProps
}

export default function Profile({ navigation, user }: ProfileScreenProps) {
  const [services, setServices] = useState<FetchedServiceProps[]>([])

  // profile infos
  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [picture, setPicture] = useState<string | undefined>()

  useEffect(() => {
    async function getServices() {
      try {
        const response = (await api.get('/api/services/')) as {
          data: FetchedServiceProps[]
        }

        setServices(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getServices()
  }, [])

  useEffect(() => {
    async function getUser() {
      try {
        SecureStore.getItemAsync('user')
          .then((user) => {
            if (user) {
              const userParsed = JSON.parse(user) as UserProps
              setName(userParsed.name)
              setEmail(userParsed.email)
              setPicture(userParsed.picture)
            }
          })
          .catch((error) => {
            console.error(error)
            Alert.alert('Erro ao carregar usuário')
          })
      } catch (error) {
        console.error(error)
      }
    }
    getUser()
  }, [])

  function handleLogout() {
    SecureStore.deleteItemAsync('user').then(() => {
      SecureStore.deleteItemAsync('token').then(() => {
        navigation.navigate('SignIn')
      })
    })
  }

  const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView
      className={
        Platform.OS === 'android'
          ? `flex flex-1 bg-brown-400`
          : 'flex flex-1 bg-zinc-100'
      }
    >
      <StatusBar style="light" backgroundColor="#875a33" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          Platform.OS === 'android' && {
            paddingBottom: bottom,
            paddingTop: top,
          }
        }
        className="flex flex-1"
      >
        {/* Header */}
        <View className="z-40 bg-brown-400 px-4">
          {/* <View className="flex-1 flex-row items-center justify-between">
            <Text className="mt-8 font-interRegular text-base text-brown-400 ">
              Editar
            </Text>

            <Title
              content="Perfil"
              className={
                Platform.OS === 'android'
                  ? ` text-center  text-zinc-50`
                  : `mt-8 text-center  text-zinc-50`
              }
            />
            <TouchableOpacity>
              <Text className="mt-8 font-interRegular text-base  leading-4 text-zinc-50  underline ">
                Entrar
              </Text>
            </TouchableOpacity>
          </View> */}

          <Image
            source={{
              uri: picture, // 'https://capka.co.in/wp-content/uploads/2022/07/default-placeholder.png',
            }}
            alt="Profile picture"
            className="top-8 z-20 mt-6 h-40 w-40 self-center rounded-full"
          />
        </View>
        <View className="-z-10 min-h-min items-center bg-zinc-50 px-4 pb-0">
          <Title content={name} className="mt-14 text-zinc-900" />

          <Text className="my-3 font-interRegular text-base leading-5 text-zinc-900">
            {email}
          </Text>
          <View className="flex flex-row items-center justify-center">
            <Text className="ml-2 text-blue-500 underline">Editar</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text className="ml-2 text-red-500 underline"> Sair</Text>
            </TouchableOpacity>
          </View>

          <View className="my-10 flex w-full flex-1 space-y-4 divide-y-2 divide-zinc-100">
            <Title
              content="Serviços cadastrados"
              className="text-start text-2xl text-zinc-800"
            />
            {services.map((service) => {
              return (
                <TouchableOpacity
                  key={service.id}
                  className="rounded-lg bg-zinc-100 p-3"
                  activeOpacity={0.9}
                >
                  <ServiceCard
                    serviceImage={
                      'https://img.freepik.com/vetores-premium/logotipo-do-estilo-vintage-retro-do-restaurante_642964-120.jpg'
                    }
                    role={service.title}
                    address={service.address}
                    postedAgo={convertPostedAgo(service.created_at)} // `R$ ${parseFloat(service.hours_value).toFixed(0)}/h`
                    startDate={convertDate(service.service_date, 'DD/MM/YY')}
                    startTime={service.start_time.slice(0, -3)}
                  />
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
