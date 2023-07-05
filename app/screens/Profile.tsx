import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Title from '../components/Title'

export default function Profile() {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView className="flex flex-1 bg-brown-400">
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom,
          paddingTop: top,
        }}
        className="flex min-h-screen flex-1 px-4"
      >
        {/* Header */}
        <View className="mb-8 flex flex-1 items-center px-4">
          <Title content="Perfil" className="text-gray-50" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
