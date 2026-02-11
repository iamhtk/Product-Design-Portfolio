/**
 * Google Analytics 4 (GA4) Data API Integration
 * 
 * Setup Instructions:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable "Google Analytics Data API"
 * 4. Create a Service Account:
 *    - Go to IAM & Admin > Service Accounts
 *    - Create new service account
 *    - Grant "Viewer" role for Analytics
 *    - Create JSON key and download
 * 5. In Google Analytics:
 *    - Admin > Property > Property Access Management
 *    - Add service account email with "Viewer" role
 * 6. Get your Property ID from Admin > Property Settings
 * 7. Add credentials to .env file:
 *    VITE_GA4_PROPERTY_ID=your-property-id
 *    VITE_GA4_SERVICE_ACCOUNT_KEY=base64-encoded-json-key
 */

interface GA4Metrics {
  activeUsers?: number
  screenPageViews?: number
  bounceRate?: number
  averageSessionDuration?: number
  sessions?: number
}

interface GA4Dimensions {
  date?: string
  pagePath?: string
  pageTitle?: string
  source?: string
  medium?: string
  sessionSource?: string
}

interface GA4Response {
  rows: Array<{
    dimensionValues: Array<{ value: string }>
    metricValues: Array<{ value: string }>
  }>
}

// For development: Use mock data if API credentials aren't set
const USE_MOCK_DATA = !import.meta.env.VITE_GA4_PROPERTY_ID

/**
 * Fetch analytics data from GA4 API
 * Note: This requires a backend proxy to securely handle credentials
 * For production, create an API endpoint that handles authentication
 */
export async function fetchGA4Data(
  startDate: string,
  endDate: string,
  dimensions: string[],
  metrics: string[]
): Promise<GA4Response> {
  if (USE_MOCK_DATA) {
    console.warn('Using mock data - set VITE_GA4_PROPERTY_ID to connect to real GA4')
    return getMockGA4Data(startDate, endDate, dimensions, metrics)
  }

  // In production, call your backend API endpoint
  // Backend should handle GA4 authentication securely
  const response = await fetch('/api/analytics/ga4', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      metrics,
    }),
  })

  if (!response.ok) {
    throw new Error(`GA4 API error: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get key metrics (visitors, pageviews, bounce rate, etc.)
 */
export async function getKeyMetrics(startDate: string, endDate: string) {
  const data = await fetchGA4Data(
    startDate,
    endDate,
    [],
    ['activeUsers', 'screenPageViews', 'bounceRate', 'averageSessionDuration', 'sessions']
  )

  if (!data.rows || data.rows.length === 0) {
    return {
      uniqueVisitors: 0,
      totalPageviews: 0,
      bounceRate: '0%',
      averageSession: '0s',
      sessions: 0,
    }
  }

  const row = data.rows[0]
  const metrics = row.metricValues

  return {
    uniqueVisitors: parseInt(metrics[0]?.value || '0'),
    totalPageviews: parseInt(metrics[1]?.value || '0'),
    bounceRate: `${parseFloat(metrics[2]?.value || '0') * 100}`.substring(0, 4) + '%',
    averageSession: formatDuration(parseFloat(metrics[3]?.value || '0')),
    sessions: parseInt(metrics[4]?.value || '0'),
  }
}

/**
 * Get time series data for chart
 */
export async function getTimeSeriesData(startDate: string, endDate: string) {
  const data = await fetchGA4Data(
    startDate,
    endDate,
    ['date'],
    ['activeUsers', 'screenPageViews']
  )

  if (!data.rows) {
    return []
  }

  return data.rows.map((row) => ({
    date: formatDate(row.dimensionValues[0]?.value || ''),
    visitors: parseInt(row.metricValues[0]?.value || '0'),
    pageviews: parseInt(row.metricValues[1]?.value || '0'),
  }))
}

/**
 * Get traffic sources
 */
export async function getTrafficSources(startDate: string, endDate: string) {
  const data = await fetchGA4Data(
    startDate,
    endDate,
    ['sessionSource'],
    ['sessions']
  )

  if (!data.rows) {
    return []
  }

  return data.rows
    .map((row) => ({
      name: row.dimensionValues[0]?.value || 'direct',
      count: parseInt(row.metricValues[0]?.value || '0'),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 sources
}

/**
 * Get top pages
 */
export async function getTopPages(startDate: string, endDate: string) {
  const data = await fetchGA4Data(
    startDate,
    endDate,
    ['pagePath', 'pageTitle'],
    ['screenPageViews']
  )

  if (!data.rows) {
    return []
  }

  return data.rows
    .map((row) => {
      const path = row.dimensionValues[0]?.value || '/'
      const title = row.dimensionValues[1]?.value || path
      return {
        name: title === path ? (path === '/' ? 'Home' : path) : title,
        count: parseInt(row.metricValues[0]?.value || '0'),
      }
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 pages
}

/**
 * Get live active users (real-time)
 */
export async function getLiveVisitors(): Promise<number> {
  // Real-time API requires different endpoint
  // For now, return mock or cached value
  if (USE_MOCK_DATA) {
    return Math.floor(Math.random() * 5) // Mock: 0-4 live visitors
  }

  try {
    const response = await fetch('/api/analytics/ga4/realtime', {
      method: 'GET',
    })
    const data = await response.json()
    return data.activeUsers || 0
  } catch {
    return 0
  }
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m${secs.toString().padStart(2, '0')}s`
}

// Mock data for development
function getMockGA4Data(
  startDate: string,
  endDate: string,
  dimensions: string[],
  metrics: string[]
): GA4Response {
  // Generate mock data based on dimensions requested
  if (dimensions.includes('date')) {
    // Time series data
    const dates = generateDateRange(startDate, endDate)
    return {
      rows: dates.map((date) => ({
        dimensionValues: [{ value: date }],
        metricValues: [
          { value: String(Math.floor(Math.random() * 30) + 5) },
          { value: String(Math.floor(Math.random() * 50) + 10) },
        ],
      })),
    }
  }

  if (dimensions.includes('sessionSource')) {
    // Sources data
    return {
      rows: [
        { dimensionValues: [{ value: 'linkedin.com' }], metricValues: [{ value: '8' }] },
        { dimensionValues: [{ value: 'google.com' }], metricValues: [{ value: '2' }] },
        { dimensionValues: [{ value: 'direct' }], metricValues: [{ value: '1' }] },
      ],
    }
  }

  if (dimensions.includes('pagePath')) {
    // Pages data
    return {
      rows: [
        { dimensionValues: [{ value: '/' }, { value: 'Home' }], metricValues: [{ value: '47' }] },
        { dimensionValues: [{ value: '/contact' }, { value: 'Contact' }], metricValues: [{ value: '8' }] },
        { dimensionValues: [{ value: '/resume' }, { value: 'Resume' }], metricValues: [{ value: '8' }] },
      ],
    }
  }

  // Default: aggregate metrics
  return {
    rows: [
      {
        dimensionValues: [],
        metricValues: [
          { value: '52' }, // activeUsers
          { value: '113' }, // screenPageViews
          { value: '0.649' }, // bounceRate
          { value: '146' }, // averageSessionDuration (seconds)
          { value: '45' }, // sessions
        ],
      },
    ],
  }
}

function generateDateRange(start: string, end: string): string[] {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const dates: string[] = []

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    dates.push(`${year}${month}${day}`)
  }

  return dates
}
