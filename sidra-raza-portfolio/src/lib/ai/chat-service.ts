/**
 * Chat Service
 * 
 * Implements the RAG (Retrieval-Augmented Generation) pipeline for the chatbot.
 * Retrieves relevant portfolio content and generates responses using AI.
 */

import Groq from 'groq-sdk';
import type { ChatMessage, ScoredChunk } from '@/types/chat';
import { ChatErrorCode } from '@/types/chat';
import { getKnowledgeBase } from '@/lib/data/knowledge-base';
import { keywordSimilarity } from '@/lib/data/retrieval';
import { createSSEStream } from './stream';

/**
 * Groq client instance
 * Lazy initialization to avoid unnecessary API calls
 */
let groqClient: Groq | null = null;

/**
 * Get or create Groq client instance
 * @returns Groq client instance
 * @throws Error if GROQ_API_KEY is not configured
 */
function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        'GROQ_API_KEY environment variable is not set. ' +
        'Please add it to your .env.local file.'
      );
    }
    
    groqClient = new Groq({
      apiKey,
    });
  }
  
  return groqClient;
}

/**
 * Build system prompt for the chatbot
 * Ensures the AI speaks as Sidra Raza in third person and stays on topic
 */
function buildSystemPrompt(): string {
  return `You are an AI assistant representing Sidra Raza, a Full Stack & Agentic AI Developer.

IMPORTANT GUIDELINES:
1. Always speak in the third person about Sidra Raza (e.g., "Sidra specializes in...", "She builds...")
2. Be professional, concise, and clear in your responses
3. Only answer questions about Sidra Raza, her work, skills, services, projects, and experience
4. Use ONLY the provided knowledge base content to answer questions
5. Do not hallucinate or make up information not in the knowledge base
6. If a question is unrelated to Sidra Raza or her work, politely decline and say: "I specialize in answering questions about Sidra Raza and her work."
7. Keep responses focused and informative without being verbose
8. Maintain a friendly, professional tone throughout

Remember: You are an assistant representing Sidra Raza. Stay in character and provide accurate information based only on the portfolio content provided.`;
}

/**
 * Build context from retrieved chunks
 * Formats the retrieved content for the AI to use
 */
function buildContextFromChunks(chunks: ScoredChunk[]): string {
  const context = chunks
    .map((scored, index) => {
      const { chunk } = scored;
      return `[Source ${index + 1}: ${chunk.metadata.title || chunk.section}]\n${chunk.content}`;
    })
    .join('\n\n');
  
  return `RELEVANT PORTFOLIO CONTENT:\n${context}\n\nUse ONLY the above information to answer the user's question.`;
}

/**
 * Check if a query is likely off-topic
 * Simple heuristic based on common off-topic patterns
 */
function isOffTopic(query: string): boolean {
  const offTopicPatterns = [
    /\b(who is|what is|tell me about)\s+(elon musk|bill gates|jeff bezos|mark zuckerberg)/i,
    /\b(what do you think about|your opinion on)\s+(politics|religion|controversial)/i,
    /\b(how to|can you help me)\s+(hack|crack|bypass|exploit)/i,
    /\b(write|generate)\s+(essay|code|email|letter)/i,
    /\b(translate|summarize)\s+(this|the following)/i,
  ];
  
  return offTopicPatterns.some(pattern => pattern.test(query));
}

/**
 * Generate a response using the RAG pipeline with keyword search
 * 
 * @param message - User's message
 * @param history - Previous conversation history (optional)
 * @returns Object with response message and metadata
 * 
 * @example
 * ```typescript
 * const { message, chunks } = await generateChatResponse("What services does Sidra provide?");
 * ```
 */
