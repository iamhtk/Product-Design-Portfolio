export function KeyFindings() {
  return (
    <section className="py-20 px-6 bg-[#2B2B2B]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white">Key Findings</h2>
        
        {/* Opening Metric */}
        <div className="mb-12">
          <p className="text-gray-300 mb-4">More than</p>
          <p className="text-5xl font-bold text-[#E63946] mb-4">20%</p>
          <p className="text-gray-300 mb-6">increase in overall pharmacy revenue by combining improved workflows, faster onboarding, and enhanced customer experiences.</p>
          <p className="text-xl text-white font-semibold">Unified platform = Improved efficiency + Enhanced customer trust + Higher pharmacy adoption rates</p>
        </div>
        
        <div className="space-y-12">
          {/* Finding 1 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Finding 1</h3>
            <p className="text-lg font-semibold text-white mb-4">Pharmacy Workflows Are Inefficient:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Insight:</p>
                <p className="text-gray-300 leading-relaxed">
                  Pharmacists rely heavily on manual processes for inventory management and order tracking.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Impact:</p>
                <p className="text-gray-300 leading-relaxed">
                  There is a critical need for dynamic inventory management and order fulfillment tools.
                </p>
              </div>
              
              <p className="text-gray-300 italic mt-4">"Managing stock manually is exhausting—I've lost customers due to delays." – Pharmacist Participant</p>
            </div>
          </div>
          
          {/* Finding 2 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Finding 2</h3>
            <p className="text-lg font-semibold text-white mb-4">Digital Adoption Barriers for Pharmacies:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Insight:</p>
                <p className="text-gray-300 leading-relaxed">
                  Many pharmacy owners feel overwhelmed by the technical setup required to go online.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Impact:</p>
                <p className="text-gray-300 leading-relaxed">
                  Simplified onboarding workflows and dedicated support are essential for adoption.
                </p>
              </div>
              
              <p className="text-gray-300 italic mt-4">"I'm not familiar with digital tools—it feels like too much work." – Pharmacy Owner Participant</p>
            </div>
          </div>
          
          {/* Finding 3 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Finding 3</h3>
            <p className="text-lg font-semibold text-white mb-4">Customers Struggle With Navigation:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Insight:</p>
                <p className="text-gray-300 leading-relaxed">
                  Poor search functionality and complex checkout processes lead to frustration and drop-offs.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Impact:</p>
                <p className="text-gray-300 leading-relaxed">
                  Intuitive navigation and personalized search recommendations are top priorities.
                </p>
              </div>
              
              <p className="text-gray-300 italic mt-4">"It took me ages to find what I needed—the filters were confusing." – Customer Participant</p>
            </div>
          </div>
          
          {/* Finding 4 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Finding 4</h3>
            <p className="text-lg font-semibold text-white mb-4">Lack of Guidance Post-Rejection:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Insight:</p>
                <p className="text-gray-300 leading-relaxed">
                  Customers feel lost when prescriptions or orders are rejected due to incomplete information.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Impact:</p>
                <p className="text-gray-300 leading-relaxed">
                  Clear guidance and actionable steps are needed to rebuild trust and retain users.
                </p>
              </div>
              
              <p className="text-gray-300 italic mt-4">"I didn't know why my prescription was rejected or what to do next." – Customer Participant</p>
            </div>
          </div>
          
          {/* Finding 5 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Finding 5</h3>
            <p className="text-lg font-semibold text-white mb-4">Trust Issues With Digital Platforms:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Insight:</p>
                <p className="text-gray-300 leading-relaxed">
                  Privacy concerns are a significant barrier to adoption.
                </p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-2">Impact:</p>
                <p className="text-gray-300 leading-relaxed">
                  Transparent communication about data security and compliance is vital.
                </p>
              </div>
              
              <p className="text-gray-300 italic mt-4">"I'm worried about sharing my health data—how can I be sure it's secure?" – Customer Participant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
