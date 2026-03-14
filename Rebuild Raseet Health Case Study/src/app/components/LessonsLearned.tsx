export function LessonsLearned() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Lessons Learned?</h2>
        
        <div className="space-y-10">
          {/* Lesson 1 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Continuous Feedback Is Key</h3>
            <p className="text-gray-700 leading-relaxed">
              Regular usability testing and feedback loops were instrumental in identifying areas for improvement and driving iterative changes.
            </p>
          </div>
          
          {/* Lesson 2 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Localized Solutions Matter</h3>
            <p className="text-gray-700 leading-relaxed">
              Localized onboarding guides and multilingual support helped expand adoption in diverse regions.
            </p>
          </div>
          
          {/* Lesson 3 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Trust Is Foundational</h3>
            <p className="text-gray-700 leading-relaxed">
              Transparent communication about data privacy and security built confidence among users, addressing one of the biggest barriers to digital adoption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
