import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className='bg-zinc-900 flex-1 items-center justify-center'>
      <Text className='text-zinc-100'>Hello World, I'm Mesa 1</Text>
      <StatusBar style="light" translucent />
    </View>
  );
}
