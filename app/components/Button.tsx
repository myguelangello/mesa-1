import { ComponentProps } from 'react'
import Icon from '@expo/vector-icons/FontAwesome5'
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  icon?: ComponentProps<typeof Icon>['name']
}

export function Button({ title, icon, ...rest }: ButtonProps) {
  function handleSignUpWithGoogle() {
    console.log('handleSignUpWithGoogle')
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mb-2 mt-4 w-80 flex-row items-center justify-center rounded-full bg-[#DB4437] p-4"
      onPress={handleSignUpWithGoogle}
      {...rest} // spread operator para pegar todas as propriedades do TouchableOpacityProps
    >
      <Icon name={icon} size={24} color="#f8f8f8" />

      <Text className="ml-4 font-inter text-lg text-gray-50">{title}</Text>
    </TouchableOpacity>
  )
}
