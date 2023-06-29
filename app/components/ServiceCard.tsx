import { View, Image, Text, TouchableOpacity } from 'react-native'

export interface ServiceProps {
  serviceImage: string
  role: string
  address: string
  postedAgo: string
  startDate: string
  startTime: string
}

export default function ServiceCard({
  serviceImage,
  role,
  address,
  postedAgo,
  startDate,
  startTime,
}: ServiceProps) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        className="mb-4 h-20 flex-row space-x-2"
      >
        {/* Create image of service */}
        <Image
          source={{ uri: serviceImage }}
          className="h-20 w-20 rounded-lg"
          alt={address}
        />

        <View className="h-full flex-1">
          {/* Row 1 => Role - Poosted Ago */}
          <View className="flex-row items-start justify-between space-x-2">
            <Text className="font-interSemiBold text-lg leading-tight text-gray-900">
              {role}
            </Text>

            <Text className="mt-2 font-interRegular text-xs leading-relaxed text-gray-200">
              {postedAgo}
            </Text>
          </View>

          {/* Row 2 => Description - Date */}
          <View className="mt-1 flex items-start">
            <Text className="mb-2 font-interRegular text-sm leading-relaxed text-gray-700">
              {address}
            </Text>
            <Text className="font-interRegular text-xs text-gray-300">
              Data: {startDate} | Horário de Início: {startTime}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
