export function Retrospective() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Retrospective</h2>
        
        {/* Empathy-Driven Design */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Empathy-Driven Design</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            The iterative design process, grounded in user feedback, ensured that the platform met the unique needs of pharmacists, healthcare providers, and customers.
          </p>
          <p className="text-gray-700 italic">
            "The changes make it so much easier to manage everything—my staff and I feel more confident now." – Pharmacist Participant
          </p>
        </div>
        
        {/* Importance of Simplicity */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Importance of Simplicity</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Simplified workflows and intuitive interfaces reduced onboarding barriers and user frustration.</li>
            <li>• Streamlined experiences, like the improved checkout process, significantly boosted user satisfaction and engagement.</li>
          </ul>
        </div>
        
        {/* Leveraging Ecosystem Synergy */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Leveraging Ecosystem Synergy</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Integrating tools and features within the Raseet Health ecosystem enhanced its value proposition for both users and the business.</li>
            <li>• Example: The seamless connection between inventory management and customer-facing features created a cohesive experience.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
