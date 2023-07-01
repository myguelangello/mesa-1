import { useEffect, useState } from 'react'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import ServiceCard from '../components/ServiceCard'
import Title from '../components/Title'

import { api } from '../../src/lib/api'

import {
  convertDate,
  convertPostedAgo,
} from '../../src/utils/convert-date-and-time'

import Icon from '@expo/vector-icons/FontAwesome5'

export interface FetchedServiceProps {
  id: number
  title: string
  description: string
  hours: string
  hours_value: string
  created_at: string
  updated_at: string
  address: string
  service_date: string
  start_time: string
  contractor: number
}

export default function Services({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const [services, setServices] = useState<FetchedServiceProps[]>([])

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

  useEffect(() => {
    getServices()
  }, [])

  function navigateToDetails(serviceId: number) {
    navigation.navigate('details', { itemId: serviceId })
  }

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
          onPress={() => navigation.navigate('create-service')}
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
        {services.map((service) => {
          return (
            <TouchableOpacity
              key={service.id}
              activeOpacity={0.8}
              onPress={() => navigateToDetails(service.id)}
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
    </ScrollView>
  )
}
