import { ArtBlock } from './ArtBlock.jsx';
import { SpreadBlock } from './SpreadBlock.jsx';
import { TextArtBlock } from './TextArtBlock.jsx';

export function BlockRenderer({ block, index, onOpenPage, showTileNumbers, tileStartNumber }) {
  switch (block.type) {
    case 'art':
      return <ArtBlock block={block} index={index} />;
    case 'spread':
      return (
        <SpreadBlock
          block={block}
          index={index}
          onOpenPage={onOpenPage}
          showTileNumbers={showTileNumbers}
          tileStartNumber={tileStartNumber}
        />
      );
    case 'text-art':
      return <TextArtBlock block={block} index={index} />;
    default:
      return null;
  }
}
