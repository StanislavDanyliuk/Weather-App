import { useQuery } from '@tanstack/react-query'

import { weatherAPI } from '../api/weather'

export const useSearchLocations = (query: string) => {
  const { data, isLoading, refetch, isError, isFetching } = useQuery({
    queryKey: ['location-search', query],
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  })
  return {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  }
}
