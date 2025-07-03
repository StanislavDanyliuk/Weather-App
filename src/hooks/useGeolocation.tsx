import { useEffect, useState } from 'react'

import type { TCoordinates } from '../types/types'

type TLocationData = {
  coordinates: TCoordinates | null
  error: string | null
  isLoading: boolean
}

export const useGeolocation = () => {
  const [locationData, setLocationData] = useState<TLocationData>({
    coordinates: null,
    error: null,
    isLoading: false,
  })

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }))

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        isLoading: false,
        error: 'Geolocation is not supported by this browser.',
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocationData({
          isLoading: false,
          coordinates: { lat: latitude, lon: longitude },
          error: null,
        })
      },
      (error) => {
        setLocationData({
          isLoading: false,
          coordinates: null,
          error: error.message,
        })
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    )
  }

  useEffect(() => {
    getLocation()
  }, [])

  return { ...locationData, getLocation }
}
