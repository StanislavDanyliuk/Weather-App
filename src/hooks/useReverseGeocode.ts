import { useQuery } from '@tanstack/react-query'

import { weatherAPI } from '../api/weather'

import type { TCoordinates } from '../types/types'

export function useReverseGeocodeQuery(coordinates: TCoordinates | null) {
  const { data, isLoading, refetch, isError, isFetching } = useQuery({
    queryKey: ['reverseGeocode', coordinates],
    queryFn: () => weatherAPI.reverseGeocode(coordinates!),
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
