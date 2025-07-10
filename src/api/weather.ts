import type {
  TCoordinates,
  TForecastData,
  TGeocodingData,
  TWeatherData,
} from '../types/types'
import { API_CONFIG } from './config'

class WeatherAPI {
  private createUrl(
    endpoint: string,
    params: Record<string, string | number>
  ): string {
    const searchParams = new URLSearchParams({
      appid: import.meta.env.VITE_API_KEY,
      ...params,
    })
    return `${endpoint}?${searchParams.toString()}`
  }

  private fetchData<T>() {
    return async (url: string): Promise<T> => {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
      return response.json()
    }
  }

  async getCurrentWeather({ lat, lon }: TCoordinates): Promise<TWeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    })
    return this.fetchData<TWeatherData>()(url)
  }

  async getForecastWeather({ lat, lon }: TCoordinates): Promise<TForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.DEFAULT_PARAMS.units,
    })
    return this.fetchData<TForecastData>()(url)
  }

  async reverseGeocode({ lat, lon }: TCoordinates): Promise<TGeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    })
    return this.fetchData<TGeocodingData[]>()(url)
  }
  async searchLocations(query: string): Promise<TGeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: 5,
    })
    return this.fetchData<TGeocodingData[]>()(url)
  }
}

export const weatherAPI = new WeatherAPI()
