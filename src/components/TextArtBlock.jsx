import { Reveal } from './Reveal.jsx';

export function TextArtBlock({ block, index }) {
  const isArtLeft = block.layout === 'art-left';

  return (
    <Reveal className="text-art-block art-section" id={block.id} delay={index * 0.03}>
      <div className={`text-art-inner ${isArtLeft ? 'is-art-left' : 'is-text-left'}`}>
        <figure className="text-art-image">
          <img src={block.image} alt={block.imageAlt || ''} />
        </figure>
        <div className="text-art-copy">
          {block.kicker && <p className="section-kicker">{block.kicker}</p>}
          <h2>{block.heading}</h2>
          {block.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
