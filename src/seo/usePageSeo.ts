import { useEffect } from 'react';
import {
  DEFAULT_KEYWORDS,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_LOCALE,
  SITE_NAME,
  TWITTER_HANDLE,
} from './siteConfig';
import type { SeoPage } from './getPageSeo';
import {
  getCreativeWorkJsonLd,
  getPageSeo,
  getPersonJsonLd,
  getWebSiteJsonLd,
} from './getPageSeo';

const JSON_LD_ID = 'portfolio-json-ld';

function setMeta(
  key: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
) {
  if (!content) return;
  let el = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(payload: object | object[]) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = JSON_LD_ID;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(payload);
}

export function usePageSeo(page: SeoPage, projectId: string | null) {
  useEffect(() => {
    const seo = getPageSeo(page, projectId);
    document.title = seo.title;

    setMeta('description', seo.description);
    setMeta('keywords', DEFAULT_KEYWORDS);
    setMeta('robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');

    setMeta('og:title', seo.title, 'property');
    setMeta('og:description', seo.description, 'property');
    setMeta('og:url', seo.canonical, 'property');
    setMeta('og:type', seo.ogType, 'property');
    setMeta('og:image', seo.ogImage, 'property');
    setMeta('og:image:width', String(OG_IMAGE_WIDTH), 'property');
    setMeta('og:image:height', String(OG_IMAGE_HEIGHT), 'property');
    setMeta('og:image:alt', `${SITE_NAME} — Design Engineer portfolio`, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', SITE_LOCALE, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);
    setMeta('twitter:image', seo.ogImage);
    setMeta('twitter:image:alt', `${SITE_NAME} — Design Engineer portfolio`);
    setMeta('twitter:site', TWITTER_HANDLE);
    setMeta('twitter:creator', TWITTER_HANDLE);

    setCanonical(seo.canonical);

    const graphs = [getPersonJsonLd(), getWebSiteJsonLd()];
    if (projectId && seo.ogType === 'article') {
      graphs.push(getCreativeWorkJsonLd(seo, projectId));
    }
    setJsonLd(graphs);
  }, [page, projectId]);
}
