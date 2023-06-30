import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { FetchedServiceProps } from './Services'
import { api } from '../../src/lib/api'

import Title from '../components/Title'

import Icon from '@expo/vector-icons/FontAwesome5'

export default function ServiceDetails({ route, navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const [serviceDetails, setServiceDetails] = useState<FetchedServiceProps>()

  const { itemId } = route.params

  async function getServices() {
    try {
      const response = await api.get(`/api/service-detail/${itemId}`)

      setServiceDetails(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-brown-400"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      contentInset={{ bottom, top }}
    >
      {/* Header */}
      <View className="mb-8 px-4">
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-10 w-10 items-center justify-center  rounded-full bg-transparent"
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={24} color="#eaeaea" />
          </TouchableOpacity>

          <Title content="Serviços" className="text-gray-50" />

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
          className="mt-8 aspect-video w-full rounded-xl"
        />
      </View>

      {/* Description */}
      <View className="h-full bg-white px-4">
        {/* Cargo */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-xl text-gray-700">
            {serviceDetails?.title}
          </Text>
          <Text className="font-interRegular text-base text-gray-400">
            {serviceDetails?.description}
          </Text>
        </View>

        {/* Local */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Endereço
          </Text>
          <Text className="font-interRegular text-base text-gray-400">
            {serviceDetails?.address}
          </Text>
        </View>

        {/* Data */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Data prevista
          </Text>
          <Text className="font-interRegular text-base text-gray-400">
            {serviceDetails?.service_date}
          </Text>
        </View>

        {/* Horário */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Horário previsto (carga horária)
          </Text>
          <Text className="font-interRegular text-base text-gray-400">
            {serviceDetails?.start_time} ({serviceDetails?.hours})
          </Text>
        </View>

        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Valor por hora
          </Text>
          <Text className="font-interRegular text-base text-gray-400">
            R$ {serviceDetails?.hours_value}
          </Text>
        </View>

        {/* Candidatura */}
        <View className="mt-8">
          <Text className="font-interSemiBold text-xl text-gray-400">
            Candidaturas
          </Text>
          <Text className="w-4/5 self-center font-interRegular text-base text-gray-200">
            No momento não há candidaturas para este serviço
          </Text>
        </View>
      </View>

      <StatusBar style="light" translucent />
    </ScrollView>
  )
}
