import { useParams, useSearchParams } from 'react-router-dom'

import { useForecastQuery } from '../hooks/useForecast'
import { useWeatherQuery } from '../hooks/useWeather'

import CurrentWeather from '../components/currentWeather'
import ErrorAlert from '../components/errorAlert'
import FavoriteButton from '../components/favoriteButton'
import HourlyTemperature from '../components/hourlyTemperature'
import WeatherDetails from '../components/weatherDetails'
import WeatherForecast from '../components/weatherForecast'
import WeatherSkeleton from '../components/weatherSkeleton'

const CityPage = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')

  const coordinates = { lat, lon }
  const {
    data: forecastData,
    isError: forecastError,
    isLoading: forecastLoading,
  } = useForecastQuery(coordinates)
  const {
    data: weatherData,
    isError: weatherError,
    isLoading: weatherLoading,
  } = useWeatherQuery(coordinates)

  if (forecastError || weatherError) {
    return (
      <ErrorAlert
        title="Weather Data Error"
        description="Unable to fetch weather data. Please try again later."
      />
    )
  }

  if (forecastLoading || weatherLoading || !params.cityName) {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-4">
      {/* <div>Favorite Cities/</div> */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherData?.sys.country}
        </h1>
        {weatherData && (
          <FavoriteButton data={{ ...weatherData, name: params.cityName }} />
        )}
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          {weatherData && <CurrentWeather data={weatherData} />}
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

export default CityPage
