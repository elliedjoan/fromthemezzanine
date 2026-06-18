import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ as = 'section', children, className = '', id, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.section;

  return (
    <Component
      id={id}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
