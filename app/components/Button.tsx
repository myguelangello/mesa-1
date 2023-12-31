import { ComponentProps } from 'react'
import Icon from '@expo/vector-icons/FontAwesome5'
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title?: string
  icon?: ComponentProps<typeof Icon>['name']
  iconSize?: number
  iconColor?: string
}

export default function Button({
  title,
  icon,
  iconSize,
  iconColor,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-80 flex-row items-center justify-center space-x-3 rounded-full bg-brown-500 p-4"
      {...rest} // spread operator para pegar todas as propriedades do TouchableOpacityProps
    >
      <Icon name={icon} size={iconSize} color={iconColor} />

      <Text className="font-interSemiBold text-lg text-white">{title}</Text>
    </TouchableOpacity>
  )
}
