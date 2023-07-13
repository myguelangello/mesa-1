import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { FetchedServiceProps } from './Services'

import Title from '../components/Title'

import Icon from '@expo/vector-icons/FontAwesome5'
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

import { convertDate } from '../../src/utils/convert-date-and-time'
import Button from '../components/Button'
import { api } from '../../src/lib/api'

export default function ServiceDetails({ route, navigation }) {
  const { bottom, top } = useSafeAreaInsets()
  const { service } = route.params as { service: FetchedServiceProps }

  const [userRole, setUserRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    async function handleAuthenticated() {
      await SecureStore.getItemAsync('user').then((user) => {
        setUserRole(JSON.parse(user).role)
        setUserId(JSON.parse(user).id)
        console.log('user id =>', userId)
      })
    }
    handleAuthenticated()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleEnlistment() {
    let newEnlisted: number[] = []
    if (service.enlisted.includes(userId)) {
      Alert.alert('Oops!', `Você já está inscrito para este serviço!`)
    } else if (service.enlisted.length > 0) {
      newEnlisted = [...service.enlisted, userId]
      service.enlisted = newEnlisted
      handleApplyForService(newEnlisted)
    } else {
      newEnlisted = [userId]
      service.enlisted = newEnlisted
      handleApplyForService(newEnlisted)
    }
  }

  async function handleApplyForService(enlisted: number[]) {
    try {
      await api.put(`/api/service-detail/${service.id}/`, {
        title: service.title,
        description: service.description,
        hours: service.hours,
        hours_value: service.hours_value,
        contractor: service.contractor,
        service_date: service.service_date,
        enlisted,
      })
      service.enlisted = enlisted

      Alert.alert('Sucesso!', `Você se candidatou para este serviço!`)
    } catch (error) {
      console.error(error)
      Alert.alert('Ops!', `Não foi possível se candidatar para este serviço!`)
    }
  }

  return (
    <SafeAreaView className="flex flex-1 bg-brown-400">
      <StatusBar style="light" backgroundColor="#875a33" />

      <ScrollView
        className="flex flex-grow bg-brown-400"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          Platform.OS === 'android' && {
            paddingBottom: bottom,
            paddingTop: top,
          }
        }
        contentInset={{ bottom, top }}
      >
        {/* Header */}
        <View className="px-4">
          {/* Header */}
          <View className="flex flex-row items-center justify-between">
            <TouchableOpacity
              activeOpacity={0.8}
              className="h-10 w-10 items-center justify-center  rounded-full bg-transparent"
              onPress={() => navigation.navigate('Services')}
            >
              <Icon name="chevron-left" size={24} color="#eaeaea" />
            </TouchableOpacity>

            <Title content="Serviços" className="text-zinc-50" />

            <TouchableOpacity
              activeOpacity={0.8}
              className="h-10 w-10 items-center justify-center  rounded-full bg-transparent "
            >
              <Icon name="heart" size={24} color="#875a33" />
            </TouchableOpacity>
          </View>

          {/* Logo Image */}
          <Image
            source={{
              uri: 'https://img.freepik.com/vetores-premium/logotipo-do-estilo-vintage-retro-do-restaurante_642964-120.jpg',
            }}
            alt="Logo do estabelecimento"
            className="mb-4  mt-8 aspect-video w-full rounded-xl"
          />
        </View>

        {/* Description */}
        <View className="h-full bg-zinc-50 px-4">
          {/* Nº Candidaturas */}
          <View className="mt-4 flex-row items-center justify-end">
            <Text className="font-interRegular text-lg leading-tight text-zinc-500">
              {service?.enlisted.length}
            </Text>
            <Text className="ml-1 font-interRegular text-lg leading-tight text-zinc-500">
              candidaturas
            </Text>
          </View>
          {/* Cargo */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-zinc-800">
              {service?.title}
            </Text>
            <Text className="font-interRegular text-base text-zinc-500">
              {service?.description}
            </Text>
          </View>

          {/* Local */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-zinc-800">
              Endereço
            </Text>
            <Text className="font-interRegular text-base text-zinc-500">
              {service?.address}
            </Text>
          </View>

          {/* Data */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-zinc-800">
              Data prevista
            </Text>
            <Text className="font-interRegular text-base text-zinc-500">
              {convertDate(service?.service_date, 'dddd, D MMMM, YYYY')}
            </Text>
          </View>

          {/* Horário */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-zinc-800">
              Horário previsto (carga horária)
            </Text>
            <Text className="font-interRegular text-base text-zinc-500">
              {service?.start_time} ({service?.hours.slice(0, -3)})
            </Text>
          </View>

          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-zinc-800">
              Valor por hora
            </Text>
            <Text className="font-interRegular text-base text-zinc-500">
              R$ {service?.hours_value}
            </Text>
          </View>

          {/* Candidatura */}
          {userRole === '1' ? (
            <View className="mb-8 mt-8 w-full items-center">
              <Button title="Candidatar-se" onPress={handleEnlistment} />
            </View>
          ) : (
            <View className="mb-8 mt-8">
              <Title
                content="Candidaturas"
                className="font-interSemiBold text-xl text-zinc-700"
              />

              <Text className="w-4/5 self-center font-interRegular text-base text-zinc-400">
                No momento não há candidaturas para este serviço
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
