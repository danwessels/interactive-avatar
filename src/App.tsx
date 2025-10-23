import { useState } from 'react';
import Avatar from './components/Avatar';
import Button from './components/Button';
import {
  MoonIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  // MicrophoneIcon,
  // PhotoIcon,
  // AdjustmentsHorizontalIcon,
  // PaperClipIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

export type AvatarStateOptions = 'idle' | 'listening' | 'thinking';
export type SelectedView = 'idle' | 'awake' | 'chat' | 'settings';

function App() {
  const [avatarState, setAvatarState] = useState<AvatarStateOptions>('idle');
  const [selectedView, setSelectedView] = useState<SelectedView>('idle');

  function onClickChat() {
    setSelectedView('chat');
    setAvatarState('listening');
  }

  function onClickSearch() {
    setAvatarState('thinking');
    setTimeout(() => {
      setAvatarState('listening');
    }, 3000);
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
        <h1>Lil' Buddy</h1>
        <div className="relative w-fit m-auto px-20">
          {selectedView !== 'idle' && (
            <div className="flex flex-col gap-2 h-24 items-center absolute left-0">
              <Button
                avatarState={avatarState}
                onClick={onClickIdle}
                style="blue"
              >
                <MoonIcon className="h-6 w-6" />
              </Button>
              <Button
                avatarState={avatarState}
                onClick={onClickChat}
                style={selectedView === 'chat' ? 'orangeSelected' : 'orange'}
              >
                <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              </Button>
              <Button
                avatarState={avatarState}
                onClick={onClickSettings}
                style={
                  selectedView === 'settings' ? 'orangeSelected' : 'orange'
                }
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </Button>
            </div>
          )}
          <button
            onClick={onClickWake}
            className="bg-transparent border-transparent p-0"
          >
            <Avatar state={avatarState} />
          </button>
          {selectedView === 'chat' && (
            <div className={`absolute left-0 right-0`}>
              <div
                className={`bg-white/30 mb-4 backdrop-blur-sm h-32 rounded-lg shadow-md border-2 border-white/10`}
              >
                <p className="m-2 font-semibold text-white text-shadow-md">
                  How can I help you today?
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent border-none outline-none text-white px-2"
                  placeholder="Type your message..."
                />
              </div>
              <span className="float-end">
                <Button
                  avatarState={avatarState}
                  onClick={onClickSearch}
                  style={
                    avatarState === 'thinking' ? 'purpleSelected' : 'purple'
                  }
                >
                  {/* Ask */}
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </Button>
              </span>
            </div>
          )}
          {selectedView === 'settings' && (
            <div className={`absolute left-0 right-0`}>
              <p className="m-2 font-semibold text-white text-shadow-md">
                Settings
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
