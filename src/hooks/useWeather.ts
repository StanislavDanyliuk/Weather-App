import { useQuery } from '@tanstack/react-query'

import { weatherAPI } from '../api/weather'

import type { TCoordinates } from '../types/types'

export function useWeatherQuery(coordinates: TCoordinates | null) {
  const { data, isLoading, refetch, isError, isFetching } = useQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => weatherAPI.getCurrentWeather(coordinates!),
    enabled: !!coordinates,
  })
  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
