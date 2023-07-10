import React from 'react'
import { Text, View, Image } from 'react-native'

export type UserProps = {
  id?: number
  name: string
  email: string
  picture: string
  available?: boolean
  bio?: string
}

type Props = {
  user: UserProps
}

export default function User({ user }: Props) {
  return (
    <View className="mt-12 w-full items-center">
      <Image
        className="h-44 w-44 rounded-full"
        source={{
          uri: user.picture,
        }}
        alt="image-user"
      />

      <Text className="font-inter mt-2 text-2xl text-gray-950">
        {user.name}
      </Text>

      <Text className="font-inter text-sm leading-6">{user.email}</Text>
    </View>
  )
}
