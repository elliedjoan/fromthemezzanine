import { Reveal } from './Reveal.jsx';

const sourceSize = {
  width: 2000,
  height: 1414,
};

const hoverSprites = {
  introduction: { x: 280, y: 154, width: 259, height: 59 },
  'epigenetics-egg-spoon-race': { x: 280, y: 220, width: 481, height: 64 },
  'epigenetics-extension': { x: 280, y: 290, width: 351, height: 66 },
  'warm-anchors': { x: 280, y: 361, width: 285, height: 64 },
  'but-we-were-beautiful': { x: 280, y: 433, width: 389, height: 62 },
  'lament-wet-cement': { x: 280, y: 504, width: 417, height: 60 },
  'why-are-mayflies-marching': { x: 280, y: 575, width: 524, height: 59 },
  'not-sure-forward-fast': { x: 280, y: 647, width: 507, height: 56 },
  'salute-living-dust': { x: 280, y: 718, width: 380, height: 55 },
  'el-old-empire': { x: 280, y: 790, width: 104, height: 53 },
  'flower-assets': { x: 280, y: 861, width: 275, height: 51 },
  'slaves-to-us-too': { x: 280, y: 932, width: 292, height: 50 },
  'the-ants': { x: 280, y: 1004, width: 193, height: 48 },
  'expired-treaty': { x: 280, y: 1075, width: 280, height: 46 },
  'expired-treaty-window': { x: 280, y: 1147, width: 199, height: 44 },
  'window-in-the-fog': { x: 280, y: 1218, width: 322, height: 43 },
  'derobe-for-the-stars': { x: 1353, y: 152, width: 398, height: 57 },
  'celestial-caesar': { x: 1405, y: 221, width: 345, height: 60 },
  'loyal-metronome': { x: 1399, y: 290, width: 351, height: 62 },
  'oh-wise-one': { x: 1490, y: 360, width: 260, height: 64 },
  'petals-despite-it-all': { x: 1374, y: 429, width: 375, height: 66 },
  'worn-out-velvet': { x: 1420, y: 500, width: 330, height: 66 },
  'faux-fucks-big-light': { x: 1323, y: 572, width: 427, height: 64 },
  'this-diner': { x: 1523, y: 643, width: 227, height: 62 },
  'faceless-facades': { x: 1348, y: 715, width: 401, height: 60 },
  'pick-axes-putty-advice': { x: 1205, y: 786, width: 546, height: 58 },
  'quantum-entanglement-faded-love': { x: 1119, y: 857, width: 631, height: 57 },
  'can-people-change': { x: 1364, y: 929, width: 386, height: 55 },
  'i-set-sail': { x: 1534, y: 1000, width: 216, height: 53 },
  'my-sighs-are-light': { x: 1394, y: 1072, width: 356, height: 50 },
  'rubiks-cube-raft': { x: 1409, y: 1143, width: 341, height: 49 },
  'from-the-mezzanine-closing': { x: 1366, y: 1214, width: 383, height: 48 },
};

function getLinkStyle(link) {
  const sprite = hoverSprites[link.targetId];

  if (!sprite) return undefined;

  return {
    '--toc-link-left': `${(sprite.x / sourceSize.width) * 100}%`,
    '--toc-link-top': `${(sprite.y / sourceSize.height) * 100}%`,
    '--toc-link-width': `${(sprite.width / sourceSize.width) * 100}%`,
    '--toc-link-height': `${(sprite.height / sourceSize.height) * 100}%`,
  };
}

export function TableOfContentsBlock({ contents, onSelectTarget }) {
  const hoverImagePrefix = contents.hoverImagePrefix || '/art/toc-hover-';

  return (
    <Reveal className="toc-block toc-block-landscape art-section" id="contents">
      <h2 className="visually-hidden">{contents.title}</h2>
      <div className="toc-landscape-frame" aria-label={contents.title}>
        <img className="toc-landscape-image" src={contents.image} alt={contents.alt} />
        <nav className="toc-link-layer" aria-label="Table of contents links">
          {contents.links.map((link) => (
            <a
              key={`${link.side}-${link.row}-${link.targetId}`}
              className={`toc-title-link toc-title-link-${link.side}`}
              data-target-id={link.targetId}
              href={`?section=${link.targetId}#reader`}
              style={getLinkStyle(link)}
              aria-label={`Go to ${link.title}`}
              onClick={
                onSelectTarget
                  ? (event) => {
                      event.preventDefault();
                      onSelectTarget(link.targetId);
                    }
                  : undefined
              }
            >
              <img
                className="toc-title-hover-image"
                src={`${hoverImagePrefix}${link.targetId}.png`}
                alt=""
                aria-hidden="true"
              />
            </a>
          ))}
        </nav>
      </div>
    </Reveal>
  );
}
