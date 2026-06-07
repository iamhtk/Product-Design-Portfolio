<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your portfolio project. PostHog (`posthog-js`) was already installed and initialized in `src/main.tsx` with environment variables from `.env.local`. The wizard audited all existing event coverage, identified five high-value gaps, implemented them, and wired up a PostHog dashboard with five tailored insights.

**What was updated:**
- `src/services/analytics.ts` — Added `resume_viewed` capture to the existing `trackResumeView` function (which previously only fired a GA4 event), and added four new exported tracking functions: `trackCertificationClick`, `trackResearchPublicationClick`, `trackAdjacentProjectNavigated`, and `trackExploreMoreProjectClicked`.
- `src/components/ResumePage.tsx` — Wired `trackCertificationClick` into the `handleCertClick` handler (passing cert name and URL), and added `trackResearchPublicationClick` to both the IEEE Xplore Profile and Springer Profile links.
- `src/components/projects/AdjacentProjects.tsx` — Added `trackAdjacentProjectNavigated` to both the prev and next project anchor `onClick` handlers, with `from_project_id`, `to_project_id`, and `direction` properties.
- `src/components/projects/ExploreMoreSection.tsx` — Added `trackExploreMoreProjectClicked` to both the prev and next project anchor `onClick` handlers in the Explore More section.

**No new dependencies were installed.** The existing `posthog-js` package already provides everything needed.

| Event | Description | File |
|---|---|---|
| `project_opened` | User clicks on a project card to view its case study | `src/services/analytics.ts` → `src/App.tsx` |
| `project_back_clicked` | User navigates back to the work page from a project | `src/services/analytics.ts` → `src/App.tsx` |
| `resume_viewed` | Fired when the resume/experience page is navigated to — entry point of the resume download funnel | `src/services/analytics.ts` |
| `resume_downloaded` | User clicks the download PDF button on the resume page | `src/services/analytics.ts`, `src/components/ResumePage.tsx` |
| `certification_clicked` | User clicks a certification credential link; includes `cert_name` and `cert_url` | `src/components/ResumePage.tsx` |
| `research_publication_clicked` | User clicks IEEE Xplore or Springer profile links; includes `platform` and `url` | `src/components/ResumePage.tsx` |
| `adjacent_project_navigated` | User uses the prev/next nav at the top of a case study; includes `from_project_id`, `to_project_id`, `direction` | `src/components/projects/AdjacentProjects.tsx` |
| `explore_more_project_clicked` | User clicks a project in the Explore More section; includes `from_project_id`, `to_project_id`, `direction` | `src/components/projects/ExploreMoreSection.tsx` |
| `email_clicked` | User clicks the email link in the navigation | `src/services/analytics.ts` → `src/components/Navigation.tsx` |
| `outbound_link_clicked` | User clicks a link that navigates away from the site | `src/services/analytics.ts` → `src/App.tsx` (global listener) |
| `nav_clicked` | User clicks a navigation link (Work, Resume, Blog, etc.) | `src/services/analytics.ts` → `src/components/Navigation.tsx` |
| `mobile_menu_opened` | User opens the mobile navigation menu | `src/services/analytics.ts` → `src/components/Navigation.tsx` |
| `scroll_depth_reached` | User scrolls to a milestone (25%, 50%, 75%, 100%) on a page | `src/services/analytics.ts` → `src/App.tsx` |
| `time_on_page` | User spends time on a page before navigating away | `src/services/analytics.ts` → `src/App.tsx` |
| `page_not_found` | User navigates to a project or page that does not exist | `src/services/analytics.ts` → `src/App.tsx` |
| `blog_post_clicked` | User clicks on a blog post link to read it on Medium | `src/services/analytics.ts`, `src/components/Blog.tsx` |
| `social_link_clicked` | User clicks a social media profile link in the navigation | `src/services/analytics.ts`, `src/components/Navigation.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/458626/dashboard/1681342)
- [Resume download conversion funnel (wizard)](https://us.posthog.com/project/458626/insights/D2608WBk) — Funnel from `resume_viewed` → `resume_downloaded`
- [Portfolio engagement over time (wizard)](https://us.posthog.com/project/458626/insights/CoYFiLLZ) — Daily trend of projects opened, blog posts read, and outbound links
- [Project discovery navigation (wizard)](https://us.posthog.com/project/458626/insights/YD182OTG) — Adjacent nav and Explore More clicks between case studies
- [Resume page engagement (wizard)](https://us.posthog.com/project/458626/insights/duBjXOso) — Full resume page funnel: viewed → downloaded → certifications → research
- [Outreach and social engagement (wizard)](https://us.posthog.com/project/458626/insights/Gx5PrIZ6) — Email, social, and outbound link click trends

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
