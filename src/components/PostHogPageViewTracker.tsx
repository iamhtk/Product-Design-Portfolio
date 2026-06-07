import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPostHogPageView } from '../services/analytics';

export function PostHogPageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
    trackPostHogPageView(url);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
