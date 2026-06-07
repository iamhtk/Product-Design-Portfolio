import ReactGA from 'react-ga4';
import posthog from 'posthog-js';

export function trackPageView(path: string) {
  ReactGA.send({ hitType: 'pageview', page: path });
}

export function trackPostHogPageView(url: string) {
  posthog.capture('$pageview', { $current_url: url });
}

export function trackNavClick(label: string) {
  ReactGA.event({
    category: 'Navigation',
    action: 'nav_click',
    label,
  });
  posthog.capture('nav_clicked', { page: label });
}

export function trackProjectOpen(projectId: string) {
  ReactGA.event({
    category: 'Projects',
    action: 'project_open',
    label: projectId,
  });
  posthog.capture('project_opened', { project_id: projectId });
}

export function trackProjectBack(projectId: string) {
  ReactGA.event({
    category: 'Projects',
    action: 'project_back',
    label: projectId,
  });
  posthog.capture('project_back_clicked', { project_id: projectId });
}

export function trackResumeView() {
  ReactGA.event({
    category: 'Resume',
    action: 'resume_view',
    label: 'Resume page opened',
  });
  posthog.capture('resume_viewed');
}

export function trackCertificationClick(certName: string, certUrl: string) {
  posthog.capture('certification_clicked', { cert_name: certName, cert_url: certUrl });
}

export function trackResearchPublicationClick(platform: string, url: string) {
  posthog.capture('research_publication_clicked', { platform, url });
}

export function trackAdjacentProjectNavigated(fromProjectId: string, toProjectId: string, direction: 'previous' | 'next') {
  posthog.capture('adjacent_project_navigated', { from_project_id: fromProjectId, to_project_id: toProjectId, direction });
}

export function trackExploreMoreProjectClicked(fromProjectId: string, toProjectId: string, direction: 'previous' | 'next') {
  posthog.capture('explore_more_project_clicked', { from_project_id: fromProjectId, to_project_id: toProjectId, direction });
}

export function trackResumeDownload() {
  posthog.capture('resume_downloaded');
}

export function trackOutboundLink(label: string, url: string) {
  ReactGA.event({
    category: 'Outbound',
    action: 'outbound_click',
    label: `${label} - ${url}`,
  });
  posthog.capture('outbound_link_clicked', { link_label: label, url });
}

export function trackEmailClick() {
  ReactGA.event({
    category: 'Contact',
    action: 'email_click',
    label: 'sanyalhrithik@gmail.com',
  });
  posthog.capture('email_clicked');
}

export function trackMobileMenuOpen() {
  ReactGA.event({
    category: 'Navigation',
    action: 'mobile_menu_open',
  });
  posthog.capture('mobile_menu_opened');
}

export function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
  ReactGA.event({
    category: 'Engagement',
    action: 'scroll_depth',
    label: `${page} - ${depth}%`,
    value: depth,
  });
  posthog.capture('scroll_depth_reached', { page, depth });
}

export function trackTimeOnPage(page: string, seconds: number) {
  ReactGA.event({
    category: 'Engagement',
    action: 'time_on_page',
    label: page,
    value: seconds,
  });
  posthog.capture('time_on_page', { page, seconds });
}

export function track404(path: string) {
  ReactGA.event({
    category: 'Errors',
    action: 'page_not_found',
    label: path,
  });
  posthog.capture('page_not_found', { path });
}

export function trackBlogPostClick(title: string, url: string) {
  posthog.capture('blog_post_clicked', { post_title: title, url });
}

export function trackSocialLinkClick(platform: string, url: string) {
  posthog.capture('social_link_clicked', { platform, url });
}