import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'

// eslint-disable-next-line no-unused-vars
import { FetchedServiceProps } from './Services'
import { api } from '../../src/lib/api'

import Title from '../components/Title'

import Icon from '@expo/vector-icons/FontAwesome5'
import Button from '../components/Button'

import * as ImagePicker from 'expo-image-picker'

export default function CreateService({ route, navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [hours, setHours] = useState('')
  const [hours_value, setHoursValue] = useState('')
  const [service_date, setServiceDate] = useState('')
  const [start_time, setStartTime] = useState('')
  const [contractor] = useState(1)
  const [preview, setPreview] = useState('')

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      // Se o usuário selecionou uma imagem
      if (result.assets[0]) {
        setPreview(result.assets[0].uri) // Salva a URI da imagem selecionada
      }
    } catch (error) {
      // TODO: Tratar erro, se o suário não selecionou uma imagem não é um erro
      console.error(error)
    }
  }

  async function handleCreateService() {
    await api
      .post('/api/services/', {
        title,
        description,
        hours,
        hours_value,
        address,
        service_date,
        start_time,
        contractor,
      })
      .then(() => {
        clear()
        Alert.alert('Serviço cadastrado com sucesso!')
      })
      .catch((error) => {
        Alert.alert('Erro ao cadastrar serviço, tente novamente.')
        /* console.info(data) */
        console.error(error)
      })
  }

  function clear() {
    setTitle('')
    setDescription('')
    setAddress('')
    setHours('')
    setHoursValue('')
    setServiceDate('')
    setStartTime('')
    setPreview('')
  }

  return (
    <ScrollView
      className="flex-1 bg-brown-400"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      contentInset={{ bottom, top }}
    >
      {/* Header */}
      <View className="mb-8 px-4">
        {/* Header */}
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.8}
            className="h-10 w-10 items-center justify-center  rounded-full bg-transparent"
            onPress={() => navigation.navigate('services')}
          >
            <Icon name="chevron-left" size={24} color="#eaeaea" />
          </TouchableOpacity>

          <Title content="Cadastrar" className="text-gray-50" />

          <TouchableOpacity
            activeOpacity={0.8}
            className="h-10 w-10 items-center justify-center  rounded-full bg-transparent "
          >
            <Icon name="heart" size={24} color="#875a33" />
          </TouchableOpacity>
        </View>

        {/* Image picker */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="mt-4 h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#fff" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View className="h-full bg-white px-4">
        {/* Cargo */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-xl text-gray-700">
            Título
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        {/* Descrição */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-xl text-gray-700">
            Descrição
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        {/* Local */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Endereço
          </Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        {/* Data */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Data prevista
          </Text>
          <TextInput
            value={service_date}
            onChangeText={setServiceDate}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        {/* Horário */}
        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Horário previsto (carga horária)
          </Text>
          <TextInput
            value={start_time}
            onChangeText={setStartTime}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Quantidade de horas
          </Text>
          <TextInput
            value={hours}
            onChangeText={setHours}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        <View className="mt-4">
          <Text className="font-interSemiBold text-lg text-gray-700">
            Valor por hora
          </Text>
          <TextInput
            value={hours_value}
            onChangeText={setHoursValue}
            className="mt-1 w-full rounded-lg border-2 border-gray-200 px-4 py-3 font-interRegular text-base text-gray-400"
          />
        </View>

        {/* Botão */}
        <Button
          title="Publicar vaga"
          className="mt-8 w-full self-center"
          onPress={handleCreateService}
        />
      </View>

      <StatusBar style="light" translucent />
    </ScrollView>
  )
}
