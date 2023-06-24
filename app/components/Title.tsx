import { Text, TextProps } from 'react-native'

interface TitleProps extends TextProps {
  content: string
}

export function Title({ content, ...rest }: TitleProps) {
  return (
    <Text {...rest} className="font-inter text-3xl leading-tight text-gray-950">
      {content}
    </Text>
  )
}
