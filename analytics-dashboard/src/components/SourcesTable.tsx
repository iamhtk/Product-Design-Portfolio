import { useState } from 'react'
import { ChevronDown, Linkedin, Globe, Search } from 'lucide-react'

interface Source {
  name: string
  count: number
}

interface SourcesTableProps {
  sources: Source[]
  loading?: boolean
}

const iconMap: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  google: Search,
  direct: Globe,
}

function getIconForSource(sourceName: string) {
  const lower = sourceName.toLowerCase()
  if (lower.includes('linkedin')) return Linkedin
  if (lower.includes('google')) return Search
  return Globe
}

export default function SourcesTable({ sources, loading }: SourcesTableProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Sources</h3>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-dark-hover border border-dark-border rounded text-sm text-gray-300 hover:bg-dark-border transition-colors">
          <span>Referrer</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      
      <div className="space-y-1">
        {loading && sources.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Loading sources...</div>
        ) : sources.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No data available</div>
        ) : (
          sources.map((source, index) => {
            const Icon = getIconForSource(source.name)
            const isSelected = selectedSource === source.name
          
          return (
            <button
              key={index}
              onClick={() => setSelectedSource(source.name)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isSelected 
                  ? 'bg-dark-hover' 
                  : 'hover:bg-dark-hover'
                }
              `}
            >
              <Icon className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-left text-sm text-white">{source.name}</span>
              <span className="text-sm text-gray-400">{source.count}</span>
            </button>
          )
        }))}
      </div>
    </div>
  )
}
