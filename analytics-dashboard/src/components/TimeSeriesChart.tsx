import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface TimeSeriesChartProps {
  data: Array<{
    date: string
    visitors: number
    pageviews: number
  }>
  loading?: boolean
}

export default function TimeSeriesChart({ data, loading }: TimeSeriesChartProps) {
  if (loading && data.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-white mb-6">Traffic Overview</h3>
        <div className="h-[400px] flex items-center justify-center text-gray-400">
          Loading chart data...
        </div>
      </div>
    )
  }
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-6">Traffic Overview</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
          <XAxis 
            dataKey="date" 
            stroke="#666666"
            tick={{ fill: '#999999', fontSize: 12 }}
          />
          <YAxis 
            stroke="#666666"
            tick={{ fill: '#999999', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#151515', 
              border: '1px solid #222222',
              borderRadius: '8px',
              color: '#ffffff'
            }}
            labelStyle={{ color: '#999999' }}
          />
          <Legend 
            wrapperStyle={{ color: '#999999', fontSize: '12px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            stroke="#a855f7" 
            strokeWidth={2}
            dot={false}
            name="Visitors"
          />
          <Line 
            type="monotone" 
            dataKey="pageviews" 
            stroke="#60a5fa" 
            strokeWidth={2}
            dot={false}
            name="Pageviews"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
