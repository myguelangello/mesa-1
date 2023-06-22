import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      <Text className="text-5xl font-bold text-zinc-100">
        Hello World, I am Mesa 1
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
