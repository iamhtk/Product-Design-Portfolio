import type { ReactNode } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Compass,
  Headphones,
  HeartHandshake,
  LayoutGrid,
  Lightbulb,
  Lock,
  Network,
  Package,
  RefreshCw,
  Search,
  Shield,
  ShoppingCart,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  CaseStudyHighlightStat,
  CaseStudyQuoteBlock,
  CaseStudyStatStrip,
  type CaseStudyStatStripItem,
} from './caseStudyNativeBlocks';

/** Primary Raseet UI / link accent */
export const RASEET_TEAL = '#1A6B8A';
/** Research / emphasis accent used in exported stat graphics */
export const RASEET_RESEARCH_RED = '#1A6B8A';

const TEAL = RASEET_TEAL;
const RED = RASEET_RESEARCH_RED;

function RaseetParticipantStrip() {
  const items: CaseStudyStatStripItem[] = [
    { Icon: Store, label: 'Pharmacists and pharmacy staff', top: '', countEnd: 10 },
    { Icon: Users, label: 'Customers across urban and semi-urban areas', top: '', countEnd: 15 },
    { Icon: Stethoscope, label: 'Healthcare providers (doctors, lab technicians)', top: '', countEnd: 5 },
  ];
  return <CaseStudyStatStrip brandColor={TEAL} items={items} />;
}

/** Surveys, participants: 50 pharmacy owners, 150 customers */
function Final3() {
  const items: CaseStudyStatStripItem[] = [
    { Icon: Store, label: 'Pharmacy owners', top: '', countEnd: 50 },
    { Icon: Headphones, label: 'customers', top: '', countEnd: 150 },
  ];
  return <CaseStudyStatStrip brandColor={RED} items={items} />;
}

/** Key survey stats */
function Final4() {
  const items: CaseStudyStatStripItem[] = [
    {
      Icon: LayoutGrid,
      top: '72%',
      label: 'of respondents preferred a simplified interface for order tracking.',
    },
    {
      Icon: Shield,
      top: '63%',
      label: 'indicated concerns about data privacy in healthcare apps.',
    },
  ];
  return <CaseStudyStatStrip brandColor={RED} items={items} labelMaxWidth={200} />;
}

/** Contextual inquiries, 5 pharmacies */
function Final5() {
  const items: CaseStudyStatStripItem[] = [
    {
      Icon: Compass,
      top: '5',
      label: 'pharmacies observed over 2 weeks.',
    },
  ];
  return <CaseStudyStatStrip brandColor={TEAL} items={items} />;
}

/** Competitor analysis, focused on */
function Final7() {
  const items: CaseStudyStatStripItem[] = [
    { Icon: Compass, top: '1', label: 'Navigation and usability.' },
    { Icon: LayoutGrid, top: '2', label: 'Key features for order management and health records.' },
    { Icon: Users, top: '3', label: 'Gaps in user engagement and accessibility.' },
  ];
  return <CaseStudyStatStrip brandColor={TEAL} items={items} labelMaxWidth={200} />;
}

/** Revenue stat, competitor process */
function Final8() {
  return (
    <CaseStudyHighlightStat
      brandColor={RED}
      prefix="More than"
      main="20%"
      label="increase in overall pharmacy revenue by combining improved workflows, faster onboarding, and enhanced customer experiences."
      Icon={TrendingUp}
    />
  );
}

/** Summary, unified platform + insight / impact */
function Final9() {
  return (
    <div className="w-full space-y-8">
      <p
        className="m-0 text-center font-bold leading-snug"
        style={{ color: '#1A6B8A', fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)' }}
      >
        Unified platform = Improved efficiency + Enhanced customer trust + Higher pharmacy adoption rates
      </p>
      <CaseStudyStatStrip
        brandColor={TEAL}
        labelMaxWidth={260}
        items={[
          {
            Icon: Lightbulb,
            top: 'Insight',
            label:
              'Pharmacists rely heavily on manual processes for inventory management and order tracking.',
          },
          {
            Icon: Target,
            top: 'Impact',
            label:
              'There is a critical need for dynamic inventory management and order fulfillment tools.',
          },
        ]}
      />
    </div>
  );
}

/** Second summary graphic, same insight pattern */
function Final10() {
  return (
    <CaseStudyStatStrip
      brandColor={TEAL}
      labelMaxWidth={260}
      items={[
        {
          Icon: Lightbulb,
          top: 'Insight',
          label: 'Many pharmacy owners feel overwhelmed by the technical setup required to go online.',
        },
        {
          Icon: Target,
          top: 'Impact',
          label: 'Simplified onboarding workflows and dedicated support are essential for adoption.',
        },
      ]}
    />
  );
}

/** Key finding 1, pharmacy workflows */
function Final11() {
  return (
    <CaseStudyStatStrip
      brandColor={TEAL}
      labelMaxWidth={260}
      items={[
        {
          Icon: Lightbulb,
          top: 'Insight',
          label:
            'Pharmacists rely heavily on manual processes for inventory management and order tracking.',
        },
        {
          Icon: Target,
          top: 'Impact',
          label:
            'There is a critical need for dynamic inventory management and order fulfillment tools.',
        },
      ]}
    />
  );
}

function Final12() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“I’m not familiar with digital tools, it feels like too much work.” – Pharmacy Owner Participant'
      }
    />
  );
}

