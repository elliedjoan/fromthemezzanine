import { SpreadFrame } from './SpreadBlock.jsx';

export function ReaderBlock({
  entries,
  pages,
  mode,
  activeIndex,
  onModeChange,
  onOpenPage,
  showTileNumbers,
}) {
  const firstPageNumber = pages[0]?.tileNumber ?? 1;
  const lastPageNumber = pages.at(-1)?.tileNumber ?? pages.length;
  const activePageStart = entries[activeIndex]?.tileStartNumber ?? firstPageNumber;
  const activePageEnd = Math.min(activePageStart + 1, lastPageNumber);
  const formatPageNumber = (number) => String(number).padStart(2, '0');
  const progressText = mode === 'overview'
    ? `${formatPageNumber(firstPageNumber)}–${formatPageNumber(lastPageNumber)}`
    : `${formatPageNumber(activePageStart)}–${formatPageNumber(activePageEnd)} / ${formatPageNumber(lastPageNumber)}`;

  return (
    <section className={`reader-block reader-block-${mode}`} id="reader" aria-label="Artwork reader">
      <div className="reader-toolbar">
        <div className="reader-mode-switch" aria-label="Artwork view">
          <button
            type="button"
            className={mode === 'overview' ? 'is-active' : ''}
            aria-pressed={mode === 'overview'}
            onClick={() => onModeChange('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={mode === 'reader' ? 'is-active' : ''}
            aria-pressed={mode === 'reader'}
            onClick={() => onModeChange('reader')}
          >
            Reader
          </button>
        </div>
        <p className="reader-progress" aria-live="polite">
          {progressText}
        </p>
      </div>

      {mode === 'reader' ? (
        <div className="reader-feed">
          {entries.map(({ block, tileStartNumber }, index) => (
            <article
              className="reader-spread"
              id={block.id}
              data-spread-index={index}
              key={block.id}
            >
              {block.showTitle !== false && <h2 className="reader-spread-title">{block.title}</h2>}
              <SpreadFrame
                block={block}
                onOpenPage={onOpenPage}
                showTileNumbers={showTileNumbers}
                tileStartNumber={tileStartNumber}
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="overview-grid">
          {pages.map((page) => (
            <button
              type="button"
              className="overview-page"
              key={`${page.blockId}-${page.side}`}
              aria-label={`Open ${page.alt}`}
              onClick={() => onOpenPage(page)}
            >
              <img src={page.image} alt={page.alt} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
