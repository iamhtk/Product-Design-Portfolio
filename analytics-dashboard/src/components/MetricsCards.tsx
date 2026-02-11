import { Circle } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  isLive?: boolean
  loading?: boolean
}

function MetricCard({ label, value, isLive, loading }: MetricCardProps) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-2">
        {isLive && <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white">
        {loading ? '...' : value}
      </div>
    </div>
  )
}

interface MetricsCardsProps {
  metrics: {
    liveVisitors: number
    uniqueVisitors: number
    totalPageviews: number
    bounceRate: string
    averageSession: string
  }
  loading?: boolean
}

export default function MetricsCards({ metrics, loading }: MetricsCardsProps) {
  const metricsList = [
    { label: 'Live Visitors', value: metrics.liveVisitors, isLive: true },
    { label: 'Unique Visitors', value: metrics.uniqueVisitors },
    { label: 'Total Pageviews', value: metrics.totalPageviews },
    { label: 'Bounce Rate', value: metrics.bounceRate },
    { label: 'Average Session', value: metrics.averageSession },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metricsList.map((metric) => (
        <MetricCard key={metric.label} {...metric} loading={loading} />
      ))}
    </div>
  )
}
