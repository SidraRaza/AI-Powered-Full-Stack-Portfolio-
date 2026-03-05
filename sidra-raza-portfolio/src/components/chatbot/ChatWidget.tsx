'use client';

/**
 * ChatWidget Component
 * 
 * Floating chat button fixed at bottom-right corner.
 * Opens the chat window when clicked.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

/**
 * ChatWidget Props
 */
export interface ChatWidgetProps {
  /** Whether the chat widget is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Floating chat button that opens the chat window
 */
export function ChatWidget({ enabled = true }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if disabled
  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open chat"
          aria-haspopup="dialog"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
      </motion.div>

      {/* Chat Window with Animation */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatWidget;
