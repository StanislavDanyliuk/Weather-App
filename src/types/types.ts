export type TCoordinates = {
  lat: number
  lon: number
}

export type TWeatherCondition = {
  id: number
  main: string
  description: string
  icon: string
}

export type TWeatherData = {
  coord: TCoordinates
  weather: TWeatherCondition[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  wind: {
    speed: number
    deg: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type TForecastData = {
  list: Array<{
    dt: number
    main: TWeatherData['main']
    weather: TWeatherData['weather']
    wind: TWeatherData['wind']
    dt_txt: string
  }>
  city: {
    id: number
    name: string
    country: string
    sunrise: number
    sunset: number
  }
}

export type TGeocodingData = {
  lat: number
  lon: number
  name: string
  country: string
  state?: string
  local_names?: Record<string, string>
}
