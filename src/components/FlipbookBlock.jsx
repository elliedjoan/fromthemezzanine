import { Reveal } from './Reveal.jsx';
import { SpreadFrame } from './SpreadBlock.jsx';

export function FlipbookBlock({
  entry,
  activeIndex,
  total,
  onPrevious,
  onNext,
  onOpenPage,
  showTileNumbers,
}) {
  if (!entry) return null;

  const { block, tileStartNumber } = entry;

  return (
    <Reveal className="flipbook-block art-section" id="reader">
      <div className="flipbook-stage">
        <button
          className="flipbook-nav flipbook-nav-previous"
          type="button"
          aria-label="Previous spread"
          onClick={onPrevious}
          disabled={activeIndex <= 0}
        />
        <div className="flipbook-spread-shell" key={block.id}>
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
        </div>
        <button
          className="flipbook-nav flipbook-nav-next"
          type="button"
          aria-label="Next spread"
          onClick={onNext}
          disabled={activeIndex >= total - 1}
        />
      </div>
    </Reveal>
  );
}
