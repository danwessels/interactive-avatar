import { useState } from 'react';
import Avatar from './components/Avatar';
import {
  MoonIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

type engagementState = 'idle' | 'listening' | 'thinking';

function App() {
  const [engagementState, setEngagementState] =
    useState<engagementState>('idle');

  return (
    <>
      <div className="text-center w-screen h-screen p-4 bg-[url(src/assets/johny-goerend-Oz2ZQ2j8We8-unsplash.jpg)] bg-cover">
        <h1>Lil' Buddy</h1>
        <div className="relative w-fit m-auto px-20">
          <div className="flex flex-col gap-2 h-24 items-center absolute left-0">
            <button
              onClick={() => setEngagementState('idle')}
              className={
                engagementState === 'idle'
                  ? ' bg-linear-to-br from-blue-700 to-blue-400 border-blue-400'
                  : ''
              }
            >
              <MoonIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setEngagementState('listening')}
              className={
                engagementState !== 'idle'
                  ? 'bg-linear-to-br from-orange-700 to-orange-400 border-orange-500'
                  : ''
              }
            >
              {/* Wake up */}
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
            </button>
          </div>
          <Avatar state={engagementState} />
          {engagementState !== 'idle' && (
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
              <button
                onClick={() => setEngagementState('thinking')}
                className={
                  engagementState === 'thinking'
                    ? 'float-end bg-linear-to-br from-purple-700 to-purple-400 border-purple-400'
                    : 'float-end'
                }
              >
                {/* Ask */}
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
