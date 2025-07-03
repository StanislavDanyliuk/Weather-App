import { Link } from 'react-router-dom'

type LogoProps = {
  theme: string
}

const Logo: React.FC<LogoProps> = ({ theme }) => {
  return (
    <Link to={'/'}>
      <img
        src={theme === 'dark' ? '/logo.png' : '/logo2.png'}
        alt="Logo"
        className="h-14"
      />
    </Link>
  )
}
export default Logo
