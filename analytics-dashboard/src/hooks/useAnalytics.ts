import { useState, useEffect } from 'react'
import { 
  getKeyMetrics, 
  getTimeSeriesData, 
  getTrafficSources, 
  getTopPages,
  getLiveVisitors 
} from '../services/analytics'
import { subDays, format } from 'date-fns'

interface UseAnalyticsOptions {
  days?: number
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const { days = 30 } = options
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const endDate = format(new Date(), 'yyyy-MM-dd')
  const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd')

  const [metrics, setMetrics] = useState({
    uniqueVisitors: 0,
    totalPageviews: 0,
    bounceRate: '0%',
    averageSession: '0s',
    sessions: 0,
    liveVisitors: 0,
  })

  const [chartData, setChartData] = useState<Array<{
    date: string
    visitors: number
    pageviews: number
  }>>([])

  const [sources, setSources] = useState<Array<{
    name: string
    count: number
  }>>([])

  const [pages, setPages] = useState<Array<{
    name: string
    count: number
  }>>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const [metricsData, chartDataResult, sourcesData, pagesData, liveData] = await Promise.all([
          getKeyMetrics(startDate, endDate),
          getTimeSeriesData(startDate, endDate),
          getTrafficSources(startDate, endDate),
          getTopPages(startDate, endDate),
          getLiveVisitors(),
        ])

        setMetrics({
          ...metricsData,
          liveVisitors: liveData,
        })
        setChartData(chartDataResult)
        setSources(sourcesData)
        setPages(pagesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
        console.error('Analytics error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Refresh live visitors every 30 seconds
    const liveInterval = setInterval(async () => {
      try {
        const liveData = await getLiveVisitors()
        setMetrics((prev) => ({ ...prev, liveVisitors: liveData }))
      } catch (err) {
        console.error('Failed to fetch live visitors:', err)
      }
    }, 30000)

    return () => clearInterval(liveInterval)
  }, [startDate, endDate])

  return {
    loading,
    error,
    metrics,
    chartData,
    sources,
    pages,
    dateRange: { startDate, endDate },
  }
}
