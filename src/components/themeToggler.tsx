import { Moon, Sun } from 'lucide-react'

type ThemeTogglerProps = {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ theme, setTheme }) => {
  return (
    <div
      className={`flex cursor-pointer items-center transition-transform duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="h-10 w-10 rotate-0 text-yellow-500 transition-all" />
      ) : (
        <Moon className="h-10 w-10 rotate-0 text-blue-500 transition-all" />
      )}
    </div>
  )
}

export default ThemeToggler
