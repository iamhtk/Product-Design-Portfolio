export function CaseStudyHero() {
  return (
    <section className="relative bg-[#F5F5F5] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-4 text-gray-900">Raseet Health</h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
            Raseet Health is an intuitive platform for pharmacies, catering to users of all ages and tech levels, with a focus on a broad audience.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img 
            src="figma:asset/49db5d8a9a64438e8f97eb7db72af5669072f463.png"
            alt="Raseet Health Platform Overview"
            className="w-full rounded-lg"
          />
        </div>

        {/* Speed Read Section */}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-900 mb-2">Speed Read</p>
          <p className="text-gray-600 mb-8">In a rush?<br />Here's the gist.</p>
        </div>

        {/* Summary Grid - 2 columns */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Challenge</h3>
            <p className="text-gray-700 leading-relaxed">
              The goal was to create a digital platform that empowers local pharmacies to transition into e-commerce-ready, one-stop health and wellness hubs. The key challenges included ensuring seamless collaboration among stakeholders, simplifying technical adoption for pharmacies, and providing a frictionless customer experience while prioritizing data security and compliance.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Process</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              I conducted in-depth user research, including interviews, contextual inquiries, and competitor analysis, to uncover pain points and opportunities. The design process involved three phases:
            </p>
            <ol className="text-gray-700 leading-relaxed space-y-2 text-sm">
              <li>1. <strong>Wireframes</strong>: Created role-specific dashboards for pharmacists, customers, and healthcare providers.</li>
              <li>2. <strong>Prototyping</strong>: Built high-fidelity prototypes to test user flows and interactions.</li>
              <li>3. <strong>Iterative Testing</strong>: Conducted usability tests and incorporated feedback to refine navigation, onboarding, and checkout processes.</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Takeaways</h3>
            <p className="text-gray-700 leading-relaxed">
              This project enhanced my ability to design for diverse user needs within a highly regulated healthcare domain. I honed skills in simplifying complex workflows, fostering user trust, and designing accessible, scalable systems. Collaborating with stakeholders taught me the value of iterative feedback loops in delivering impactful solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Impact</h3>
            <p className="text-gray-700 leading-relaxed">
              The platform improved operational efficiency for pharmacies, <strong>reducing manual tasks by 30%</strong>. <strong>Customer engagement increased</strong>, with <strong>cart abandonment rates dropping by 25%</strong> and <strong>repeat orders growing by 35%</strong>. Raseet Health successfully positioned itself as a leading platform, <strong>driving a 20% revenue increase</strong> for partner pharmacies within three months.
            </p>
          </div>
        </div>

        {/* Got more time CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">Got more time? :)</p>
          <p className="text-gray-500 text-sm mt-2">Click the arrow to read the entire case study</p>
        </div>
      </div>
    </section>
  );
}