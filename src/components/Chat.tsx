import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import { type AvatarStateOptions } from '../App';

type Message = {
  id: number;
  sender: 'user' | 'avatar';
  text: string;
};

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'user',
    text: 'Hello! How are you today?',
  },
  {
    id: 2,
    sender: 'avatar',
    text: "I'm doing great, thanks for asking! I'm here to help you with anything you need.",
  },
];

export default function Chat({
  avatarState,
  setAvatarState,
}: {
  avatarState: AvatarStateOptions;
  setAvatarState: (state: AvatarStateOptions) => void;
}) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState<string>('Tell me a joke!');

  useEffect(() => {
    if (avatarState === 'thinking') {
      const timer = setTimeout(() => {
        setAvatarState('speaking');
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (avatarState === 'speaking') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'avatar',
          text: 'How does the ocean say hi? It waves!',
        },
      ]);
      const timer = setTimeout(() => {
        setAvatarState('listening');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [avatarState, setAvatarState]);

  function onClickSearch() {
    setAvatarState('thinking');
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: 'user',
        text: inputText,
      },
    ]);
    setInputText('');
  }

  return (
    <div className={``}>
      {/* Chat History */}
      <div className={`mb-4 h-64 overflow-y-auto rounded-lg  p-3`}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-purple-500/80 text-white rounded-br-none text-right'
                    : 'bg-black/70 text-white rounded-bl-none text-left'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {avatarState === 'thinking' && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-black/70 text-white rounded-bl-none text-left animate-pulse">
                <p className="text-sm">...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2 bg-white/30 backdrop-blur-sm rounded-lg shadow-md border-2 border-white/10">
        <div className="grow">
          <textarea
            className="w-full h-10 bg-transparent border-none outline-none text-white p-2 placeholder-white/50"
            placeholder="Say something..."
            value={inputText}
          />
        </div>
        <span>
          <Button
            avatarState={avatarState}
            onClick={onClickSearch}
            style={avatarState === 'thinking' ? 'purpleSelected' : 'purple'}
          >
            {/* Ask */}
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Button>
        </span>
      </div>
    </div>
  );
}
