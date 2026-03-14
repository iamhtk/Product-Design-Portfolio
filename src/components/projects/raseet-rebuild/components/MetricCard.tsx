interface MetricCardProps {
  value: string;
  description: string;
  isDark?: boolean;
}

export function MetricCard({ value, description, isDark = false }: MetricCardProps) {
  return (
    <div className="text-left">
      <div className="text-5xl font-bold mb-3 text-[#E63946]">
        {value}
      </div>
      <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {description}
      </p>
    </div>
  );
}