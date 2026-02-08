import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant = 'up' | 'up-slow' | 'fade' | 'scale';

interface AnimateInProps {
  children: ReactNode;
  variant?: Variant;
  rootMargin?: string;
  stagger?: `stagger-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  up: 'animate-in-up',
  'up-slow': 'animate-in-up-slow',
  fade: 'animate-in-fade',
  scale: 'animate-in-scale',
};

export function AnimateIn({
  children,
  variant = 'up',
  rootMargin = '0px 0px -48px 0px',
  stagger,
  className = '',
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const baseClass = variantClass[variant];
  const classes = [baseClass, inView ? 'in-view' : '', stagger || '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
