/** Color-forward garment silhouettes for items without photos. */
export default function GarmentVisual({ category, color, className }) {
  const fill = color || '#C4B8A8'
  const stroke = 'rgba(26,26,26,0.35)'

  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="120" height="140" fill="transparent" />
      {category === 'tops' && (
        <path
          d="M28 34 L45 22 L60 30 L75 22 L92 34 L82 48 L82 118 L38 118 L38 48 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      )}
      {category === 'bottoms' && (
        <path
          d="M40 22 H80 V55 L92 122 H68 L60 70 L52 122 H28 L40 55 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      )}
      {category === 'dresses' && (
        <path
          d="M42 20 L58 28 L78 20 L88 36 L80 48 L96 122 H24 L40 48 L32 36 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      )}
      {category === 'outerwear' && (
        <path
          d="M22 30 L42 18 L60 28 L78 18 L98 30 L90 46 V122 H68 V70 H52 V122 H30 V46 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      )}
      {category === 'shoes' && (
        <path
          d="M28 78 C40 62, 70 62, 86 74 L98 82 C102 86, 100 94, 92 94 H30 C22 94, 20 86, 28 78 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
      )}
      {category === 'accessories' && (
        <>
          <circle cx="60" cy="58" r="22" fill="none" stroke={fill} strokeWidth="8" />
          <circle cx="60" cy="58" r="10" fill="none" stroke={stroke} strokeWidth="1.5" />
        </>
      )}
      {!['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'].includes(category) && (
        <rect x="30" y="30" width="60" height="80" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
      )}
    </svg>
  )
}
