import { useState } from 'react'
import { ChevronDown, Home, Folder } from 'lucide-react'

interface Page {
  name: string
  count: number
}

interface PagesTableProps {
  pages: Page[]
  loading?: boolean
}

const iconMap = {
  home: Home,
  folder: Folder,
}

function getIconForPage(pageName: string) {
  const lower = pageName.toLowerCase()
  if (lower === 'home' || lower === '/' || lower === '') return Home
  return Folder
}

export default function PagesTable({ pages, loading }: PagesTableProps) {
  const [selectedPage, setSelectedPage] = useState<string | null>(null)

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Pages</h3>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-dark-hover border border-dark-border rounded text-sm text-gray-300 hover:bg-dark-border transition-colors">
          <span>All</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      
      <div className="space-y-1">
        {loading && pages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Loading pages...</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No data available</div>
        ) : (
          pages.map((page, index) => {
            const Icon = getIconForPage(page.name)
            const isSelected = selectedPage === page.name
          
          return (
            <button
              key={index}
              onClick={() => setSelectedPage(page.name)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isSelected 
                  ? 'bg-dark-hover' 
                  : 'hover:bg-dark-hover'
                }
              `}
            >
              <Icon className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-left text-sm text-white truncate">{page.name}</span>
              <span className="text-sm text-gray-400">{page.count}</span>
            </button>
          )
        }))}
      </div>
    </div>
  )
}
