import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Title from '../components/Title'
import ServiceCard from '../components/ServiceCard'
import { useEffect, useState } from 'react'
import {
  convertPostedAgo,
  convertDate,
} from '../../src/utils/convert-date-and-time'
import { api } from '../../src/lib/api'
import { FetchedServiceProps } from './Services'

export default function Profile() {
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
  const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView className="flex flex-1 bg-brown-400">
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom,
          paddingTop: top,
        }}
        className="flex flex-1"
      >
        {/* Header */}
        <View className="px-4">
          {/* <Text className="font-interRegular text-base leading-5 text-zinc-50 ">
              Editar
            </Text> */}

          <Title
            content="Perfil"
            className="text-center leading-9 text-zinc-50"
          />

          <Image
            source={{
              uri: 'https://source.unsplash.com/random',
            }}
            alt="Profile picture"
            className="top-8 z-20 mt-6 h-40 w-40 self-center rounded-full"
          />
        </View>
        <View className="-z-10 items-center bg-zinc-50 px-4 pb-0">
          <Title content="Myguel Angello" className="mt-14 text-zinc-900" />
          <Text className="my-3 font-interRegular text-base leading-5 text-zinc-900">
            myguel@mail.com
          </Text>

          <View className="my-10 flex w-full flex-1 space-y-4 divide-y-2 divide-zinc-100">
            {services.map((service) => {
              return (
                <TouchableOpacity key={service.id} activeOpacity={0.9}>
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
