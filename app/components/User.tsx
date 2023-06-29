import React from 'react'
import { Text, View, Image } from 'react-native'

export interface UserProps {
  name: string
  email: string
  avatar: string
}

export default function User({ name, email, avatar }: UserProps) {
  return (
    <View className="mt-12 w-full items-center">
      <Image
        className="h-44 w-44 rounded-full"
        source={{ uri: 'https://github.com/myguelangello.png' }}
        alt="image-user"
      />

      <Text className="font-inter mt-2 text-2xl text-gray-950">{name}</Text>

      <Text className="font-inter text-sm leading-6">{email}</Text>
    </View>
  )
}
