const dividerImages = ['/art/spread-divider-01.png', '/art/spread-divider-02.png'];

export function SpreadDivider({ index }) {
  const image = dividerImages[index % dividerImages.length];

  return (
    <div className="spread-divider" aria-hidden="true">
      <img src={image} alt="" className="spread-divider-image" />
    </div>
  );
}