/** Digital adoption, insight / impact */
function Final13() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={260}
      items={[
        {
          Icon: Lightbulb,
          top: 'Insight',
          label:
            'Technical complexity and low digital literacy make pharmacies hesitant to move workflows online.',
        },
        {
          Icon: Target,
          top: 'Impact',
          label: 'Guided onboarding, templates, and live support reduce setup friction and build confidence.',
        },
      ]}
    />
  );
}

function Final14() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={'“It took me ages to find what I needed, the filters were confusing.” – Customer Participant'}
    />
  );
}

/** Navigation, insight / impact */
function Final15() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={280}
      items={[
        {
          Icon: Lightbulb,
          top: 'Insight',
          label:
            'Poor search functionality and complex checkout processes lead to frustration and drop-offs.',
        },
        {
          Icon: Target,
          top: 'Impact',
          label: 'Intuitive navigation and personalized search recommendations are top priorities.',
        },
      ]}
    />
  );
}

function Final16() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“I’m worried about sharing my health data, how can I be sure it’s secure?” – Customer Participant'
      }
    />
  );
}

function Final17() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“I’m not familiar with digital tools, it feels like too much work.” – Pharmacy Owner Participant'
      }
    />
  );
}

function Final18() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={'“It took me ages to find what I needed, the filters were confusing.” – Customer Participant'}
    />
  );
}

/** Trust, main quote + three numbered quotes */
function Final19() {
  return (
    <div className="w-full space-y-6">
      <CaseStudyQuoteBlock
        brandColor={RED}
        quote={
          '“I’m worried about sharing my health data, how can I be sure it’s secure?” – Customer Participant'
        }
      />
      <CaseStudyStatStrip
        brandColor={RED}
        labelMaxWidth={220}
        items={[
          {
            Icon: Package,
            top: '#1',
            label:
              '“Managing stock manually is exhausting, I’ve lost customers due to delays.” – Pharmacist',
          },
          {
            Icon: Search,
            top: '#2',
            label:
              '“It took me ages to find what I needed, the filters were confusing.” – Customer Participant',
          },
          {
            Icon: Lock,
            top: '#3',
            label:
              '“I’m worried about sharing my health data, how can I be sure it’s secure?” – Customer Participant',
          },
        ]}
      />
    </div>
  );
}

function Final20() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={240}
      items={[
        {
          Icon: Network,
          top: '#1',
          label: '“Seamless integration between stakeholders:”',
        },
        {
          Icon: UserPlus,
          top: '#2',
          label: '“Easier onboarding for partner pharmacies:”',
        },
      ]}
    />
  );
}

/** Insights at a glance, 2×2 */
function Final21() {
  const row1: CaseStudyStatStripItem[] = [
    {
      Icon: Network,
      top: '#1',
      label:
        'Seamless integration between stakeholders: Establish a connected ecosystem where pharmacies, healthcare providers, and customers interact efficiently.',
    },
    {
      Icon: UserPlus,
      top: '#2',
      label:
        'Easier onboarding for partner pharmacies: Reduce technical barriers, enabling small to mid-sized pharmacies to transition into e-commerce-ready businesses with minimal effort.',
    },
  ];
  const row2: CaseStudyStatStripItem[] = [
    {
      Icon: Clock,
      top: '#1',
      label:
        'Easy refill prescription scheduling: Allow customers to set automated refills, reducing friction in managing recurring medications.',
    },
    {
      Icon: Package,
      top: '#2',
      label:
        'Easy inventory management: Enable pharmacies to track stock levels, receive alerts for low inventory, and optimize order fulfillment.',
    },
  ];
  return (
    <div className="w-full space-y-10">
      <CaseStudyStatStrip brandColor={RED} items={row1} labelMaxWidth={260} />
      <CaseStudyStatStrip brandColor={RED} items={row2} labelMaxWidth={260} />
    </div>
  );
}

