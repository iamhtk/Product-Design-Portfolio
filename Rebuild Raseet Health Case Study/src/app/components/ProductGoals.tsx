export function ProductGoals() {
  return (
    <section className="py-20 px-6 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Product Goals</h2>
        
        <p className="text-lg font-semibold text-gray-900 mb-8">Product Goals: Sort Qualitative Feedback</p>
        
        <p className="text-gray-700 leading-relaxed mb-12">
          The success of Raseet Health depended on aligning business objectives with user needs, ensuring a seamless and scalable experience for all stakeholders. By analyzing research insights and market trends, we defined three core product goals:
        </p>
        
        <div className="space-y-12">
          {/* Business Goals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Goals:</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#1</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Seamless integration between stakeholders:</strong> Establish a connected ecosystem where pharmacies, healthcare providers, and customers interact efficiently.
                </p>
              </div>
              
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#2</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Easier onboarding for partner pharmacies:</strong> Reduce technical barriers, enabling small to mid-sized pharmacies to transition into e-commerce-ready businesses with minimal effort.
                </p>
              </div>
            </div>
          </div>
          
          {/* User Goals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">User Goals:</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#1</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Easy refill prescription scheduling:</strong> Allow customers to set automated refills, reducing friction in managing recurring medications.
                </p>
              </div>
              
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#2</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Easy inventory management:</strong> Enable pharmacies to track stock levels, receive alerts for low inventory, and optimize order fulfillment.
                </p>
              </div>
            </div>
          </div>
          
          {/* Shared Goals */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Shared Goals (User + Business):</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#1</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Online access to medicines/storefront:</strong> Provide a reliable digital storefront, making healthcare products more accessible while driving pharmacy revenue.
                </p>
              </div>
              
              <div>
                <p className="text-lg font-bold text-[#E63946] mb-2">#2</p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Better health outcomes:</strong> Improve medication adherence and patient engagement by offering a user-friendly and trustworthy healthcare platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mt-12">
          These goals shaped the <strong>design decisions</strong>, guiding the development of a frictionless user experience that balanced operational efficiency with user-centric healthcare services.
        </p>
      </div>
    </section>
  );
}
