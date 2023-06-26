import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import Title from '../components/Title'
import Button from '../components/Button'
import React from 'react'
import Icon from '@expo/vector-icons/FontAwesome5'

export default function ServiceDetails() {
  const { bottom, top } = useSafeAreaInsets()

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
          >
            <Icon name="chevron-left" size={24} color="#eaeaea" />
          </TouchableOpacity>

          <Title content="Serviços" className="text-gray-50" />

          <TouchableOpacity
            activeOpacity={0.8}
            className="h-10 w-10 items-center justify-center  rounded-full bg-transparent"
          >
            <Icon name="heart" size={24} color="#eaeaea" />
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
          <Text className="text-gray700 font-interSemiBold text-lg">
            Função
          </Text>
          <Text className="font-interRegular text-base text-gray-500">
            Atendente de balção e caixa
          </Text>
        </View>

        {/* Local */}
        <View className="mt-4">
          <Text className="text-gray700 font-interSemiBold text-lg">Local</Text>
          <Text className="font-interRegular text-base text-gray-500">
            Moral Burguer
          </Text>
        </View>

        {/* Data */}
        <View className="mt-4">
          <Text className="text-gray700 font-interSemiBold text-lg">
            Data prevista
          </Text>
          <Text className="font-interRegular text-base text-gray-500">
            Sábado, 01 de julho de 2023
          </Text>
        </View>

        {/* Horário */}
        <View className="mt-4">
          <Text className="text-gray700 font-interSemiBold text-lg">
            Horário(s) desejado(s)
          </Text>
          <Text className="font-interRegular text-base text-gray-500">
            08:00 - 16:00
          </Text>
        </View>

        <Button
          title="Candidatar-se"
          activeOpacity={0.9}
          className="mt-10 self-center bg-brown-400"
        />
      </View>

      <StatusBar style="light" translucent />
    </ScrollView>
  )
}
/* 
          cargo="Atendente de balção caixa"
          local="Moral Burguer"
          tempoPostagem="5 min"
          dataInicio="01/07/2023"
          horario="08:00 - 16:00"
*/
