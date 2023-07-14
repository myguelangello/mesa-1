import React, { useEffect, useState } from 'react'
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
  Switch,
} from 'react-native'

import { RouteProp, useIsFocused } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../routes/stack.routes'

import Title from '../components/Title'
import ServiceCard from '../components/ServiceCard'

import * as SecureStore from 'expo-secure-store'
import { FetchedServiceProps } from './Services' // Services Props

import {
  convertPostedAgo,
  convertDate,
} from '../../src/utils/convert-date-and-time' // Date and Time
import { api } from '../../src/lib/api' // API
import { UserProps } from '../components/User'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

// type route and navigation props
// eslint-disable-next-line no-unused-vars
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>
// eslint-disable-next-line no-unused-vars
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>

type ProfileScreenProps = {
  navigation: any
  user?: UserProps
}

export default function Profile({ navigation, user }: ProfileScreenProps) {
  const isFocused = useIsFocused()

  const [services, setServices] = useState<FetchedServiceProps[]>([])
  const [filteredServices, setFilteredServices] = useState<
    FetchedServiceProps[]
  >([])

  // profile infos
  const [userId, setUserId] = useState<number | null>(null)
  const [name, setName] = useState<string | undefined>()
  const [email, setEmail] = useState<string | undefined>()
  const [picture, setPicture] = useState<string | undefined>()
  const [bio, setBio] = useState<string | undefined>()
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>()
  const [role, setRole] = useState<string | undefined>()

  useEffect(() => {
    getServices() // busca de serviços
  }, [])

  useEffect(() => {
    handleAuthenticated() // verificando se o usuário está logado
  }, [])

  useEffect(() => {
    handleFilteredServices() // está buscando todos os serviços por usuário
  }, [])

  useEffect(() => {
    getServices()
    handleFilteredServices()
    handleAuthenticated()
  }, [isFocused])

  async function getServices() {
    try {
      /**
       * TODO: implementar busca de serviços por usuário
       * 1- Caso o usuário seja um prestador de serviços (role === '1) buscar os serviços no qual ele é o prestador contratado
       * 2- Caso o usuário seja um contratante de serviços (role === '2) buscar os serviços no qual ele cadastrou
       */
      const response = (await api.get('/api/services/')) as {
        data: FetchedServiceProps[]
      }

      setServices(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAuthenticated() {
    try {
      SecureStore.getItemAsync('user')
        .then((user) => {
          if (user) {
            const userParsed = JSON.parse(user) as UserProps
            setName(userParsed.name)
            setEmail(userParsed.email)
            setPicture(userParsed.picture)
            setBio(userParsed.bio)
            setIsAvailable(userParsed.available)
            setRole(userParsed.role)
            setUserId(userParsed.id)
          }
        })
        .catch((error) => {
          console.error(error)
          Alert.alert('Erro', 'Não foi possível carregar o usuário', [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('SignIn'),
            },
          ])
        })
    } catch (error) {
      console.error(error)
    }
  }

  function handleLogout() {
    SecureStore.deleteItemAsync('user').then(() => {
      SecureStore.deleteItemAsync('token').then(() => {
        navigation.navigate('SignIn')
      })
    })
  }

  function handleFilteredServices() {
    if (role === '1') {
      const hasUserId = services.filter((service) =>
        service.enlisted.includes(userId),
      )
      setFilteredServices(hasUserId)
    } else if (role === '2') {
      const hasUserId = services.filter(
        (service) => service.contractor === userId,
      )
      console.log(userId)
      console.log(hasUserId)
      setFilteredServices(hasUserId)
      filteredServices.map((service) => console.log(service.title))
    }
  }

  function navigateToDetails(service: FetchedServiceProps) {
    navigation.navigate('Details', { service })
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
        <View className="-z-10 items-center bg-zinc-50 px-4 pb-0">
          <Title content={name} className="mt-14 text-zinc-900" />

          <Text className="my-3 font-interRegular text-base leading-5 text-zinc-900">
            {email}
          </Text>
          <View className="flex flex-row items-center justify-center">
            <TouchableOpacity onPress={handleLogout}>
              <Text className="ml-2 text-red-500 underline">Sair</Text>
            </TouchableOpacity>
          </View>

          {role === '1' && (
            <View className="mt-10 w-full flex-row items-center justify-start">
              <Text className="font-body mr-2 text-base text-zinc-600">
                Disponível para trabalhar?
              </Text>
              <Switch
                value={isAvailable}
                onValueChange={setIsAvailable}
                trackColor={{ false: '#bebebf', true: '#d1bfb0' }}
                thumbColor={isAvailable ? '#875a33' : '#9e9ea0'}
              />
            </View>
          )}

          <View className="my-10 flex w-full flex-1 space-y-4 divide-zinc-100">
            <Title
              content="Biografia"
              className="text-start text-xl text-zinc-800"
            />
            {bio ? (
              <Text className="text-start text-base text-zinc-800">{bio}</Text>
            ) : (
              <Text className="text-start text-base text-zinc-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis obcaecati sequi consequuntur nulla.
              </Text>
            )}
          </View>

          {/* Serviços */}
          <View className="mb-20 flex w-full flex-1 space-y-4 divide-zinc-100">
            <View className="flex flex-row items-center">
              <Title
                content={
                  role === '1' ? 'Minhas candidaturas' : 'Serviços cadastrados'
                }
                className="mr-2 text-start text-xl text-zinc-800"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleFilteredServices}
              >
                <MaterialCommunityIcons
                  name="update"
                  size={24}
                  color="#875a33"
                />
              </TouchableOpacity>
            </View>

            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                return (
                  <TouchableOpacity
                    key={service.id}
                    className="rounded-lg bg-zinc-100 p-3"
                    activeOpacity={0.9}
                    onPress={() => navigateToDetails(service)}
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
              })
            ) : (
              <Text className="text-start text-base text-zinc-500">
                {role === '1'
                  ? 'Você ainda não se candidatou a nenhum serviço'
                  : 'Você não possui serviços cadastrados'}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
