import { useState, useEffect } from 'react';
import './Avatar.css';

type AvatarState = 'idle' | 'listening' | 'thinking';

interface AvatarProps {
  state: AvatarState;
}

export default function Avatar({ state }: AvatarProps) {
  const [displayState, setDisplayState] = useState<AvatarState>(state);

  useEffect(() => {
    setDisplayState(state);
  }, [state]);

  const getEyeClasses = () => {
    const baseClasses =
      'h-4 w-4 rounded-full bg-stone-900 transition-all duration-500 ease-out';
    switch (displayState) {
      case 'idle':
        return `${baseClasses} max-h-2 w-5`;
      case 'listening':
        return `${baseClasses} `;
      case 'thinking':
        return `${baseClasses} mt-5`;
      default:
        return `${baseClasses} h-2 w-2 bg-orange-300`;
    }
  };

  const getMouthClasses = () => {
    const baseClasses =
      'bg-orange-400 rounded-full transition-all duration-700 ease-out';
    switch (displayState) {
      case 'idle':
        return `${baseClasses} w-12 border-2 bg-blue-300`;
      case 'listening':
        return `${baseClasses} animate-listening border-2 border-black`;
      case 'thinking':
        return `${baseClasses} border-2 w-8 h-5 rounded-t-none bg-purple-400 animate-bounce-middle rotate-5`;
      default:
        return `${baseClasses} w-6`;
    }
  };

  const getContainerClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    switch (displayState) {
      case 'idle':
        return `${baseClasses} bg-white/20 border-white/10 shadow-md`;
      case 'listening':
        return `${baseClasses} bg-orange-500/20 border-orange-300/30 shadow-lg shadow-orange-400/20 animate-glow-orange`;
      case 'thinking':
        return `${baseClasses} bg-purple-500/20 border-purple-300/30 shadow-lg shadow-purple-400/20 animate-glow-purple`;
      default:
        return `${baseClasses} bg-white/20 border-white/10 shadow-md`;
    }
  };

  const getStatusText = () => {
    switch (displayState) {
      case 'idle':
        return 'Idle';
      case 'listening':
        return 'Listening...';
      case 'thinking':
        return 'Thinking...';
      default:
        return 'Idle';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-2">
      {/* Avatar Container */}
      <div
        className={`bg-white/30 backdrop-blur-sm h-32 w-56 rounded-lg shadow-md border-2 border-white/10 ${getContainerClasses()}`}
      >
        <div
          className={`h-full w-full flex flex-col items-center justify-center gap-2 ${
            displayState === 'idle' ? 'animate-gentle-float' : ''
          }`}
        >
          {/* Eyes */}
          <div className="flex gap-16">
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
              <div
                className={`${getEyeClasses()} ${
                  displayState === 'thinking' ? 'animate-bounce-left' : ''
                }`}
              />
            </div>
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center">
              <div
                className={`${getEyeClasses()} ${
                  displayState === 'thinking' ? 'animate-bounce-right' : ''
                }`}
              />
            </div>
          </div>

          {/* Mouth */}
          <div className="mt-2">
            <div className={getMouthClasses()} />
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full transition-colors duration-500 ${
            displayState === 'idle'
              ? 'bg-blue-300'
              : displayState === 'listening'
              ? 'bg-orange-400 animate-pulse'
              : 'bg-purple-400 animate-bounce'
          }`}
        />
        <span className="text-sm font-medium text-white/80">
          {getStatusText()}
        </span>
      </div>
    </div>
  );
}
