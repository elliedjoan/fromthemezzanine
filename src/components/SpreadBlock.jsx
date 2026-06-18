import { Reveal } from './Reveal.jsx';

function Page({ page, side, title, onOpenPage, tileNumber }) {
  const pageLabel = page.imageAlt || `${title} ${side} page`;
  const tileNumberAttribute = tileNumber ? String(tileNumber) : undefined;

  if (page.variant === 'transparent-image') {
    return (
      <button
        type="button"
        className={`a5-page a5-page-${side} a5-page-transparent zoomable-page`}
        data-tile-number={tileNumberAttribute}
        aria-label={`Open ${pageLabel}`}
        onClick={() => onOpenPage({ image: page.image, alt: pageLabel })}
      >
        <img className="transparent-page-image" src={page.image} alt={page.imageAlt || ''} />
      </button>
    );
  }

  return (
    <article
      className={`a5-page a5-page-${side} ${page.image ? 'zoomable-page' : ''}`}
      role={page.image ? 'button' : undefined}
      tabIndex={page.image ? 0 : undefined}
      data-tile-number={tileNumberAttribute}
      aria-label={page.image ? `Open ${pageLabel}` : undefined}
      onClick={page.image ? () => onOpenPage({ image: page.image, alt: pageLabel }) : undefined}
      onKeyDown={
        page.image
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpenPage({ image: page.image, alt: pageLabel });
              }
            }
          : undefined
      }
    >
      <div className="page-content">
        {page.eyebrow && <p className="page-eyebrow">{page.eyebrow}</p>}
        {page.image && (
          <figure className="page-figure">
            <img src={page.image} alt={page.imageAlt || ''} />
          </figure>
        )}
        {page.text && <p className="page-text">{page.text}</p>}
      </div>
    </article>
  );
}

export function SpreadFrame({ block, onOpenPage, showTileNumbers, tileStartNumber }) {
  const leftTileNumber = showTileNumbers ? tileStartNumber : undefined;
  const rightTileNumber = showTileNumbers ? tileStartNumber + 1 : undefined;
  const toneClassName = block.tone ? ` spread-frame-${block.tone}` : '';

  return (
    <div className={`spread-frame${toneClassName}`} aria-label={block.title}>
      <Page
        page={block.leftPage}
        side="left"
        title={block.title}
        onOpenPage={onOpenPage}
        tileNumber={leftTileNumber}
      />
      <Page
        page={block.rightPage}
        side="right"
        title={block.title}
        onOpenPage={onOpenPage}
        tileNumber={rightTileNumber}
      />
    </div>
  );
}

export function SpreadBlock({ block, index, onOpenPage, showTileNumbers, tileStartNumber }) {
  return (
    <Reveal className="spread-block art-section" id={block.id} delay={index * 0.03}>
      {block.showTitle !== false && (
        <div className="spread-heading">
          <p className="section-kicker">{block.title}</p>
        </div>
      )}
      <SpreadFrame
        block={block}
        onOpenPage={onOpenPage}
        showTileNumbers={showTileNumbers}
        tileStartNumber={tileStartNumber}
      />
    </Reveal>
  );
}
