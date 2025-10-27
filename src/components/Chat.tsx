import { useEffect, useState, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import { type AvatarStateOptions } from '../App';
import { useSpeakingState } from '../hooks/useSpeakingState';

type Message = {
  sender: 'user' | 'avatar';
  text: string;
};

const mockMessages: Message[] = [];

const styles = {
  container: 'h-full pb-15 flex flex-col overflow-hidden relative',
  emptyState:
    'absolute mb-15 inset-0 flex flex-col items-center justify-center text-white/80 p-8 sm:p-12',
  emptyStateTitle: 'mb-2 text-3xl text-shadow-md',
  emptyStateHighlight: 'text-purple-400 font-bold ml-2',
  emptyStateSubtitle: 'mb-4 text-xl text-shadow-md',
  chatHistory: 'mb-4 flex-1 overflow-y-auto rounded-lg p-3',
  messageList: 'space-y-3',
  messageWrapper: 'flex',
  messageWrapperUser: 'flex justify-end',
  messageBubble: 'max-w-xs px-4 py-2 rounded-lg',
  messageBubbleUser:
    'max-w-xs px-4 py-2 rounded-lg bg-purple-500/80 text-white rounded-br-none text-right',
  messageBubbleAvatar:
    'max-w-xs px-4 py-2 rounded-lg bg-slate-800/10 text-white rounded-bl-none text-left',
  messageText: 'text-sm',
  thinkingIndicator: 'flex justify-start',
  thinkingBubble:
    'max-w-xs px-4 py-2 rounded-lg bg-slate-800/10 text-white rounded-bl-none text-left animate-pulse',
  inputContainer:
    'absolute bottom-2 right-2 left-2 p-1 flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg shadow-md',
  textarea:
    'w-full h-10 rounded text-white p-2 placeholder-white/70 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/50',
  helpText: 'sr-only',
};

export default function Chat({
  avatarState,
  setAvatarState,
}: {
  avatarState: AvatarStateOptions;
  setAvatarState: (state: AvatarStateOptions) => void;
}) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClickSubmit();
    }
  }

  // Handle avatar thinking state
  useEffect(() => {
    if (avatarState === 'thinking') {
      const timer = setTimeout(() => {
        setAvatarState('speaking');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [avatarState, setAvatarState]);

  // Handle avatar speaking state (typing response)
  useSpeakingState({
    avatarState,
    setAvatarState,
    setMessages,
  });

  function onClickSubmit() {
    setAvatarState('thinking');
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'user',
        text: inputText,
      },
    ]);
    setInputText('');
  }

  return (
    <div className={styles.container}>
      {messages?.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>
            Hi, I'm
            <span className={styles.emptyStateHighlight}>Lil' Buddy</span>!
          </p>
          <p className={styles.emptyStateSubtitle}>
            How can I assist you today?
          </p>
        </div>
      )}
      {/* Chat History */}
      <div
        className={styles.chatHistory}
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <div
              key={`message-${index}`}
              className={
                message.sender === 'user'
                  ? styles.messageWrapperUser
                  : styles.messageWrapper
              }
            >
              <div
                className={
                  message.sender === 'user'
                    ? styles.messageBubbleUser
                    : styles.messageBubbleAvatar
                }
                role="article"
              >
                <p className={styles.messageText}>{message.text}</p>
              </div>
            </div>
          ))}
          {avatarState === 'thinking' && (
            <div
              className={styles.thinkingIndicator}
              role="status"
              aria-label="Avatar is thinking"
            >
              <div className={styles.thinkingBubble}>
                <p className={styles.messageText}>...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <textarea
          className={styles.textarea}
          placeholder="Start a conversation..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Message input"
          aria-describedby="chat-help"
        />

        <Button
          onClick={onClickSubmit}
          style="minimal"
          ariaLabel="Send message (Ctrl+Enter)"
        >
          <PaperAirplaneIcon className="h-6 w-6 text-slate-800" />
        </Button>
      </div>
      <p id="chat-help" className={styles.helpText}>
        Press Enter to send your message or click the send button
      </p>
    </div>
  );
}
