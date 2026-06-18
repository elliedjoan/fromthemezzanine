import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function PageLightbox({ page, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!page) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasPrevious) {
        onPrevious();
      } else if (event.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [page, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!page) return null;

  return (
    <motion.div
      className="page-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Zoomed page view"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClose}
    >
      <button type="button" className="page-lightbox-close" aria-label="Close" onClick={onClose} />
      <button
        type="button"
        className="page-lightbox-nav page-lightbox-nav-previous"
        aria-label="Previous tile"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        disabled={!hasPrevious}
      />
      <button
        type="button"
        className="page-lightbox-nav page-lightbox-nav-next"
        aria-label="Next tile"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        disabled={!hasNext}
      />
      <div className="page-lightbox-stage" onClick={(event) => event.stopPropagation()}>
        <img className="page-lightbox-image" src={page.image} alt={page.alt || ''} />
      </div>
    </motion.div>
  );
}
