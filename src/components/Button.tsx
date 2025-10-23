import { type AvatarStateOptions } from '../App';

const styles = {
  blue: 'hover:text-blue-500 hover:border-blue-400 hover:bg-stone-900',
  orange: 'hover:text-orange-500 hover:border-orange-400 hover:bg-stone-900',
  orangeSelected:
    'bg-linear-to-br from-orange-700 to-orange-400 border-orange-400 text-slate-900',
  purple: 'hover:text-purple-400 hover:border-purple-500 hover:bg-stone-900',
  purpleSelected:
    'bg-linear-to-br from-purple-700 to-purple-400 border-purple-400 text-slate-900',
  neutral: 'bg-transparent border-transparent p-0',
};

interface ButtonProps {
  avatarState?: string;
  onClick?: () => void;
  style: keyof typeof styles;
  children?: React.ReactNode;
}

export default function Button({
  avatarState = 'idle',
  onClick,
  style,
  children,
}: ButtonProps) {
  if (avatarState === 'idle') return null;

  return (
    <button onClick={onClick} className={styles[style]}>
      {children}
    </button>
  );
}
