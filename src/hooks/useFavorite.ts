import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useLocalStorage } from './useLocalStorage'

type FavoriteCity = {
  id: string
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  added: number
}

export default function useFavorite() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    'favorites',
    []
  )

  const queryClient = useQueryClient()

  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  })

  const addFavorite = useMutation({
    mutationKey: [''],
    mutationFn: async (city: Omit<FavoriteCity, 'id' | 'added'>) => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        added: Date.now(),
      }
      const exists = favorites.some((city) => city.id === newFavorite.id)
      if (exists) return favorites

      const newFavorites = [...favorites, newFavorite].slice(0, 10)

      setFavorites(newFavorites)
      return newFavorite
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })
    },
  })

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => cityId !== city.id)
      setFavorites(newFavorites)
      return newFavorites
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })
    },
  })
  return {
    favorites: favoritesQuery.data,
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      favorites.some((city) => city.lat === lat && city.lon === lon),
  }
}
