// components/ui/animated-section.tsx
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: string;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = "fadeInUp",
  className = "",
}: AnimatedSectionProps) {
  return (
    <div className={`animate-on-scroll ${className}`} data-animate={animation}>
      {children}
    </div>
  );
}

// components/ui/casino-card.tsx

interface CasinoCardProps {
  rank?: number;
  name?: string;
  features: string[];
  className?: string;
  isHighlighted?: boolean;
}

export function CasinoCard({
  rank,
  name,
  features,
  className = "",
  isHighlighted = false,
}: CasinoCardProps) {
  const textColor = isHighlighted ? "text-[rgb(97,218,251)]" : "text-sky-blue";

  return (
    <div className={`flex flex-col gap-1 mb-4 ${className}`}>
      <AnimatedSection>
        {rank && (
          <h3 className={textColor}>
            {rank}. {name}
          </h3>
        )}
      </AnimatedSection>
      <AnimatedSection>
        <ul className={isHighlighted ? "emoji-list" : ""}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </AnimatedSection>
    </div>
  );
}

// components/ui/section-header.tsx

interface SectionHeaderProps {
  title: string;
  emoji?: string;
  className?: string;
  before?: string;
  after?: string;
}

export function SectionHeader({
  title,
  emoji,
  before,
  after,
  className = "",
}: SectionHeaderProps) {
  return (
    <AnimatedSection>
      <h2
        className={`text-lighter-yellow text-2xl font-medium mt-10 ${className}`}
      >
        {emoji && `${emoji} `}
        {title}
      </h2>
    </AnimatedSection>
  );
}

// components/ui/feature-list.tsx

interface FeatureListProps {
  items: Array<{
    title?: string;
    description: string;
  }>;
  isHighlighted?: boolean;
  className?: string;
}

export function FeatureList({
  items,
  isHighlighted,
  className = "",
}: FeatureListProps) {
  return (
    <AnimatedSection>
      <ul
        className={`${isHighlighted ? "emoji-list" : ""} ${className}`.trim()}
      >
        {items.map((item, index) => (
          <li key={index}>
            {item.title && <strong>{item.title}:</strong>} {item.description}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}

// components/ui/quote-box.tsx

interface QuoteBoxProps {
  children: React.ReactNode;
  animation?: string;
}

export function QuoteBox({ children, animation = "fadeInUp" }: QuoteBoxProps) {
  return (
    <AnimatedSection animation={animation}>
      <blockquote className="p-4 my-4 border-s-4 border-lighter-yellow bg-lighter-yellow/5">
        {children}
      </blockquote>
    </AnimatedSection>
  );
}

// components/ui/promo-box.tsx

interface PromoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function PromoBox({ children, className = "" }: PromoBoxProps) {
  return (
    <AnimatedSection>
      <div className={`promo-box bg-cyan-600 p-4 rounded-xl my-2 ${className}`}>
        <p className="text-center font-bold">{children}</p>
      </div>
    </AnimatedSection>
  );
}
