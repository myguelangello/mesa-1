import { Text, TextProps } from 'react-native'

interface TitleProps extends TextProps {
  content: string
}

export default function Title({ content, ...rest }: TitleProps) {
  return (
    <Text {...rest} className="font-interSemiBold text-3xl text-gray-950">
      {content}
    </Text>
  )
}
