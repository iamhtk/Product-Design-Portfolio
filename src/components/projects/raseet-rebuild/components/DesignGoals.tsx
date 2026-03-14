export function DesignGoals() {
  return (
    <section className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Design Goals & Considerations</h2>
        
        {/* Information Architecture */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Information Architecture</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            To create a seamless and efficient user experience, the <strong>information architecture</strong> was carefully designed to cater to different user roles—<strong>pharmacists, healthcare providers, and customers</strong>. The goal was to structure the platform in a way that improves <strong>discoverability, usability, and accessibility</strong> while ensuring smooth navigation for all stakeholders.
          </p>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-900 mb-3">Key Considerations</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Role-Specific Navigation</strong>: Tailored dashboards for pharmacies, customers, and healthcare providers to minimize cognitive load and present relevant information.</li>
              <li>• <strong>E-Commerce & Healthcare Services</strong>: A clear distinction between shopping for medications, managing prescriptions, and accessing healthcare services.</li>
              <li>• <strong>Search & Filtering</strong>: Robust search functionality and category-based navigation to enhance product and service discovery.</li>
              <li>• <strong>Support & Accessibility</strong>: Dedicated help sections, including <strong>FAQs, live chat, and feedback options</strong>, ensuring users can easily seek assistance.</li>
              <li>• <strong>Security & Privacy</strong>: Profile management with role-based access control to safeguard sensitive user and medical data.</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <p className="font-semibold text-gray-900 mb-3">Structure Breakdown</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Pharmacies</strong>: Inventory management, order tracking, CRM integration, and analytics.</li>
              <li>• <strong>Healthcare Providers</strong>: Patient records, collaboration tools, and prescription management.</li>
              <li>• <strong>Customers</strong>: Dashboard for health records, shopping, and order tracking.</li>
              <li>• <strong>Global Components</strong>: Header (search, filters, profile), footer (privacy policies, support), and system notifications.</li>
            </ul>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            By designing a <strong>hierarchical yet intuitive structure</strong>, we ensured that users could <strong>quickly access</strong> the most relevant features, resulting in a <strong>smoother and more efficient experience</strong> for all stakeholders.
          </p>
        </div>
        
        {/* Task Flows */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Task Flow</h3>
          
          <div className="space-y-4 text-gray-700">
            <p><strong>Scenario 1:</strong> Pharmacy staff managing stock and placing bulk orders</p>
            <p><strong>Scenario 2:</strong> Customer ordering medicines for the first time</p>
            <p><strong>Scenario 3:</strong> Reordering medicines for elderly patients</p>
          </div>
        </div>
        
        {/* Feature Highlight */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Feature Highlight</h3>
          
          <div className="space-y-4 text-gray-700">
            <p className="italic">"A complete view of operations ensures efficiency and better customer service.</p>
            <p className="italic">"Simplified processes improve convenience and trust in the platform.</p>
            <p className="italic">"Real-time updates and secure data sharing enhance care delivery.</p>
          </div>
        </div>
        
        {/* Impact of Solutions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Impact of Solutions!!!</h3>
          
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              <strong>Saved pharmacies an average of 5 hours/week</strong> by automating workflows.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Reduced drop-off rates by 25%</strong> and increased order completion rates by <strong>20%</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Partner pharmacies experienced a <strong>20% increase in revenue</strong> within three months of adoption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
