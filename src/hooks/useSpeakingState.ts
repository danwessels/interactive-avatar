import { useEffect } from 'react';
import { type AvatarStateOptions } from '../App';

type Message = {
  sender: 'user' | 'avatar';
  text: string;
};

interface UseSpeakingStateProps {
  avatarState: AvatarStateOptions;
  setAvatarState: (state: AvatarStateOptions) => void;
  setMessages: (fn: (prev: Message[]) => Message[]) => void;
}

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

  return () => clearInterval(interval);
}

// Handles chat 'speaking' response 
export function useSpeakingState({
  avatarState,
  setAvatarState,
  setMessages,
}: UseSpeakingStateProps): void {
  useEffect(() => {
    if (avatarState !== 'speaking') return;

    const fullResponse = 'How does the ocean say hi? It waves!';
    const typingSpeed = 120;

    // Add initial empty message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'avatar',
        text: '',
      },
    ]);

    // Type out response word by word
    const cleanup = typeOutResponse(
      fullResponse,
      (accumulatedText: string) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text = accumulatedText;
          return updatedMessages;
        });
      },
      typingSpeed
    );

    // Calculate total delay: time to type all words + buffer
    const totalDelay = fullResponse.split(' ').length * typingSpeed + 1000;

    // Transition to listening after response completes
    const listenerTimer = setTimeout(() => {
      setAvatarState('listening');
    }, totalDelay);

    return () => {
      cleanup();
      clearTimeout(listenerTimer);
    };
  }, [avatarState, setAvatarState, setMessages]);
}
