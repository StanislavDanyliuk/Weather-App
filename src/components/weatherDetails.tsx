import { format, formatDate } from 'date-fns'
import { Compass, Gauge, type LucideIcon, Sunrise, Sunset } from 'lucide-react'

import type { TWeatherData } from '../types/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type WeatherDetailsProps = { data: TWeatherData }
type TWeatherDetails = {
  title: string
  value: string
  icon: LucideIcon
  color: string
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data

  const formatTime = (timestamp: number): string => {
    return format(new Date(timestamp * 1000), 'HH:MM')
  }

  const getWindDirection = (degree: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
    return directions[index]
  }

  const details: TWeatherDetails[] = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => {
            return (
              <div
                key={detail.title}
                className="flex items-center gap-3 rounded-lg border p-4"
              >
                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                <div>
                  <p className="text-sm leading-none font-medium">
                    {detail.title}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {detail.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
export default WeatherDetails
