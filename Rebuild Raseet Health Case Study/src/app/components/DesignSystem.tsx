export function DesignSystem() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">MedScope: A Scalable & Systematic Design System</h2>
        
        {/* The Challenge */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">The Challenge</h3>
          <p className="text-gray-700 leading-relaxed">
            As Raseet Health expanded, maintaining <strong>design consistency, efficiency, and scalability</strong> became a challenge. A fragmented UI led to <strong>inconsistencies in components, longer design cycles, and increased development overhead</strong>. The need for a <strong>unified design system</strong> became evident to streamline collaboration, reduce redundancy, and enhance the <strong>user experience across all touchpoints</strong>.
          </p>
        </div>
        
        {/* The Goal */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">The Goal</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Establish a <strong>scalable design system</strong> following <strong>Atomic Design Principles</strong>.</li>
            <li>• Ensure <strong>cross-platform consistency</strong> while allowing <strong>flexibility for future expansions</strong>.</li>
            <li>• Improve <strong>efficiency</strong> by reducing time spent on repetitive UI decisions.</li>
            <li>• Enable a <strong>structured decision-making process</strong> to govern component usage and modifications.</li>
          </ul>
        </div>
        
        {/* Structuring MedScope */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Structuring MedScope: Design System Architecture</h3>
          
          <p className="text-gray-700 leading-relaxed mb-4">MedScope was built using:</p>
          
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• <strong>Atomic Design Principles</strong> – Breaking down components into <strong>atoms, molecules, organisms, templates, and pages</strong> for modular reusability.</li>
            <li>• <strong>A Reusable Component Library</strong> – Standardizing UI elements to <strong>ensure consistency across different features</strong>.</li>
            <li>• <strong>Scalability Standards</strong> – Creating a foundation for <strong>future expansion without compromising usability</strong>.</li>
          </ul>
          
          <p className="text-gray-700 leading-relaxed mb-4">The design system encompassed:</p>
          
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Typography & Color Systems</strong> – Ensuring accessibility and brand alignment.</li>
            <li>• <strong>Spacing & Grid Systems</strong> – Providing a structured layout framework.</li>
            <li>• <strong>Component Library</strong> – Predefined UI elements for seamless design iteration.</li>
            <li>• <strong>Interactive Patterns & States</strong> – Standardizing hover states, transitions, and user feedback mechanisms.</li>
          </ul>
        </div>
        
        {/* MedScope Design System Decision-Making Process */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">MedScope Design System Decision-Making Process: How We Built It</h3>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            A <strong>structured decision-making framework</strong> was implemented to <strong>maintain consistency and prevent design fragmentation</strong>:
          </p>
          
          <ol className="space-y-4 text-gray-700">
            <li>
              <strong>1. Assess the Need - Does a similar component exist in MedScope?</strong>
              <ul className="mt-2 ml-6 space-y-1">
                <li>• <strong>Yes</strong> → Use the existing component.</li>
                <li>• <strong>No</strong> → Proceed to the next step.</li>
              </ul>
            </li>
            <li>
              <strong>2. Modify vs. Create - Can an existing component be adapted for this use case?</strong>
              <ul className="mt-2 ml-6 space-y-1">
                <li>• <strong>Yes</strong> → Modify and document changes in the system.</li>
                <li>• <strong>No</strong> → Move to prototyping.</li>
              </ul>
            </li>
            <li>
              <strong>3. Prototype & Validation - If the component cannot be generalized:</strong>
              <ul className="mt-2 ml-6 space-y-1">
                <li>• It is added as a <strong>one-off to the repository</strong>.</li>
              </ul>
              <p className="mt-2 ml-6"><strong>If it can be standardized:</strong></p>
              <ul className="mt-1 ml-12 space-y-1">
                <li>• It is <strong>documented and integrated</strong> into MedScope for <strong>global reuse</strong>.</li>
              </ul>
            </li>
            <li>
              <strong>4. Integration & Documentation -</strong> The new/updated component is:
              <ul className="mt-2 ml-6 space-y-1">
                <li>• <strong>Incorporated into the design system</strong>.</li>
                <li>• <strong>Guidelines and best practices</strong> are documented for seamless adoption.</li>
              </ul>
            </li>
          </ol>
        </div>
        
        {/* Key Outcomes */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Outcomes & Impact 🚀</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-lg font-bold text-[#E63946] mb-2">#1</p>
              <p className="text-gray-700 leading-relaxed"><strong>50% faster design iterations</strong> due to reusable components</p>
            </div>
            
            <div>
              <p className="text-lg font-bold text-[#E63946] mb-2">#2</p>
              <p className="text-gray-700 leading-relaxed"><strong>30% reduction in inconsistencies</strong> by enforcing MedScope guidelines.</p>
            </div>
            
            <div>
              <p className="text-lg font-bold text-[#E63946] mb-2">#3</p>
              <p className="text-gray-700 leading-relaxed"><strong>Scalability ensured</strong> for future growth and expansion.</p>
            </div>
            
            <div>
              <p className="text-lg font-bold text-[#E63946] mb-2">#4</p>
              <p className="text-gray-700 leading-relaxed"><strong>Stronger developer-designer collaboration</strong> through standardized documentation and clear workflows.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