function Final22() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={280}
      items={[
        {
          Icon: Store,
          top: '#1',
          label:
            'Online access to medicines/storefront: Provide a reliable digital storefront, making healthcare products more accessible while driving pharmacy revenue.',
        },
        {
          Icon: HeartHandshake,
          top: '#2',
          label:
            'Better health outcomes: Improve medication adherence and patient engagement by offering a user-friendly and trustworthy healthcare platform.',
        },
      ]}
    />
  );
}

function Final23() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“Finally, everything I need is in one place, it saves me so much time and keeps everything organized.”, Pharmacist Participant'
      }
    />
  );
}

function Final24() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“The onboarding guide was so straightforward, I was up and running in no time!” – Pharmacy Owner Participant'
      }
    />
  );
}

function Final25() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“The onboarding guide was so straightforward, I was up and running in no time!” – Pharmacy Owner Participant'
      }
    />
  );
}

function Final26() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={220}
      items={[
        {
          Icon: Clock,
          top: '50%',
          label: 'Reduced onboarding time; most pharmacies completed setup within 2–3 days.',
        },
        {
          Icon: CheckCircle2,
          top: '85%',
          label: 'Higher onboarding success rate, enabling faster adoption across partner pharmacies.',
        },
      ]}
    />
  );
}

function Final27() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“Shopping for medicines has never been this easy, I love how fast and smooth the process is now.”, Customer Participant'
      }
    />
  );
}

function Final28() {
  const items: CaseStudyStatStripItem[] = [
    { Icon: Clock, top: '40%', label: 'Product discovery time reduced' },
    { Icon: ShoppingCart, top: '25%', label: 'Cart abandonment rates decreased' },
    { Icon: CheckCircle2, top: '20%', label: 'Order completion rates increased' },
  ];
  return <CaseStudyStatStrip brandColor={RED} items={items} />;
}

/** Feature highlight, quote + stat per column */
function Final29() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="space-y-4">
        <CaseStudyQuoteBlock
          brandColor={RED}
          quote={'“A complete view of operations ensures efficiency and better customer service.”'}
        />
        <CaseStudyStatStrip
          brandColor={RED}
          items={[
            {
              Icon: Clock,
              top: '5 hrs',
              label: 'Saved pharmacies an average of 5 hours/week by automating workflows.',
            },
          ]}
        />
      </div>
      <div className="space-y-4">
        <CaseStudyQuoteBlock
          brandColor={RED}
          quote={'“Simplified processes improve convenience and trust in the platform.”'}
        />
        <CaseStudyStatStrip
          brandColor={RED}
          items={[
            {
              Icon: BarChart3,
              top: '25%',
              label: 'Reduced drop-off rates by 25% and increased order completion rates by 20%.',
            },
          ]}
        />
      </div>
      <div className="space-y-4">
        <CaseStudyQuoteBlock
          brandColor={RED}
          quote={'“Real-time updates and secure data sharing enhance care delivery.”'}
        />
        <CaseStudyStatStrip
          brandColor={RED}
          items={[
            {
              Icon: TrendingUp,
              top: '20%',
              label:
                'Partner pharmacies experienced a 20% increase in revenue within three months of adoption.',
            },
          ]}
        />
      </div>
    </div>
  );
}

function Final30() {
  const row1: CaseStudyStatStripItem[] = [
    { Icon: RefreshCw, top: '#1', label: '50% faster design iterations due to reusable components' },
    {
      Icon: Target,
      top: '#2',
      label: '30% reduction in inconsistencies by enforcing MedScope guidelines.',
    },
    { Icon: TrendingUp, top: '#3', label: 'Scalability ensured for future growth and expansion.' },
    {
      Icon: Users,
      top: '#4',
      label: 'Stronger developer-designer collaboration through standardized documentation and clear workflows.',
    },
  ];
  const row2: CaseStudyStatStripItem[] = [
    {
      Icon: Search,
      top: '#1',
      label: '40% faster product discovery for users with limited tech proficiency.',
    },
    {
      Icon: CheckCircle2,
      top: '#2',
      label:
        'Increased order completion rate by 20%, reducing frustration and improving overall user satisfaction.',
    },
    {
      Icon: Users,
      top: '#3',
      label:
        'Higher adoption rate among elderly users, attributed to an intuitive, minimal-interaction design approach.',
    },
  ];
  return (
    <div className="w-full space-y-12">
      <CaseStudyStatStrip brandColor={RED} items={row1} labelMaxWidth={200} />
      <CaseStudyStatStrip brandColor={RED} items={row2} labelMaxWidth={220} />
    </div>
  );
}

