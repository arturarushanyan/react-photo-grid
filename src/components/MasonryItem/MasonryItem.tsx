export interface MasonryItemProps {
  src: string;
  photographer: string;
}

const MasonryItem: React.FC<MasonryItemProps> = ({
  src,
  photographer,
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '8px',
    }}
  >
    <img
      src={src}
      alt={`Photo by ${photographer}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      loading="lazy"
    />
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '8px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
        color: 'white',
        fontSize: '14px',
      }}
    >
      Photo by {photographer}
    </div>
  </div>
);

export default MasonryItem;
