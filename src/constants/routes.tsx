import CityPage from '../pages/city-page'
import WeatherDashboard from '../pages/weather-dashboard-page'

export const routes = [
  {
    path: '/',
    element: <WeatherDashboard />,
  },
  {
    path: '/city/:cityName',
    element: <CityPage />,
  },
  {
    path: '*',
    element: <div>404 - Not Found</div>,
  },
]
