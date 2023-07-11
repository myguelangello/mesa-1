import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

import { FetchedServiceProps } from './Services'

import Title from '../components/Title'

import Icon from '@expo/vector-icons/FontAwesome5'
import { convertDate } from '../../src/utils/convert-date-and-time'

export default function ServiceDetails({ route, navigation }) {
  const { bottom, top } = useSafeAreaInsets()
  const { service } = route.params as { service: FetchedServiceProps }

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
            className="mb-4  mt-8 aspect-video w-full rounded-xl"
          />
        </View>

        {/* Description */}
        <View className="h-full bg-zinc-50 px-4">
          {/* Cargo */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-xl text-gray-700">
              {service?.title}
            </Text>
            <Text className="font-interRegular text-base text-gray-400">
              {service?.description}
            </Text>
          </View>

          {/* Local */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-gray-700">
              Endereço
            </Text>
            <Text className="font-interRegular text-base text-gray-400">
              {service?.address}
            </Text>
          </View>

          {/* Data */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-gray-700">
              Data prevista
            </Text>
            <Text className="font-interRegular text-base text-gray-400">
              {convertDate(service?.service_date, 'dddd, D MMMM, YYYY')}
            </Text>
          </View>

          {/* Horário */}
          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-gray-700">
              Horário previsto (carga horária)
            </Text>
            <Text className="font-interRegular text-base text-gray-400">
              {service?.start_time} ({service?.hours.slice(0, -3)})
            </Text>
          </View>

          <View className="mt-4">
            <Text className="font-interSemiBold text-lg text-gray-700">
              Valor por hora
            </Text>
            <Text className="font-interRegular text-base text-gray-400">
              R$ {service?.hours_value}
            </Text>
          </View>

          {/* Candidatura */}
          <View className="mb-8 mt-8">
            <Text className="font-interSemiBold text-xl text-gray-400">
              Candidaturas
            </Text>
            <Text className="w-4/5 self-center font-interRegular text-base text-gray-200">
              No momento não há candidaturas para este serviço
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
