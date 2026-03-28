interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  isDark?: boolean;
}

export function QuoteBlock({ quote, attribution, isDark = false }: QuoteBlockProps) {
  return (
    <div className={`my-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <p className="text-lg leading-relaxed italic">
        "{quote}"
      </p>
      {attribution && (
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}> {attribution}</p>
      )}
    </div>
  );
}