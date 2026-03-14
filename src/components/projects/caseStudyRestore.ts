import { EXPAND_CASE_STUDY_PREFIX } from '../../App';

/** Restore case study expanded state after full-page reload (e.g. HMR) so user stays in place. */
export function getInitialCaseStudyVisible(): boolean {
  try {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const key = EXPAND_CASE_STUDY_PREFIX + path;
    if (sessionStorage.getItem(key) === '1') {
      sessionStorage.removeItem(key);
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}
