import { format } from 'date-fns'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { TForecastData } from '../types/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type HourlyTemperatureProps = { data: TForecastData }

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), 'HH:MM'),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }))

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today`s Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <LineChart data={chartData}>
              <XAxis
                dataKey={'time'}
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background rounded-lg border p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-[0.7rem] uppercase">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°C
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-[0.7rem] uppercase">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type={'monotone'}
                dataKey={'temp'}
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type={'monotone'}
                dataKey={'feels_like'}
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray={'5 5'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
export default HourlyTemperature
