import { useEffect, useState } from 'react';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/solid';
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

/**
 * Generates words from a text string one at a time
 * @param text - The full text to split into words
 * @param onWord - Callback function called with accumulated text after each word
 * @param wordDelayMs - Delay in milliseconds between each word (default: 150ms)
 */
function typeOutResponse(
  text: string,
  onWord: (accumulatedText: string) => void,
  wordDelayMs: number = 150
): () => void {
  const words = text.split(' ');
  let wordIndex = 0;

  const interval = setInterval(() => {
    if (wordIndex < words.length) {
      const accumulatedText = words.slice(0, wordIndex + 1).join(' ');
      onWord(accumulatedText);
      wordIndex++;
    } else {
      clearInterval(interval);
    }
  }, wordDelayMs);

  // Return cleanup function
  return () => clearInterval(interval);
}

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
      const fullResponse = 'How does the ocean say hi? It waves!';

      // Add initial empty message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: 'avatar',
          text: '',
        },
      ]);

      // Type out response word by word
      const cleanup = typeOutResponse(
        fullResponse,
        (accumulatedText) => {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].text = accumulatedText;
            return updatedMessages;
          });
        },
        150 // Adjust this value to change typing speed (milliseconds)
      );

      // Transition to listening after a delay
      const listenerTimer = setTimeout(() => {
        setAvatarState('listening');
      }, fullResponse.split(' ').length * 150 + 1000); // Wait for typing to complete + buffer

      return () => {
        cleanup();
        clearTimeout(listenerTimer);
      };
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
    <div>
      {/* Chat History */}
      <div
        className={`mb-4 h-64 overflow-y-auto rounded-lg  p-3`}
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
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
                    : 'bg-slate-800/10 text-white rounded-bl-none text-left'
                }`}
                role="article"
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {avatarState === 'thinking' && (
            <div
              className="flex justify-start"
              role="status"
              aria-label="Avatar is thinking"
            >
              <div className="max-w-xs px-4 py-2 rounded-lg bg-slate-800/10 text-white rounded-bl-none text-left animate-pulse">
                <p className="text-sm">...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-3 right-3 left-3 flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-lg shadow-md border-2 border-white/10">
        <textarea
          className="w-full h-10 rounded text-white p-2 placeholder-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50"
          placeholder="Say something..."
          value={inputText}
          aria-label="Message input"
          aria-describedby="chat-help"
        />

        <Button
          avatarState={avatarState}
          onClick={onClickSearch}
          style={avatarState === 'thinking' ? 'purpleSelected' : 'purple'}
          ariaLabel="Send message (Ctrl+Enter)"
        >
          <PaperAirplaneIcon className="h-6 w-6" />
        </Button>
        <Button
          avatarState={avatarState}
          onClick={onClickSearch}
          style={avatarState === 'thinking' ? 'purpleSelected' : 'purple'}
          ariaLabel="Switch to voice input"
        >
          <MicrophoneIcon className="h-6 w-6" />
        </Button>
      </div>
      <p id="chat-help" className="sr-only">
        Press Ctrl+Enter to send your message or click the send button
      </p>
    </div>
  );
}
