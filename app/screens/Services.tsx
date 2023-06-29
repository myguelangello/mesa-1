import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Icon from '@expo/vector-icons/FontAwesome5'

import ServiceCard from '../components/ServiceCard'
import Title from '../components/Title'
import { useEffect, useState } from 'react'
import { api } from '../../src/lib/api'

interface FetchedServiceProps {
  title: string
  description: string
  hours: string
  hours_value: string
  created_at: string
  updated_at: string
}

export default function Services() {
  const { bottom, top } = useSafeAreaInsets()

  const [services, setServices] = useState<FetchedServiceProps[]>([])

  async function getServices() {
    try {
      const response = await api.get('/api/services/')

      setServices(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-4"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      contentInset={{ bottom, top }}
    >
      {/* Header */}
      <View className="flex flex-row justify-between">
        <Title content="Serviços" />
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
        >
          <Icon name="plus" size={24} color="#eaeaea" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        className="mt-8 h-[50] rounded-full border-[1px] border-gray-100 bg-zinc-50 px-4 pb-2 text-base text-gray-900"
        placeholderTextColor="#9e9ea0"
        placeholder="Pesquisar..."
      />

      <View className="mt-8">
        {services.map((service, index) => {
          return (
            <ServiceCard
              key={index}
              serviceImage={
                'https://img.freepik.com/vetores-premium/logotipo-do-estilo-vintage-retro-do-restaurante_642964-120.jpg'
              }
              role={service.title}
              address={service.description}
              postedAgo={`R$ ${parseFloat(service.hours_value).toFixed(0)}/h`}
              startDate={service.created_at}
              startTime={service.hours}
            />
          )
        })}
        <ServiceCard
          serviceImage={
            'https://img.freepik.com/vetores-premium/logotipo-do-estilo-vintage-retro-do-restaurante_642964-120.jpg'
          }
          role={''}
          address="Moral Burguer"
          postedAgo="5 min"
          startDate="01/07/2023"
          startTime="08:00 - 16:00"
        />
      </View>
    </ScrollView>
  )
}
