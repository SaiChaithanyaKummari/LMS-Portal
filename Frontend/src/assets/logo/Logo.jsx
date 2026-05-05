const Logo = ({ size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" rx="10" fill="#6C63FF" />
        <rect x="10" y="22" width="14" height="14" rx="3" fill="#fff" opacity="0.15" />
        <rect x="10" y="10" width="14" height="24" rx="3" fill="#fff" />
        <rect x="26" y="22" width="8" height="12" rx="2" fill="#A89CFF" />
        <circle cx="33" cy="13" r="4" fill="#FFD700" />
        <path d="M30 13 L33 10 L36 13" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Logo;