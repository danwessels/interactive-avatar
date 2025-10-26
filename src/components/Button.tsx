const styles = {
  base: 'p-2 border-2 border-white/30 rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50',
  blue: 'hover:text-blue-500 hover:border-blue-400 hover:bg-stone-900',
  orange: 'hover:text-orange-500 hover:border-orange-400 hover:bg-stone-900',
  orangeSelected:
    'bg-linear-to-br from-orange-700 to-orange-400 border-orange-400 text-slate-900',
  purple: 'hover:text-purple-400 hover:border-purple-500 hover:bg-stone-900',
  purpleSelected:
    'bg-linear-to-br from-purple-700 to-purple-400 border-purple-400 text-slate-900',
};

interface ButtonProps {
  avatarState?: string;
  onClick?: () => void;
  style: keyof typeof styles;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export default function Button({
  avatarState = 'idle',
  onClick,
  style,
  children,
  ariaLabel,
}: ButtonProps) {
  if (avatarState === 'idle') return null;

  return (
    <button
      onClick={onClick}
      className={`${styles.base} ${styles[style]}`}
      aria-label={ariaLabel}
      aria-pressed={style.includes('Selected')}
    >
      {children}
    </button>
  );
}
