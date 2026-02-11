# Add Google Analytics 4 to Your Portfolio Website

Follow these steps to add GA4 tracking to your portfolio site.

## Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property (or create a new one)
3. Go to **Admin** > **Data Streams**
4. Click on your web stream
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Add Tracking Code to Portfolio

### Option A: Direct HTML Injection (Simplest)

Edit `/Portfolio 2026/index.html` and add this code in the `<head>` section, right after the `<title>` tag:

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

### Option B: Via Cloudflare (Recommended for Privacy)

If you're using Cloudflare, you can inject GA4 via Cloudflare's Zaraz or Transform Rules:

1. **Cloudflare Dashboard** > Your Site > **Rules** > **Transform Rules**
2. Create a new rule:
   - **Name**: "Inject GA4 Script"
   - **When**: `http.request.uri.path matches "/"`
   - **Then**: Add response header or inject script

Or use **Cloudflare Zaraz**:
1. Go to **Zaraz** in Cloudflare dashboard
2. Add Google Analytics as a tool
3. Enter your Measurement ID
4. Enable it

### Option C: React Component (If using React)

Create a component `src/components/GoogleAnalytics.tsx`:

```typescript
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // Replace with your ID

export function GoogleAnalytics() {
  useEffect(() => {
    // Load gtag script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID)

    return () => {
      // Cleanup if needed
    }
  }, [])

  return null
}
```

Then add `<GoogleAnalytics />` to your `App.tsx` or `main.tsx`.

## Step 3: Verify Tracking

1. Visit your portfolio website
2. Go to Google Analytics > **Reports** > **Realtime**
3. You should see yourself as an active user within 30 seconds

## Step 4: Test Page Views

Navigate through different pages on your portfolio:
- Home
- Work/Projects
- About
- Resume
- Blog
- Favorites

Check GA4 Realtime reports to see pageviews being tracked.

## Privacy Considerations

### GDPR Compliance

If you have EU visitors, consider adding a cookie consent banner. You can:

1. Use a service like [Cookiebot](https://www.cookiebot.com/) or [OneTrust](https://www.onetrust.com/)
2. Or implement a simple consent banner that only loads GA4 after consent

### Privacy-Friendly Alternative

For better privacy, consider:
- **Cloudflare Web Analytics** (no cookies, GDPR compliant)
- **Plausible Analytics** (privacy-focused, no cookies)
- **GA4 with IP anonymization** (enable in GA4 settings)

## Next Steps

Once GA4 is tracking:
1. Wait 24-48 hours for data to accumulate
2. Set up the analytics dashboard (see `GA4_SETUP.md`)
3. Connect the dashboard to your GA4 property

## Troubleshooting

### No data showing in GA4
- Check browser console for errors
- Verify Measurement ID is correct
- Ensure script is loading (check Network tab)
- Check if ad blockers are blocking GA4

### Data delayed
- GA4 can take 24-48 hours for historical data
- Realtime data appears within 30 seconds
- Check Realtime reports first to verify tracking works

### Cloudflare blocking
- If using Cloudflare, ensure GA4 scripts aren't blocked
- Check Cloudflare Firewall rules
- Consider using Cloudflare Zaraz instead
