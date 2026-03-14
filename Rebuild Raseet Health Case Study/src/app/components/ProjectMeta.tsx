export function ProjectMeta() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Client</h3>
            <p className="text-gray-900">Raseet</p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tools</h3>
            <p className="text-gray-900">Figma, Miro, Adobe Creative Suite</p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Expertise</h3>
            <ul className="text-gray-900 space-y-1">
              <li>• UX Research</li>
              <li>• End to end Product Design</li>
              <li>• UX/UI Design</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Timeline</h3>
            <p className="text-gray-900">2021 - 2022</p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">responsibilites</h3>
            <p className="text-gray-900">Brainstorming, UX Design, Prototyping, Visual Design, Design Systems</p>
          </div>
        </div>
      </div>
    </section>
  );
}