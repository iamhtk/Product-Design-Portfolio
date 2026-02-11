import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  const [activeSection, setActiveSection] = useState<'overview' | 'funnels' | 'ab-tests'>('overview')

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Dashboard activeSection={activeSection} />
    </div>
  )
}

export default App