function Final31() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={220}
      items={[
        {
          Icon: Search,
          top: '#1',
          label: '40% faster product discovery for users with limited tech proficiency.',
        },
        {
          Icon: CheckCircle2,
          top: '#2',
          label:
            'Increased order completion rate by 20%, reducing frustration and improving overall user satisfaction.',
        },
        {
          Icon: Users,
          top: '#3',
          label:
            'Higher adoption rate among elderly users, attributed to an intuitive, minimal-interaction design approach.',
        },
      ]}
    />
  );
}

function Final32() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={220}
      items={[
        {
          Icon: Search,
          top: '#1',
          label: '40% faster product discovery for users with limited tech proficiency.',
        },
        {
          Icon: CheckCircle2,
          top: '#2',
          label:
            'Increased order completion rate by 20%, reducing frustration and improving overall user satisfaction.',
        },
        {
          Icon: Users,
          top: '#3',
          label:
            'Higher adoption rate among elderly users, attributed to an intuitive, minimal-interaction design approach.',
        },
      ]}
    />
  );
}

function Final33() {
  return (
    <CaseStudyQuoteBlock
      brandColor={RED}
      quote={
        '“The changes make it so much easier to manage everything, my staff and I feel more confident now.”, Pharmacist Participant'
      }
    />
  );
}

function Final34() {
  return (
    <CaseStudyStatStrip
      brandColor={RED}
      labelMaxWidth={240}
      items={[
        {
          Icon: RefreshCw,
          top: '#1',
          label:
            'Iterative Design Process: Constant feedback loops from engineers and stakeholders ensured smooth development and reduced rework.',
        },
        {
          Icon: Users,
          top: '#2',
          label:
            'Cross-Team Alignment: Regular stand-ups and sprint reviews ensured transparency and rapid iteration.',
        },
        {
          Icon: BarChart3,
          top: '#3',
          label:
            'Enhanced User Experience: By incorporating business insights and user feedback, we designed a seamless pharmacy ordering and inventory experience.',
        },
      ]}
    />
  );
}

function Final1() {
  return (
    <CaseStudyQuoteBlock
      brandColor={TEAL}
      quote="What is your biggest challenge when managing prescriptions or inventory?"
    />
  );
}

function Final6() {
  return (
    <CaseStudyQuoteBlock
      brandColor={TEAL}
      quote="A pharmacy owner spent over 3 hours manually reconciling orders and inventory."
    />
  );
}

const FINAL_RENDERERS: Record<string, () => ReactNode> = {
  '1.png': Final1,
  '2.png': RaseetParticipantStrip,
  '3.png': Final3,
  '4.png': Final4,
  '5.png': Final5,
  '6.png': Final6,
  '7.png': Final7,
  '8.png': Final8,
  '9.png': Final9,
  '10.png': Final10,
  '11.png': Final11,
  '12.png': Final12,
  '13.png': Final13,
  '14.png': Final14,
  '15.png': Final15,
  '16.png': Final16,
  '17.png': Final17,
  '18.png': Final18,
  '19.png': Final19,
  '20.png': Final20,
  '21.png': Final21,
  '22.png': Final22,
  '23.png': Final23,
  '24.png': Final24,
  '25.png': Final25,
  '26.png': Final26,
  '27.png': Final27,
  '28.png': Final28,
  '29.png': Final29,
  '30.png': Final30,
  '31.png': Final31,
  '32.png': Final32,
  '33.png': Final33,
  '34.png': Final34,
};

/**
 * Returns native HTML replacement for `/raseet/final/N.png` when available.
 */
export function renderRaseetFinalImage(src: string): ReactNode | null {
  const m = src.match(/\/raseet\/final\/([^/]+)$/);
  if (!m) return null;
  const file = m[1];
  const render = FINAL_RENDERERS[file];
  return render ? render() : null;
}
