'use client';

/**
 * MessageBubble Component
 * 
 * Displays individual chat messages with appropriate styling
 * based on the message role (user, assistant, error).
 */

import { motion } from 'framer-motion';
import { AlertCircle, Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

/**
 * MessageBubble Props
 */
export interface MessageBubbleProps {
  message: ChatMessage;
  isLast?: boolean;
}

/**
 * Get styling based on message role
 */
function getBubbleStyles(role: ChatMessage['role']) {
  switch (role) {
    case 'user':
      return {
        container: 'flex justify-end',
        bubble: 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm',
        icon: null,
      };
    case 'assistant':
      return {
        container: 'flex justify-start',
        bubble: 'bg-surface text-foreground rounded-2xl rounded-tl-sm border border-border',
        icon: Bot,
      };
    case 'error':
      return {
        container: 'flex justify-center',
        bubble: 'bg-destructive/10 text-destructive rounded-2xl border border-destructive/30',
        icon: AlertCircle,
      };
    default:
      return {
        container: 'flex justify-start',
        bubble: 'bg-surface text-foreground rounded-2xl',
        icon: null,
      };
  }
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Message bubble component for displaying chat messages
 */
export function MessageBubble({ message, isLast = false }: MessageBubbleProps) {
  const styles = getBubbleStyles(message.role);
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[80%] md:max-w-[80%]`}>
        {/* Assistant Icon */}
        {Icon && message.role !== 'user' && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>
        )}

        {/* Message Bubble */}
        <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 ${styles.bubble} shadow-sm`}
          >
            <p className="text-xs sm:text-sm md:text-base whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          </motion.div>

          {/* Timestamp and Metadata */}
          <div className="flex items-center space-x-2 mt-1 px-1">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {formatTimestamp(message.timestamp)}
            </span>
            
            {/* Confidence Indicator (if available) */}
            {message.metadata?.confidence !== undefined && message.role === 'assistant' && (
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {message.metadata.confidence >= 0.8 ? '✓' : message.metadata.confidence >= 0.6 ? '~' : '?'}
              </span>
            )}
          </div>
        </div>

        {/* User Icon */}
        {message.role === 'user' && (
          <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MessageBubble;
