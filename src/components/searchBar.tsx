import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { format } from 'date-fns'
import { Clock, Loader2, Search, XCircle } from 'lucide-react'

import useSearchHistory from '../hooks/useSearchHistory'
import { useSearchLocations } from '../hooks/useSearchLocations'

import { Button } from './ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'

const SearchBar = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const { data, isLoading } = useSearchLocations(query)
  const { addToHistory, clearHistory, history } = useSearchHistory()

  const handleSelectLocation = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split('|')
    setOpen(false)
    navigate(`city/${name}?lat=${lat}&lon=${lon}`)

    //   Add to history
    addToHistory.mutate({
      query,
      name,
      country,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    })
  }
  return (
    <>
      <Button
        variant={'outline'}
        className="text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          {/* <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup> */}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="my-2 flex items-center justify-between px-2">
                  <p className="text-muted-foreground text-xs">
                    Recent Searches
                  </p>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    onClick={() => {
                      clearHistory.mutate()
                    }}
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>

                {history.map(
                  ({ lat, lon, name, country, state, searchedAt }) => (
                    <CommandItem
                      key={`${lat}-${lon}`}
                      value={`${lat}|${lon}|${name}|${country}`}
                      onSelect={handleSelectLocation}
                    >
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>{name}</span>
                      {state && (
                        <span className="text-muted-foreground text-sm">
                          | {state},
                        </span>
                      )}
                      <span className="text-muted-foreground text-sm">
                        {country}
                      </span>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {format(searchedAt, 'MMM d, HH:mm')}
                      </span>
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          {data && data.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {data.map(({ lat, lon, name, country, state }) => (
                <CommandItem
                  key={`${lat}-${lon}`}
                  value={`${lat}|${lon}|${name}|${country}`}
                  onSelect={handleSelectLocation}
                >
                  <Search className="h-4 w-4" />
                  <span>{name}</span>
                  {state && (
                    <span className="text-muted-foreground text-sm">
                      | {state},
                    </span>
                  )}
                  <span className="text-muted-foreground text-sm">
                    {country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default SearchBar
