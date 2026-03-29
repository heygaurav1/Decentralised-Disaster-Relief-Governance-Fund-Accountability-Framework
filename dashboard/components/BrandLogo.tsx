export function BrandLogo({ className = "w-6 h-6", color = "#F45A2C" }: { className?: string, color?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 80 C 40 91.046 31.046 100 20 100 C 8.954 100 0 91.046 0 80 L 0 50 C 0 38.954 8.954 30 20 30 C 31.046 30 40 38.954 40 50 Z" />
      <path d="M70 70 C 70 81.046 61.046 90 50 90 C 38.954 90 30 81.046 30 70 L 30 20 C 30 8.954 38.954 0 50 0 C 61.046 0 70 8.954 70 20 Z" />
      <path d="M100 60 C 100 71.046 91.046 80 80 80 C 68.954 80 60 71.046 60 60 L 60 40 C 60 28.954 68.954 20 80 20 C 91.046 20 100 28.954 100 40 Z" />
    </svg>
  );
}
