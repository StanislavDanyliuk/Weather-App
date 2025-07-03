import { AlertTriangle, MapPin, RefreshCw, Terminal } from 'lucide-react'

import { useGeolocation } from '../hooks/useGeolocation'

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import WeatherSkeleton from '../components/weather-skeleton'

const WeatherDashboard = () => {
  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ['weather', 'current'],
  //   queryFn: () => weatherAPI.getCurrentWeather({ lat: 0, lon: 0 }),
  //   refetchOnWindowFocus: false,
  // })
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation()

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      // refetch()
    }
  }

  if (locationLoading) {
    return <WeatherSkeleton />
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location error</AlertTitle>
        <AlertDescription>{locationError}</AlertDescription>
        <Button
          onClick={getLocation}
          variant={'outline'}
          size={'icon'}
          className="w-fit p-2"
        >
          <MapPin className="mr-2 h-2 w-4" />
          Enable Location
        </Button>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/* <div>Favorite Cities/</div> */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size={'icon'}
          disabled={locationLoading}
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      {/* <div>Current and Hourly weather/</div> */}
    </div>
  )
}

export default WeatherDashboard
