import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // Import the relativeTime plugin
import updateLocale from 'dayjs/plugin/updateLocale' // Import the updateLocale plugin

import 'dayjs/locale/pt-br' // Import the locale specific to Brazil

dayjs.extend(updateLocale) // Extend dayjs with the updateLocale plugin
dayjs.extend(relativeTime) // Extend dayjs with the relativeTime plugin

dayjs.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'alguns segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: '1 dia',
    dd: '%d dias',
    M: '1 mês',
    MM: '%d meses',
    y: '1 ano',
    yy: '%d anos',
  },
})

export const convertDate = (date: string, format: string): string => {
  return dayjs(date).locale('pt-br').format(format)
}

export const convertPostedAgo = (created_at: string): string => {
  const currentTime = dayjs().locale('pt-br')
  const postedTime = dayjs(created_at).locale('pt-br')

  const timeAgo = postedTime.from(currentTime)

  return timeAgo
}
