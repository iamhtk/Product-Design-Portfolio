# Google Analytics 4 (GA4) Setup Guide

This guide will help you connect your analytics dashboard to Google Analytics 4.

## Step 1: Set Up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing)
3. Add your website URL
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add GA4 to Your Website

Add the GA4 tracking code to your portfolio website:

### Option A: Add to HTML (Portfolio 2026)

Add this script to your `index.html` in the `<head>` section:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Option B: Add via Cloudflare (Recommended)

If you're using Cloudflare, you can add GA4 via:
1. Cloudflare Dashboard > Rules > Transform Rules
2. Create a response header rule to inject the GA4 script
3. Or use Cloudflare Zaraz for server-side tracking

## Step 3: Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Analytics Data API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Analytics Data API"
   - Click "Enable"

## Step 4: Create Service Account

1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Name it (e.g., "Analytics Dashboard")
4. Click **Create and Continue**
5. Skip role assignment for now, click **Done**

## Step 5: Generate Service Account Key

1. Click on your newly created service account
2. Go to **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Download the JSON file (keep it secure!)

## Step 6: Grant Analytics Access

1. Go back to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Under **Property**, click **Property Access Management**
4. Click **+** to add a user
5. Enter your service account email (from the JSON file, field: `client_email`)
6. Select role: **Viewer**
7. Click **Add**

## Step 7: Get Your Property ID

1. In Google Analytics, go to **Admin** > **Property Settings**
2. Find **Property ID** (numeric, e.g., `123456789`)
3. Copy this number

## Step 8: Configure Dashboard (Development Mode)

For development, you can use mock data. The dashboard will automatically use mock data if credentials aren't set.

### Option A: Use Mock Data (Quick Start)

Just run the dashboard - it will use sample data:

```bash
npm run dev
```

### Option B: Connect to Real GA4 (Production)

**Important**: For production, you should create a backend API endpoint to securely handle GA4 authentication. Never expose service account keys in frontend code.

#### Backend Setup (Recommended)

Create a backend API endpoint (Node.js/Express example):

```javascript
// server/api/analytics.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './path-to-service-account-key.json',
});

app.post('/api/analytics/ga4', async (req, res) => {
  const { startDate, endDate, dimensions, metrics } = req.body;
  
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: dimensions.map(d => ({ name: d })),
    metrics: metrics.map(m => ({ name: m })),
  });
  
  res.json(response);
});
```

Then update `src/services/analytics.ts` to call your backend API instead of GA4 directly.

## Step 9: Environment Variables

Create a `.env` file in the dashboard root:

```env
VITE_GA4_PROPERTY_ID=123456789
VITE_GA4_SERVICE_ACCOUNT_KEY=base64-encoded-json-key
```

**Note**: For production, use environment variables on your hosting platform (Vercel, Netlify, etc.)

## Troubleshooting

### "No data available"
- Make sure GA4 tracking code is installed on your website
- Verify you have traffic/data in Google Analytics
- Check that the date range has data

### "Permission denied"
- Verify service account has "Viewer" access in GA4
- Check that Property ID is correct
- Ensure Google Analytics Data API is enabled

### "Invalid credentials"
- Verify service account JSON key is valid
- Check that the key hasn't expired
- Ensure the key is properly base64 encoded (if using frontend)

## Security Best Practices

1. **Never commit** `.env` files or service account keys to git
2. **Use backend API** for production to keep credentials secure
3. **Rotate keys** periodically
4. **Limit permissions** - only grant "Viewer" role to service account
5. **Use environment variables** on your hosting platform

## Next Steps

- Set up automated data refresh
- Add custom date range picker
- Implement caching for better performance
- Add export functionality (CSV/PDF)

## Resources

- [GA4 Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Service Account Setup](https://cloud.google.com/iam/docs/service-accounts)
- [GA4 Property ID Guide](https://support.google.com/analytics/answer/9304153)
