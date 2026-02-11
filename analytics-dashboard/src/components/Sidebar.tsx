import { Home, Plus } from 'lucide-react'

interface SidebarProps {
  activeSection: 'overview' | 'funnels' | 'ab-tests'
  onSectionChange: (section: 'overview' | 'funnels' | 'ab-tests') => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'overview' as const, label: 'Overview', icon: Home },
    { id: 'funnels' as const, label: 'Funnels', icon: Plus },
    { id: 'ab-tests' as const, label: 'A/B Tests', icon: Plus },
  ]

  return (
    <div className="w-64 bg-dark-sidebar border-r border-dark-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <h1 className="text-xl font-semibold text-white">Analytics</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                ${isActive 
                  ? 'bg-dark-hover text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-card'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.id !== 'overview' && (
                <Plus className="w-4 h-4 ml-auto opacity-50" />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
