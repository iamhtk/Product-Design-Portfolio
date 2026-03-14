export function InsightsGlance() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Insights at a Glance??</h2>
        
        <div className="space-y-8 mb-12">
          {/* Insight #1 */}
          <div>
            <p className="text-xl font-bold text-[#E63946] mb-3">#1</p>
            <p className="text-gray-700 leading-relaxed">
              "Managing stock manually is exhausting—I've lost customers due to delays." – Pharmacist
            </p>
          </div>
          
          {/* Insight #2 */}
          <div>
            <p className="text-xl font-bold text-[#E63946] mb-3">#2</p>
            <p className="text-gray-700 leading-relaxed">
              "It took me ages to find what I needed—the filters were confusing." – Customer Participant
            </p>
          </div>
          
          {/* Insight #3 */}
          <div>
            <p className="text-xl font-bold text-[#E63946] mb-3">#3</p>
            <p className="text-gray-700 leading-relaxed">
              "I'm worried about sharing my health data—how can I be sure it's secure?" – Customer Participant
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          These insights served as a valuable tool to identify opportunities for introducing a potential solution.
        </p>
      </div>
    </section>
  );
}
