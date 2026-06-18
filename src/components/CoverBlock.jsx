import { motion, useReducedMotion } from 'framer-motion';

export function CoverBlock({ cover }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="cover-block" aria-label={cover.title}>
      <motion.img
        className="cover-artwork"
        src={cover.image}
        alt={cover.alt}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </section>
  );
}
