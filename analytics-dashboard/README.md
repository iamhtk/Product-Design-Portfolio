# Portfolio Analytics Dashboard

A standalone analytics dashboard application for tracking website performance metrics, inspired by Framer's analytics interface.

## Features

- **Dark Mode UI**: Modern dark theme matching Framer's analytics design
- **Real-time Metrics**: Live visitors, unique visitors, pageviews, bounce rate, and average session duration
- **Time-Series Charts**: Interactive line charts showing traffic trends over time
- **Traffic Sources**: View and analyze referrer sources (LinkedIn, Google, etc.)
- **Page Analytics**: Track most visited pages and their performance
- **Responsive Design**: Works seamlessly on desktop and tablet devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dashboard will open at `http://localhost:3001`

### Build

```bash
npm run build
```

## Project Structure

```
analytics-dashboard/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Left navigation sidebar
│   │   ├── Dashboard.tsx        # Main dashboard layout
│   │   ├── MetricsCards.tsx     # Key metrics display cards
│   │   ├── TimeSeriesChart.tsx  # Traffic trend chart
│   │   ├── SourcesTable.tsx     # Referrer sources table
│   │   └── PagesTable.tsx        # Most visited pages table
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
└── package.json
```

## Integration with Google Analytics 4

The dashboard is configured to connect to **Google Analytics 4 (GA4)**. 

### Quick Start (Mock Data)

The dashboard works out of the box with mock data. Just run:

```bash
npm install
npm run dev
```

### Connect to Real GA4 Data

See **[GA4_SETUP.md](./GA4_SETUP.md)** for complete setup instructions.

**Quick Setup Steps:**
1. Add GA4 tracking code to your website
2. Enable Google Analytics Data API in Google Cloud
3. Create a service account and download JSON key
4. Grant service account access in GA4
5. Configure environment variables (see `.env.example`)

**Important**: For production, use a backend API endpoint to securely handle GA4 credentials. Never expose service account keys in frontend code.

### Alternative Analytics Providers

The dashboard can be adapted to work with:
- **Plausible Analytics**: Use Plausible's API
- **Cloudflare Analytics**: Use Cloudflare GraphQL API (paid plans)
- **Custom Analytics**: Connect to your own analytics backend
- **Vercel Analytics**: Use Vercel's analytics API

## Customization

### Colors

Edit `tailwind.config.js` to customize the dark theme colors:

```javascript
colors: {
  dark: {
    bg: '#0a0a0a',        // Background
    sidebar: '#111111',   // Sidebar background
    card: '#151515',      // Card background
    hover: '#1a1a1a',     // Hover state
    border: '#222222',    // Borders
  }
}
```

### Time Ranges

Modify the time range options in `Dashboard.tsx`:

```typescript
const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last year']
```

## Future Enhancements

- [ ] Real-time data integration
- [ ] Date range picker functionality
- [ ] Export reports (PDF/CSV)
- [ ] Custom date ranges
- [ ] Funnels tracking
- [ ] A/B testing analytics
- [ ] User segmentation
- [ ] Geographic data visualization

## License

MIT
