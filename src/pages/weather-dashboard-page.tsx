import { RefreshCw } from 'lucide-react'

import { useForecastQuery } from '../hooks/useForecast'
import { useGeolocation } from '../hooks/useGeolocation'
import { useReverseGeocodeQuery } from '../hooks/useReverseGeocode'
import { useWeatherQuery } from '../hooks/useWeather'

import CurrentWeather from '../components/currentWeather'
import ErrorAlert from '../components/errorAlert'
import FavoriteCities from '../components/favoriteCities'
import HourlyTemperature from '../components/hourlyTemperature'
import { Button } from '../components/ui/button'
import WeatherDetails from '../components/weatherDetails'
import WeatherForecast from '../components/weatherForecast'
import WeatherSkeleton from '../components/weatherSkeleton'

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation()

  const {
    data: locationData,
    refetch: refetchLocation,
    isFetching: locationFetching,
  } = useReverseGeocodeQuery(coordinates)
  const {
    data: forecastData,
    refetch: refetchForecast,
    isError: forecastError,
    isLoading: forecastLoading,
    isFetching: forecastFetching,
  } = useForecastQuery(coordinates)
  const {
    data: weatherData,
    refetch: refetchWeather,
    isError: weatherError,
    isLoading: weatherLoading,
    isFetching: weatherFetching,
  } = useWeatherQuery(coordinates)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      refetchWeather()
      refetchLocation()
      refetchForecast()
    }
  }

  const locationName = locationData?.[0]

  if (locationLoading || forecastLoading || weatherLoading) {
    return <WeatherSkeleton />
  }
  if (locationError) {
    return (
      <ErrorAlert
        title="Location Error"
        description={locationError}
        onRetry={getLocation}
        btnTitle="Retry"
      />
    )
  }
  if (!coordinates) {
    return (
      <ErrorAlert
        title="Location Required"
        description="Please enable location services to see your local weather."
        onRetry={getLocation}
        btnTitle="Retry"
      />
    )
  }
  if (forecastError || weatherError) {
    return (
      <ErrorAlert
        title="Weather Data Error"
        description="Unable to fetch weather data. Please try again later."
        onRetry={handleRefresh}
        btnTitle="Retry"
      />
    )
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size={'icon'}
          disabled={locationFetching || forecastFetching || weatherFetching}
          onClick={handleRefresh}
        >
          <RefreshCw
            className={`h-4 w-4 ${locationFetching || forecastFetching || weatherFetching ? 'animate-spin' : ''}`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          {weatherData && locationName && (
            <CurrentWeather data={weatherData} locationName={locationName} />
          )}
          {forecastData && <HourlyTemperature data={forecastData} />}
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {weatherData && <WeatherDetails data={weatherData} />}
          {forecastData && <WeatherForecast data={forecastData} />}
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard
