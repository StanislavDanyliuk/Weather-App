import { useNavigate } from 'react-router-dom'

import { Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

import useFavorite from '../hooks/useFavorite'
import { useWeatherQuery } from '../hooks/useWeather'

import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

type FavoriteCityTabletProps = {
  id: string
  name: string
  lat: number
  lon: number
  onRemove: (id: string | number) => void
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorite()

  if (!favorites.length) {
    return null
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4" />

      <div className="flex gap-4">
        {favorites.map((city) => (
          <FavoriteCityTablet
            key={city.id}
            {...city}
            onRemove={() => removeFavorite.mutate(city.id)}
          />
        ))}
      </div>
    </>
  )
}

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate()
  const { data: weatherData, isLoading: weatherLoading } = useWeatherQuery({
    lat,
    lon,
  })

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="bg-card relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        variant={'ghost'}
        size={'icon'}
        className="hover:text-destructive-foreground absolute top-1 right-1 h-6 w-6 rounded-full p-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id)
          toast.error(`Removed ${name} from Favorites`)
        }}
      >
        <X className="h-4 w-4" />
      </Button>
      {weatherLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weatherData ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-muted-foreground text-xs">
                {weatherData.sys.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="text-muted-foreground text-xs capitalize">
              {weatherData.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  )
}
export default FavoriteCities
