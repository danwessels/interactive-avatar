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

export type AvatarStateOptions = 'idle' | 'listening' | 'thinking' | 'speaking';
export type SelectedView = 'idle' | 'awake' | 'chat' | 'settings';

const viewContainerStyles =
  'max-h-110 overflow-hidden backdrop-blur-sm rounded-xl shadow-md border-2 border-white/10 space-y-4 h-full flex flex-col';

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
      <div className="text-center w-screen h-screen p-4 bg-[url(src/assets/johny-goerend-Oz2ZQ2j8We8-unsplash.jpg)] bg-cover">
        <div
          className={`h-full rounded-xl relative max-w-90 w-full m-auto p-2 border-2 border-transparent `}
        >
          <div className="flex flex-col-reverse sm:flex-row gap-3 pb-4">
            {selectedView !== 'idle' && (
              <div
                className="flex flex-row sm:flex-col gap-1 justify-center sm:justify-between items-center left-2"
                role="navigation"
                aria-label="Main navigation"
              >
                <Button
                  avatarState={avatarState}
                  onClick={onClickIdle}
                  style="blue"
                  ariaLabel="Sleep (Press 0)"
                >
                  <MoonIcon className="h-6 w-6" />
                </Button>
                <Button
                  avatarState={avatarState}
                  onClick={onClickChat}
                  style={selectedView === 'chat' ? 'orangeSelected' : 'orange'}
                  ariaLabel="Chat (Press C)"
                >
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                </Button>
                <Button
                  avatarState={avatarState}
                  onClick={onClickSettings}
                  style={
                    selectedView === 'settings' ? 'orangeSelected' : 'orange'
                  }
                  ariaLabel="Settings (Press S)"
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                </Button>
              </div>
            )}

            <Avatar state={avatarState} onClick={onClickWake} />
          </div>

          {selectedView === 'chat' && (
            <div className={viewContainerStyles}>
              <Chat avatarState={avatarState} setAvatarState={setAvatarState} />
            </div>
          )}
          {selectedView === 'settings' && (
            <div className={viewContainerStyles}>
              <Settings setSelectedView={setSelectedView} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
