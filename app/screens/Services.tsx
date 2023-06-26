import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Icon from '@expo/vector-icons/FontAwesome5'

import ServiceCard from '../components/ServiceCard'
import Title from '../components/Title'

export default function Services() {
  const { bottom, top } = useSafeAreaInsets()

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
        <ServiceCard
          logo={
            'https://img.freepik.com/vetores-premium/logotipo-do-estilo-vintage-retro-do-restaurante_642964-120.jpg'
          }
          cargo="Atendente de balção caixa"
          local="Moral Burguer"
          tempoPostagem="5 min"
          dataInicio="01/07/2023"
          horario="08:00 - 16:00"
        />

        <ServiceCard
          logo={
            'https://i.pinimg.com/236x/7d/66/6c/7d666cc9a54d44cd9e74371ee99bd703.jpg'
          }
          cargo="Garçom"
          local="Restaurante do Zé"
          tempoPostagem="8 min"
          dataInicio="30/06/2023"
          horario="18:00 - 22:00"
        />
      </View>
    </ScrollView>
  )
}
