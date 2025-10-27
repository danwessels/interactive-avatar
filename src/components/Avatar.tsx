import { useState, useEffect } from 'react';
import './Avatar.css';

type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

const styles = {
  container: 'flex flex-col items-center gap-2',
  outerButton: `bg-white/30 border-white/10 inset-shadow-md inset-shadow-white/30 backdrop-blur-sm h-35 w-56 max-w-full rounded-xl shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50`,
  innerContent: `h-full w-full flex flex-col items-center justify-center gap-2`,
  innerContentAnimated: `h-full w-full flex flex-col items-center justify-center gap-2 animate-gentle-float`,
  eyeContainer: 'flex gap-16',
  eyeWrapper: 'relative w-8 h-8 rounded-full flex items-center justify-center',
  mouthWrapper: 'mt-2',
  statusContainer: 'flex flex-col items-center gap-4 mt-4',
};

interface AvatarProps {
  state: AvatarState;
  onClick?: () => void;
}

export default function Avatar({ state, onClick }: AvatarProps) {
  const [displayState, setDisplayState] = useState<AvatarState>(state);

  useEffect(() => {
    setDisplayState(state);
  }, [state]);

  const getEyeClasses = () => {
    const baseClasses =
      'h-4 w-4 rounded-full bg-stone-900 transition-all duration-500 ease-out';

    if (displayState === 'idle') {
      return `${baseClasses} max-h-2 w-5`;
    }

    return baseClasses;
  };

  const getMouthClasses = () => {
    const baseClasses =
      'border-2 border-black rounded-full transition-all duration-700 ease-out';
    switch (displayState) {
      case 'idle':
        return `${baseClasses} w-12 bg-blue-300`;
      case 'listening':
        return `${baseClasses} w-8 h-4 rounded-t-none bg-orange-400`;
      case 'speaking':
        return `${baseClasses} animate-listening bg-pink-400`;
      case 'thinking':
        return `${baseClasses} w-8 h-5 rounded-t-none bg-pink-400 animate-bounce-middle rotate-5`;
      default:
        return `${baseClasses} w-6`;
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'transition-all ';
    switch (displayState) {
      case 'idle':
        return `${baseClasses} animate-glow-blue`;
      case 'listening':
        return `${baseClasses}`;
      case 'thinking':
        return `${baseClasses} animate-glow-purple`;
      case 'speaking':
        return `${baseClasses} animate-glow-purple`;
      default:
        return `${baseClasses} bg-white/20 border-white/10 shadow-md`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={`rounded-xl ${getContainerClasses()}`}>
        <button
          onClick={onClick}
          className={styles.outerButton}
          aria-label="Click to wake up Lil' Buddy for assistance"
        >
          <div
            className={
              displayState === 'idle' || displayState === 'listening'
                ? styles.innerContentAnimated
                : styles.innerContent
            }
          >
            {/* Eyes */}
            <div className={styles.eyeContainer}>
              <div className={styles.eyeWrapper}>
                <div
                  className={`${getEyeClasses()} ${
                    displayState === 'thinking' ? 'animate-bounce-left' : ''
                  }`}
                />
              </div>
              <div className={styles.eyeWrapper}>
                <div
                  className={`${getEyeClasses()} ${
                    displayState === 'thinking' ? 'animate-bounce-right' : ''
                  }`}
                />
              </div>
            </div>

            {/* Mouth */}
            <div className={styles.mouthWrapper}>
              <div className={getMouthClasses()} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
