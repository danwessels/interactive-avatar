const styles = {
  base: 'p-2 grow shadow-md max-w-17 border-2 rounded-xl transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50 flex items-center justify-center',
  blue: 'hover:text-blue-500 hover:border-blue-400 hover:bg-slate-900',
  orange: 'hover:text-orange-500 hover:border-orange-400 hover:bg-slate-900',
  orangeSelected:
    'bg-linear-to-br from-orange-700 to-orange-400 border-orange-400 text-slate-900',
  purple: 'hover:text-purple-400 hover:border-purple-400 hover:bg-slate-900',
  purpleSelected:
    'bg-purple-400 border-purple-300 text-slate-900 inset-shadow-sm inset-shadow-purple-300',
  minimal:
    'bg-transparent border-none hover:bg-white/10 text-slate-900 rounded-full shadow-none',
};

interface ButtonProps {
  onClick?: () => void;
  style: keyof typeof styles;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export default function Button({
  onClick,
  style,
  children,
  ariaLabel,
}: ButtonProps) {
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