export async function generateChatResponse(
  message: string,
  history: ChatMessage[] = []
): Promise<{
  message: ChatMessage;
  chunks: ScoredChunk[];
  latency: number;
}> {
  const startTime = Date.now();
  
  // Check if off-topic
  if (isOffTopic(message)) {
    return {
      message: {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I specialize in answering questions about Sidra Raza and her work.',
        timestamp: new Date().toISOString(),
        metadata: {
          confidence: 1.0,
          latency: Date.now() - startTime,
        },
      },
      chunks: [],
      latency: Date.now() - startTime,
    };
  }
  
  // Get knowledge base
  const kb = await getKnowledgeBase();
  
  // Keyword-based retrieval
  const scoredChunks = kb.chunks
    .map(chunk => ({
      chunk,
      score: keywordSimilarity(message, chunk.content),
    }))
    .filter(scored => scored.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  const chunks = scoredChunks;
  
  // If no relevant chunks found, use default response
  if (chunks.length === 0) {
    return {
      message: {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I apologize, but I could not find specific information about that in my knowledge base. Could you please rephrase your question or ask something else about Sidra Raza\'s work, skills, or services?',
        timestamp: new Date().toISOString(),
        metadata: {
          confidence: 0.3,
          latency: Date.now() - startTime,
        },
      },
      chunks: [],
      latency: Date.now() - startTime,
    };
  }
  
  // Build context from chunks
  const context = buildContextFromChunks(chunks);
  
  // Build conversation history for context
  const conversationHistory = history
    .slice(-6) // Last 3 exchanges (6 messages)
    .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');
  
  // Create the full prompt
  const userPrompt = conversationHistory
    ? `${conversationHistory}\n\nUser: ${message}\n\nAssistant:`
    : `User: ${message}\n\nAssistant:`;
  
  // Call Groq API
  const client = getGroqClient();
  
  try {
    const response = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(),
        },
        {
          role: 'user',
          content: `${context}\n\n${userPrompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });
    
    const content = response.choices[0]?.message?.content || 'I apologize, but I encountered an error generating a response.';
    
    const latency = Date.now() - startTime;
    
    return {
      message: {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        timestamp: new Date().toISOString(),
        metadata: {
          usedChunks: chunks.map(c => c.chunk.id),
          confidence: chunks[0]?.score || 0,
          latency,
          model: 'llama-3.1-8b-instant',
        },
      },
      chunks,
      latency,
    };
  } catch (error) {
    console.error('Error generating chat response:', error);
    
    const latency = Date.now() - startTime;
    
    // Return error response
    return {
      message: {
        id: crypto.randomUUID(),
        role: 'error',
        content: 'I apologize, but I encountered an error while processing your request. Please try again in a moment.',
        timestamp: new Date().toISOString(),
        metadata: {
          latency,
        },
      },
      chunks: [],
      latency,
    };
  }
}

/**
 * Generate a streaming response using the RAG pipeline
 * 
 * @param message - User's message
 * @param history - Previous conversation history (optional)
 * @returns AsyncIterable<string> for streaming
 * 
 * @example
 * ```typescript
 * const stream = generateChatResponseStream("What services does Sidra provide?");
 * for await (const chunk of stream) {
 *   console.log(chunk);
 * }
 * ```
 */
export async function* generateChatResponseStream(
  message: string,
  history: ChatMessage[] = []
): AsyncIterable<string> {
  // Check if off-topic
  if (isOffTopic(message)) {
    yield 'I specialize in answering questions about Sidra Raza and her work.';
    return;
  }

  try {
    // Get knowledge base
    const kb = await getKnowledgeBase();
    
    // Keyword-based retrieval
    const chunks = kb.chunks
      .map(chunk => ({
        chunk,
        score: keywordSimilarity(message, chunk.content),
      }))
      .filter(scored => scored.score > 0.1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // If no relevant chunks found
    if (chunks.length === 0) {
      yield 'I apologize, but I could not find specific information about that in my knowledge base. Could you please rephrase your question?';
      return;
    }

    // Build context and prompt
    const context = buildContextFromChunks(chunks);
    const userPrompt = `User: ${message}\n\nAssistant:`;

    // Call Groq API with streaming
    const client = getGroqClient();

    const stream = await client.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(),
        },
        {
          role: 'user',
          content: `${context}\n\n${userPrompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Error in streaming response:', error);
    yield 'I apologize, but I encountered an error while processing your request. Please try again.';
  }
}

/**
 * Create a streaming response for the API route
 * 
 * @param message - User's message
 * @param history - Previous conversation history
 * @returns ReadableStream for HTTP response
 * 
 * @example
 * ```typescript
 * const stream = createChatStream(message, history);
 * return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
 * ```
 */
export function createChatStream(
  message: string,
  history: ChatMessage[] = []
): ReadableStream {
  return createSSEStream(generateChatResponseStream(message, history));
}

/**
 * Validate chat input
 * 
 * @param message - User's message to validate
 * @returns Validation result with error code if invalid
 */
export function validateChatInput(message: string): {
  valid: boolean;
  error?: ChatErrorCode;
  message?: string;
} {
  // Check if empty
  if (!message || message.trim().length === 0) {
    return {
      valid: false,
      error: ChatErrorCode.EMPTY_INPUT,
      message: 'Please enter a message.',
    };
  }
  
  // Check length (max 1000 characters)
  if (message.length > 1000) {
    return {
      valid: false,
      error: ChatErrorCode.INVALID_SESSION,
      message: 'Message is too long. Please keep it under 1000 characters.',
    };
  }
  
  // Check for potentially malicious input
  const sanitized = message.replace(/<[^>]*>/g, '').trim();
  if (sanitized.length === 0) {
    return {
      valid: false,
      error: ChatErrorCode.EMPTY_INPUT,
      message: 'Invalid input. Please enter a valid message.',
    };
  }
  
  return { valid: true };
}

/**
 * Sanitize user input
 * Removes HTML tags and potentially dangerous content
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}
