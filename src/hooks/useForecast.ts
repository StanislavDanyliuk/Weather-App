import { useQuery } from '@tanstack/react-query'

import { weatherAPI } from '../api/weather'

import type { TCoordinates } from '../types/types'

export function useForecastQuery(coordinates: TCoordinates | null) {
  const { data, isLoading, refetch, isError, isFetching } = useQuery({
    queryKey: ['forecast', coordinates],
    queryFn: () => weatherAPI.getForecastWeather(coordinates!),
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
