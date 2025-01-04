'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const yearlyData = [
  { year: '2020', events: 24, revenue: 120000, attendees: 4800 },
  { year: '2021', events: 18, revenue: 90000, attendees: 3600 },
  { year: '2022', events: 36, revenue: 180000, attendees: 7200 },
  { year: '2023', events: 48, revenue: 240000, attendees: 9600 },
]

const monthlyData = [
  { month: 'Jan', events: 4, revenue: 20000, attendees: 800 },
  { month: 'Feb', events: 3, revenue: 15000, attendees: 600 },
  { month: 'Mar', events: 5, revenue: 25000, attendees: 1000 },
  { month: 'Apr', events: 4, revenue: 20000, attendees: 800 },
  { month: 'May', events: 6, revenue: 30000, attendees: 1200 },
  { month: 'Jun', events: 5, revenue: 25000, attendees: 1000 },
  { month: 'Jul', events: 7, revenue: 35000, attendees: 1400 },
  { month: 'Aug', events: 6, revenue: 30000, attendees: 1200 },
  { month: 'Sep', events: 4, revenue: 20000, attendees: 800 },
  { month: 'Oct', events: 5, revenue: 25000, attendees: 1000 },
  { month: 'Nov', events: 3, revenue: 15000, attendees: 600 },
  { month: 'Dec', events: 4, revenue: 20000, attendees: 800 },
]

const dailyData = [
  { day: '1', events: 2, revenue: 10000, attendees: 400 },
  { day: '2', events: 1, revenue: 5000, attendees: 200 },
  { day: '3', events: 3, revenue: 15000, attendees: 600 },
  { day: '4', events: 2, revenue: 10000, attendees: 400 },
  { day: '5', events: 4, revenue: 20000, attendees: 800 },
  { day: '6', events: 3, revenue: 15000, attendees: 600 },
  { day: '7', events: 2, revenue: 10000, attendees: 400 },
]

export default function OverviewPage() {
  const [timeFrame, setTimeFrame] = useState('yearly')

  const data = {
    yearly: yearlyData,
    monthly: monthlyData,
    daily: dailyData,
  }[timeFrame]

  const xAxisKey = {
    yearly: 'year',
    monthly: 'month',
    daily: 'day',
  }[timeFrame]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearlyData[yearlyData.length - 1].events}</div>
            <p className="text-xs text-muted-foreground">+20% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${yearlyData[yearlyData.length - 1].revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearlyData[yearlyData.length - 1].attendees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Statistics Over Time</CardTitle>
          <CardDescription>View event data by year, month, or day</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={timeFrame} onValueChange={setTimeFrame} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
            <TabsContent value={timeFrame} className="space-y-4">
              <ChartContainer
                config={{
                  events: {
                    label: "Events",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-2))",
                  },
                  attendees: {
                    label: "Attendees",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px] sm:h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey={xAxisKey}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => value.toString().slice(0, 3)}
                    />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="events" stroke="var(--color-events)" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
                    <Line yAxisId="left" type="monotone" dataKey="attendees" stroke="var(--color-attendees)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Events by Time Period</CardTitle>
            <CardDescription>Number of events held in each time period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                events: {
                  label: "Events",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={xAxisKey}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toString().slice(0, 3)}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="events" fill="var(--color-events)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Time Period</CardTitle>
            <CardDescription>Revenue generated in each time period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={xAxisKey}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.toString().slice(0, 3)}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

