import { useState, useEffect } from 'react';
import {
  MoonIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import Avatar from './components/Avatar';
import Button from './components/Button';
import Settings from './components/Settings';
import Chat from './components/Chat';
import backgroundImage from './assets/johny-goerend-Oz2ZQ2j8We8-unsplash.jpg';

export type AvatarStateOptions = 'idle' | 'listening' | 'thinking' | 'speaking';
export type SelectedView = 'idle' | 'awake' | 'chat' | 'settings';

const styles = {
  backgroundContainer:
    'text-center w-screen h-screen overflow-auto p-4 bg-cover',
  mainContainer:
    'h-full rounded-xl relative max-w-90 w-full m-auto p-2 border-2 border-transparent',
  controlsWrapper: 'flex flex-col-reverse sm:flex-row gap-3 pb-4',
  navigationButtons:
    'flex flex-row transition duration-300 sm:flex-col gap-2 sm:gap-1 justify-center sm:justify-between items-center left-2',
  navigationButtonsHidden: 'opacity-0',
  navigationButtonsVisible: 'opacity-100',
  iconSize: 'h-6 w-6',
  viewContainer:
    'max-h-110 overflow-hidden backdrop-blur-sm rounded-xl shadow-md border-2 border-white/10 inset-shadow-md inset-shadow-white/10 space-y-4 h-full flex flex-col',
};

function App() {
  const [avatarState, setAvatarState] = useState<AvatarStateOptions>('idle');
  const [selectedView, setSelectedView] = useState<SelectedView>('idle');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        if (selectedView === 'awake') {
          setSelectedView('idle');
          setAvatarState('idle');
        } else {
          setSelectedView('awake');
        }
      }
      if (e.key === 'c' || e.key === 'C') setSelectedView('chat');
      if (e.key === 's' || e.key === 'S') setSelectedView('settings');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedView, setSelectedView]);

  function onClickChat() {
    setSelectedView('chat');
    setAvatarState('listening');
  }

  function onClickSettings() {
    setSelectedView('settings');
    setAvatarState('listening');
  }

  function onClickIdle() {
    setSelectedView('idle');
    setAvatarState('idle');
  }

  function onClickWake() {
    setSelectedView('awake');
    setAvatarState('listening');
  }

  return (
    <>
      <div
        className={styles.backgroundContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.mainContainer}>
          <div className={styles.controlsWrapper}>
            <div
              className={`${
                selectedView === 'idle'
                  ? styles.navigationButtonsHidden
                  : styles.navigationButtonsVisible
              } ${styles.navigationButtons}`}
              role="navigation"
              aria-label="Main navigation"
            >
              <Button
                onClick={onClickIdle}
                style="purple"
                ariaLabel="Sleep (Press 0)"
              >
                <MoonIcon className={styles.iconSize} />
              </Button>
              <Button
                onClick={onClickChat}
                style={selectedView === 'chat' ? 'purpleSelected' : 'purple'}
                ariaLabel="Chat (Press C)"
              >
                <ChatBubbleBottomCenterTextIcon className={styles.iconSize} />
              </Button>
              <Button
                onClick={onClickSettings}
                style={
                  selectedView === 'settings' ? 'purpleSelected' : 'purple'
                }
                ariaLabel="Settings (Press S)"
              >
                <Cog6ToothIcon className={styles.iconSize} />
              </Button>
            </div>

            <Avatar state={avatarState} onClick={onClickWake} />
          </div>

          {selectedView === 'chat' && (
            <div className={styles.viewContainer}>
              <Chat avatarState={avatarState} setAvatarState={setAvatarState} />
            </div>
          )}
          {selectedView === 'settings' && (
            <div className={styles.viewContainer}>
              <Settings setSelectedView={setSelectedView} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
