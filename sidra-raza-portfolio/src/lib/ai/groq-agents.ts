import { groqClient } from '@/lib/groq';
import { createSSEStream } from '@/lib/ai/stream';

/**
 * Server-side only agent that uses Groq API
 * This ensures API keys are never exposed to the client
 *
 * SECURITY NOTE: This code should only run on the server-side (in API routes,
 * server actions, or server components) to prevent exposing the API key to clients.
 */
export interface AgentConfig {
  model?: string; // Default: 'llama-3.1-70b-versatile'
  temperature?: number; // Default: 0.7
  maxTokens?: number; // Default: 1000
  systemPrompt: string;
}

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Create a Groq-based agent with specified configuration
 *
 * SECURITY NOTE: This function and the agents it creates should only be used
 * in server-side contexts (API routes, server components, server actions)
 * to prevent exposing the GROQ_API_KEY to clients.
 */
export function createGroqAgent(config: AgentConfig) {
  const {
    model = 'llama-3.1-8b-instant', // Using the current supported model
    temperature = 0.7,
    maxTokens = 1000,
    systemPrompt,
  } = config;

  return {
    /**
     * Execute a single completion with the agent
     */
    async execute(messages: AgentMessage[]): Promise<string> {
      try {
        // Validate messages before sending to API
        if (!messages || messages.length === 0) {
          throw new Error('No messages provided for the agent to process');
        }

        // Filter out any messages with empty content
        const validMessages = messages.filter(msg =>
          msg &&
          msg.role &&
          ['user', 'assistant', 'system'].includes(msg.role) &&
          typeof msg.content === 'string' &&
          msg.content.trim().length > 0
        );

        // Ensure we have at least one valid user message
        const hasUserMessage = validMessages.some(msg => msg.role === 'user');
        if (!hasUserMessage) {
          throw new Error('At least one valid user message is required');
        }

        const fullMessages = [
          { role: 'system', content: systemPrompt },
          ...validMessages.map(msg => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
            name: msg.role === 'user' ? 'user_message' : msg.role === 'assistant' ? 'assistant_message' : 'system_message'
          })),
        ];

        const chatCompletion = await groqClient.chat.completions.create({
          messages: fullMessages,
          model: model,
          temperature: temperature,
          max_tokens: maxTokens,
        });

        return chatCompletion.choices[0]?.message?.content || '';
      } catch (error) {
        throw formatGroqError(error);
      }
    },

    /**
     * Create a streaming response for the agent
     */
    async createStream(messages: AgentMessage[]) {
      try {
        // Validate messages before sending to API
        if (!messages || messages.length === 0) {
          throw new Error('No messages provided for the agent to process');
        }

        // Filter out any messages with empty content
        const validMessages = messages.filter(msg =>
          msg &&
          msg.role &&
          ['user', 'assistant', 'system'].includes(msg.role) &&
          typeof msg.content === 'string' &&
          msg.content.trim().length > 0
        );

        // Ensure we have at least one valid user message
        const hasUserMessage = validMessages.some(msg => msg.role === 'user');
        if (!hasUserMessage) {
          throw new Error('At least one valid user message is required');
        }

        const fullMessages = [
          { role: 'system', content: systemPrompt },
          ...validMessages.map(msg => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
            name: msg.role === 'user' ? 'user_message' : msg.role === 'assistant' ? 'assistant_message' : 'system_message'
          })),
        ];

        const stream = await groqClient.chat.completions.create({
          messages: fullMessages,
          model: model,
          temperature: temperature,
          max_tokens: maxTokens,
          stream: true,
        });

        // Create an async iterator for the stream
        const textIterator = async function*() {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              yield content;
            }
          }
        };

        return createSSEStream(textIterator());
      } catch (error) {
        throw formatGroqError(error);
      }
    },
  };
}

/**
 * Format Groq API errors for better handling
 */
function formatGroqError(error: unknown): Error {
  if (error instanceof Error) {
    if (error.message.includes('401') || error.message.includes('authentication')) {
      return new Error('Invalid or missing GROQ_API_KEY. Please check your environment variables.');
    }
    if (error.message.includes('429') || error.message.includes('rate limit')) {
      return new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.message.includes('400') || error.message.includes('invalid request')) {
      console.error('Groq API invalid request error:', error.message);
      return new Error('Invalid request to Groq API. Please check your input. Details: ' + error.message);
    }
    if (error.message.includes('503') || error.message.includes('service unavailable')) {
      return new Error('Groq service is temporarily unavailable. Please try again later.');
    }
    console.error('Groq API error:', error.message);
    return error;
  }

  // Handle non-Error objects
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const errorMessage = String((error as { message: string }).message);
    console.error('Groq API error (non-Error object):', errorMessage);
    return new Error(errorMessage);
  }

  console.error('Unknown Groq API error:', error);
  return new Error('An unknown error occurred while calling the Groq API.');
}

/**
 * Specific agent implementations
 */

/**
 * Content Agent example
 *
 * SECURITY NOTE: This agent should only be used in server-side contexts
 * (API routes, server components, server actions) to prevent exposing
 * the GROQ_API_KEY to clients.
 */
export const contentAgent = createGroqAgent({
  model: 'llama-3.1-8b-instant', // Using the current supported model
  temperature: 0.8, // Higher temperature for creative content
  maxTokens: 1500,
  systemPrompt: `You are an expert content creator and strategist. Your role is to help users create high-quality, engaging content for various purposes including blog posts, social media, marketing materials, and more. Focus on creating valuable, original content that resonates with the target audience. Be creative, professional, and ensure the content aligns with the user's goals and brand voice.`,
});