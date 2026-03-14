export function UserResearch() {
  return (
    <section className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">User Research</h2>
        
        {/* Background */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Background</h3>
          <p className="text-gray-700 leading-relaxed">
            To design a solution that meets the needs of pharmacies, healthcare providers, and customers, it was essential to understand their existing workflows, pain points, and expectations. Through a mix of qualitative and quantitative research, we identified gaps in the current ecosystem and opportunities to create a more streamlined, user-friendly platform.
          </p>
        </div>
        
        {/* Research Goals */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Goals</h3>
          <p className="text-gray-700 font-semibold mb-3">Research Objectives</p>
          <ol className="space-y-2 text-gray-700 leading-relaxed">
            <li>1. Identify inefficiencies in pharmacy operations and customer engagement.</li>
            <li>2. Understand barriers to digital adoption for pharmacies and customers.</li>
            <li>3. Explore how healthcare providers and pharmacies collaborate to manage patient data and prescriptions.</li>
          </ol>
        </div>
        
        {/* Research Methodology */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Research Methodology</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            We employed a multi-method research approach to gather insights from diverse stakeholders:
          </p>
          
          <div className="space-y-8">
            {/* User Interviews */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">User Interviews</h4>
              <p className="text-sm font-semibold text-gray-700 mb-2">Participants:</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-3">
                <li>• 10 pharmacists and pharmacy staff.</li>
                <li>• 15 customers across urban and semi-urban areas.</li>
                <li>• 5 healthcare providers (doctors, lab technicians).</li>
              </ul>
              <p className="text-sm font-semibold text-gray-700 mb-2">Process:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Conducted 1-hour interviews focusing on workflows, challenges, and expectations.</li>
                <li>• Open-ended questions encouraged participants to share detailed experiences.</li>
              </ul>
            </div>
            
            {/* Surveys */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Surveys</h4>
              <p className="text-sm font-semibold text-gray-700 mb-2">Surveys:</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-3">
                <li>• 50 Pharmacy owners</li>
                <li>• 150 customers</li>
              </ul>
              <p className="text-sm font-semibold text-gray-700 mb-2">Key Focus Areas:</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• Frequency of pharmacy visits.</li>
                <li>• Preferred features for managing health records digitally.</li>
                <li>• Trust factors influencing digital adoption.</li>
              </ul>
              <p className="text-sm font-semibold text-gray-700 mb-3">Key Insights:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#E63946] mb-2">72%</p>
                  <p className="text-sm text-gray-700">of respondents preferred a simplified interface for order tracking.</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#E63946] mb-2">63%</p>
                  <p className="text-sm text-gray-700">indicated concerns about data privacy in healthcare apps.</p>
                </div>
              </div>
            </div>
            
            {/* Contextual Inquiries */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contextual Inquiries</h4>
              <p className="text-sm font-semibold text-gray-700 mb-2">Contextual Inquiries:</p>
              <p className="text-sm text-gray-700 mb-3"><strong>5 pharmacies observed over 2 weeks.</strong></p>
              <p className="text-sm font-semibold text-gray-700 mb-2">Process:</p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>• Shadowed pharmacy staff during inventory updates, order management, and customer interactions.</li>
                <li>• Documented pain points, bottlenecks, and opportunities for digital intervention</li>
              </ul>
              <p className="text-sm text-gray-700 italic">"A pharmacy owner spent over 3 hours manually reconciling orders and inventory."</p>
            </div>
          </div>
        </div>
        
        {/* Competitor Analysis */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Competitor Analysis</h3>
          <p className="text-sm font-semibold text-gray-700 mb-2">Competitor Analysis:</p>
          <p className="text-sm text-gray-700 mb-3"><strong>Platforms studied:</strong> Leading e-pharmacy apps in the market</p>
          <p className="text-sm font-semibold text-gray-700 mb-2">Focused on:</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-6">
            <li>• Navigation and usability.</li>
            <li>• Key features for order management and health records.</li>
            <li>• Gaps in user engagement and accessibility.</li>
          </ul>
          
          <div className="space-y-6">
            {/* 1mg */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">1 mg</h4>
              <p className="text-sm text-gray-600 mb-3">1mg is a pharmacy application that provides specialized and generic medicines along with branded medicines</p>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Home delivery of medicines</li>
                <li>2. Medicines calculator</li>
                <li>3. Provides 24-hours</li>
                <li>4. Appointment Options</li>
                <li>5. Provides doctor consultations</li>
              </ol>
            </div>
            
            {/* PharmEasy */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">PharmEasy</h4>
              <p className="text-sm text-gray-600 mb-3">Pharmeasy is another famous online pharmacy & medical store offering pharmaceutical and healthcare products.</p>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Home delivery of medicines</li>
                <li>2. Medicines calculator</li>
                <li>3. Provides 24-hours</li>
                <li>4. Appointment Options</li>
                <li>5. Provides doctor consultations</li>
              </ol>
            </div>
            
            {/* Zeno Health */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Zeno Health</h4>
              <p className="text-sm text-gray-600 mb-3">Zeno Health is a Mumbai-based pharmacy application that provides generic medicines and branded medicines.</p>
              <ol className="text-sm text-gray-700 space-y-1">
                <li>1. Home delivery of medicines</li>
                <li>2. Provides doctor consultations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
