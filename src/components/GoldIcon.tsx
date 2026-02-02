const GoldIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F5D061" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      {/* Gold bar base */}
      <path
        d="M8 40L16 24H48L56 40V48L48 56H16L8 48V40Z"
        fill="url(#goldGradient)"
        stroke="url(#goldDark)"
        strokeWidth="1.5"
      />
      {/* Top face */}
      <path
        d="M16 24L24 16H40L48 24H16Z"
        fill="#F5D061"
        stroke="url(#goldDark)"
        strokeWidth="1"
      />
      {/* Side highlight */}
      <path
        d="M8 40L16 24L16 48L8 48V40Z"
        fill="url(#goldDark)"
        opacity="0.6"
      />
      {/* Shine */}
      <ellipse
        cx="32"
        cy="20"
        rx="8"
        ry="2"
        fill="white"
        opacity="0.3"
      />
    </svg>
  );
};

export default GoldIcon;
