import React from 'react'
import { Text, View, Image } from 'react-native'

export function User() {
  return (
    <View className="mt-12 w-full items-center">
      <Image
        className="h-44 w-44 rounded-full"
        source={{ uri: 'https://github.com/myguelangello.png' }}
        alt="image-user"
      />

      <Text className="mt-2 font-inter text-2xl text-gray-950">Myguel</Text>

      <Text className="font-inter text-sm leading-6">myguel@mail.com</Text>
    </View>
  )
}
