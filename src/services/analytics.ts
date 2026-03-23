import ReactGA from 'react-ga4';

export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path });
}

export function trackNavClick(label: string) {
  ReactGA.event({
    category: 'Navigation',
    action: 'nav_click',
    label,
  });
}

export function trackProjectOpen(projectId: string) {
  ReactGA.event({
    category: 'Projects',
    action: 'project_open',
    label: projectId,
  });
}

export function trackProjectBack(projectId: string) {
  ReactGA.event({
    category: 'Projects',
    action: 'project_back',
    label: projectId,
  });
}

export function trackResumeView() {
  ReactGA.event({
    category: 'Resume',
    action: 'resume_view',
    label: 'Resume page opened',
  });
}

export function trackOutboundLink(label: string, url: string) {
  ReactGA.event({
    category: 'Outbound',
    action: 'outbound_click',
    label: `${label} - ${url}`,
  });
}

export function trackEmailClick() {
  ReactGA.event({
    category: 'Contact',
    action: 'email_click',
    label: 'sanyalhrithik@gmail.com',
  });
}

export function trackMobileMenuOpen() {
  ReactGA.event({
    category: 'Navigation',
    action: 'mobile_menu_open',
  });
}

export function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
  ReactGA.event({
    category: 'Engagement',
    action: 'scroll_depth',
    label: `${page} - ${depth}%`,
    value: depth,
  });
}

export function trackTimeOnPage(page: string, seconds: number) {
  ReactGA.event({
    category: 'Engagement',
    action: 'time_on_page',
    label: page,
    value: seconds,
  });
}

export function track404(path: string) {
  ReactGA.event({
    category: 'Errors',
    action: 'page_not_found',
    label: path,
  });
}