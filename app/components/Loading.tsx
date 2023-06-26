import { ActivityIndicator, View } from 'react-native'

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <ActivityIndicator color="#401e00" />
    </View>
  )
}
