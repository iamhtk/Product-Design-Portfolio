import { useState } from 'react'
import { ChevronDown, Calendar } from 'lucide-react'
import MetricsCards from './MetricsCards'
import TimeSeriesChart from './TimeSeriesChart'
import SourcesTable from './SourcesTable'
import PagesTable from './PagesTable'
import { useAnalytics } from '../hooks/useAnalytics'

interface DashboardProps {
  activeSection: 'overview' | 'funnels' | 'ab-tests'
}

export default function Dashboard({ activeSection }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('Last 30 days')
  const [dateRange, setDateRange] = useState('Jan 12 — Feb 11')
  
  const { loading, error, metrics, chartData, sources, pages } = useAnalytics({ days: 30 })

  if (activeSection !== 'overview') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-2">{activeSection === 'funnels' ? 'Funnels' : 'A/B Tests'}</h2>
          <p className="text-gray-400">Coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <div className="flex items-center gap-4">
            {/* Time Range Dropdown */}
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white hover:bg-dark-hover transition-colors">
              <span className="text-sm">{timeRange}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Date Range Picker */}
            <button className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white hover:bg-dark-hover transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{dateRange}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300">
            <p className="font-semibold">Error loading analytics</p>
            <p className="text-sm mt-1">{error}</p>
            <p className="text-xs mt-2 text-red-400">
              Make sure your GA4 API is configured. Check the README for setup instructions.
            </p>
          </div>
        )}

        {/* Key Metrics */}
        <MetricsCards metrics={metrics} loading={loading} />

        {/* Time Series Chart */}
        <div className="mt-8 bg-dark-card border border-dark-border rounded-lg p-6">
          <TimeSeriesChart data={chartData} loading={loading} />
        </div>

        {/* Sources and Pages Tables */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SourcesTable sources={sources} loading={loading} />
          <PagesTable pages={pages} loading={loading} />
        </div>
      </div>
    </div>
  )
}
