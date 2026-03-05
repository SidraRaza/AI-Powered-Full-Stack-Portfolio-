'use client';

/**
 * ChatInput Component
 * 
 * Text input area for composing and sending chat messages.
 * Includes validation, character count, and send button.
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle } from 'lucide-react';

/**
 * ChatInput Props
 */
export interface ChatInputProps {
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * Maximum message length (characters)
 */
const MAX_LENGTH = 1000;

/**
 * Minimum message length (characters)
 */
const MIN_LENGTH = 1;

/**
 * Chat input component with validation and send button
 */
export function ChatInput({
  inputRef,
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use provided ref or local ref
  const ref = inputRef || textareaRef;

  /**
   * Validate message input
   */
  const validateMessage = (value: string): boolean => {
    // Check if empty
    if (!value || value.trim().length === 0) {
      setError('Please enter a message');
      return false;
    }

    // Check length
    if (value.length > MAX_LENGTH) {
      setError(`Message is too long (max ${MAX_LENGTH} characters)`);
      return false;
    }

    // Clear error
    setError(null);
    return true;
  };

  /**
   * Handle message submission
   */
  const handleSubmit = () => {
    if (!validateMessage(message)) {
      return;
    }

    // Send message
    onSendMessage(message.trim());
    
    // Clear input
    setMessage('');
    
    // Reset error
    setError(null);

    // Refocus input
    if (ref.current) {
      ref.current.focus();
    }
  };

  /**
   * Handle key press (Enter to send, Shift+Enter for new line)
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Handle input change with validation
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    // Prevent exceeding max length
    if (value.length > MAX_LENGTH) {
      setError(`Message exceeds limit by ${value.length - MAX_LENGTH} characters`);
    } else {
      setError(null);
    }
    
    setMessage(value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 100)}px`;
    }
  }, [message, ref]);

  const characterCount = message.length;
  const isOverLimit = characterCount > MAX_LENGTH;
  const canSend = message.trim().length >= MIN_LENGTH && !isOverLimit && !disabled;

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {/* Input Container */}
      <div className="relative flex items-center border border-border rounded-xl bg-muted/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {/* Textarea */}
        <textarea
          ref={ref}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none bg-transparent px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm md:text-base focus:outline-none placeholder:text-muted-foreground/70 disabled:opacity-50 max-h-[100px] leading-relaxed self-center"
          aria-label="Chat message input"
          aria-invalid={!!error || isOverLimit}
          aria-describedby={error ? 'input-error' : undefined}
        />

        {/* Send Button */}
        <motion.button
          whileHover={canSend ? { scale: 1.05 } : {}}
          whileTap={canSend ? { scale: 0.95 } : {}}
          onClick={handleSubmit}
          disabled={!canSend}
          className="flex-shrink-0 m-1 sm:m-1.5 p-2 sm:p-2.5 rounded-md bg-primary text-primary-foreground disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shrink-0 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] self-center"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-destructive px-1"
          id="input-error"
          role="alert"
        >
          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
          <span className="line-clamp-2">{error}</span>
        </motion.div>
      )}

      {/* Character Count */}
      <div className="flex justify-between items-center px-1">
        <span className={`text-[10px] sm:text-xs ${isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
          {characterCount} / {MAX_LENGTH}
        </span>
        
        {!disabled && !error && (
          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">
            Enter to send
          </span>
        )}
      </div>
    </div>
  );
}

export default ChatInput;
