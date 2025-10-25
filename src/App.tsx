import { useState } from 'react';
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
  'max-h-110 backdrop-blur-sm rounded-xl shadow-md border-2 border-white/10 p-2 space-y-4 h-full flex flex-col';

function App() {
  const [avatarState, setAvatarState] = useState<AvatarStateOptions>('idle');
  const [selectedView, setSelectedView] = useState<SelectedView>('idle');

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
          {selectedView !== 'idle' && (
            <div
              className="flex flex-col gap-2 h-24 items-center absolute left-2"
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
