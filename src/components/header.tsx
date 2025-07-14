import { useTheme } from '../context/theme-context'

import Logo from './logo'
import SearchBar from './searchBar'
import ThemeToggler from './themeToggler'

const Header = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b py-2 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo theme={theme} />
        <div className="flex gap-4">
          <SearchBar />
          <ThemeToggler
            theme={theme}
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
