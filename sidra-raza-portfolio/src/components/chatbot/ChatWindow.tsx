'use client';

/**
 * ChatWindow Component
 * 
 * Main chat panel that displays messages and handles user interaction.
 * Desktop: 380px width panel
 * Mobile: Full-width bottom sheet
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import type { ChatMessage } from '@/types/chat';

/**
 * ChatWindow Props
 */
export interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Initial greeting message from the chatbot
 */
const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  content: 'Hello! I\'m Sidra\'s AI assistant. Ask me anything about her work, skills, services, or projects!',
  timestamp: new Date().toISOString(),
};

/**
 * Chat window component with message display and input
 */
export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  /**
   * Send message to chat API
   */
  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment.');
        }
        
        throw new Error(errorData.message || 'Failed to send message');
      }

      // Handle streaming response
      if (response.headers.get('content-type')?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        // Create assistant message placeholder
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          metadata: {},
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Read stream
        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  setMessages(prev => {
                    const updated = [...prev];
                    const lastMessage = updated[updated.length - 1];
                    if (lastMessage.role === 'assistant') {
                      lastMessage.content += parsed.content;
                    }
                    return updated;
                  });
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      } else {
        // Handle non-streaming response
        const data = await response.json();
        
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.message?.content || 'I apologize, but I encountered an error.',
          timestamp: new Date().toISOString(),
          metadata: data.message?.metadata,
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'error',
        content: error instanceof Error ? error.message : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 z-[999] flex flex-col h-[100vh] md:h-[550px] md:w-[380px] md:bottom-6 md:right-6 md:left-auto md:rounded-t-2xl md:rounded-2xl bg-background border border-border shadow-2xl overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-window-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface shrink-0">
        <div>
          <h2 id="chat-window-title" className="text-base md:text-lg font-semibold text-foreground ">
            Chat with Sidra&apos;s Assistant
          </h2>
          <p className="text-xs text-muted-foreground">
            AI-powered portfolio assistant
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-muted/30 mt-14 md:mt-1 min-h-0">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Sidra&apos;s assistant is typing...</span>
          </motion.div>
        )}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-3 md:p-4 shrink-0">
        <ChatInput
          inputRef={inputRef}
          onSendMessage={sendMessage}
          disabled={isLoading}
          placeholder="Ask about Sidra's work, skills, or services..."
        />
      </div>
    </motion.div>
  );
}

export default ChatWindow;
