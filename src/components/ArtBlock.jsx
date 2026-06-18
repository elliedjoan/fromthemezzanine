import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal.jsx';

export function ArtBlock({ block, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal className="art-block art-section" id={block.id} delay={index * 0.03}>
      <figure className="artwork-figure">
        <motion.img
          src={block.image}
          alt={block.imageAlt || ''}
          initial={shouldReduceMotion ? false : { y: 0 }}
          whileInView={shouldReduceMotion ? undefined : { y: [-3, 3, -1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    </Reveal>
  );
}
