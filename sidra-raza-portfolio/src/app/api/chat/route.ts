/**
 * Chat API Route
 *
 * POST /api/chat
 *
 * Handles chat requests with streaming responses using RAG (Retrieval-Augmented Generation).
 * Answers questions about Sidra Raza using portfolio data as knowledge base.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validateChatInput,
  sanitizeInput,
} from '@/lib/ai/chat-service';
import { checkRateLimit } from '@/lib/ai/rate-limit';
import type { ChatRequest, ChatResponse, ChatMessage } from '@/types/chat';

// Generate UUID using crypto API (available in Edge runtime)
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get client IP from request headers
 * Handles various proxy scenarios
 */
function getClientIP(request: NextRequest): string {
  // Check for forwarded IP (from proxy/load balancer)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  // Check for real IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback to socket IP
  return request.ip || '127.0.0.1';
}

/**
 * POST handler for chat endpoint
 * 
 * Accepts: { message: string, sessionId?: string, context?: object }
 * Returns: Streaming SSE response or JSON response
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const sessionId = generateUUID();
  
  try {
    // Parse request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'INVALID_JSON',
          message: 'Request body must be valid JSON',
        },
        { status: 400 }
      );
    }
    
    // Validate input
    const validation = validateChatInput(body.message);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.error,
          message: validation.message,
        },
        { status: 400 }
      );
    }
    
    // Sanitize input
    const message = sanitizeInput(body.message);
    
    // Check rate limit
    const ip = getClientIP(request);
    const rateLimitResult = await checkRateLimit(ip, 'chat');
    
    // Add rate limit headers to response
    const rateLimitHeaders = {
      'X-RateLimit-Limit': rateLimitResult.limit.toString(),
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-RateLimit-Reset': rateLimitResult.reset.toString(),
    };
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please wait before sending another message.',
          details: {
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining,
            reset: rateLimitResult.reset,
          },
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      );
    }
    
    // Get conversation history if session ID provided
    // For now, we'll start fresh each time (stateless)
    const history: ChatMessage[] = [];

    // Check if client accepts streaming
    const acceptStreaming = request.headers.get('accept')?.includes('text/event-stream');

    try {
      // Dynamically import chat service to avoid module errors
      const { generateChatResponse, createChatStream } = await import('@/lib/ai/chat-service');

      if (acceptStreaming) {
        // Return streaming response
        const stream = createChatStream(message, history);

        return new Response(stream, {
          status: 200,
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            ...rateLimitHeaders,
          },
        });
      } else {
        // Return non-streaming response
        const result = await generateChatResponse(message, history);

        const response: ChatResponse = {
          sessionId,
          message: result.message,
          metadata: {
            latency: result.latency,
            chunksUsed: result.chunks.length,
            streaming: false,
          },
        };

        return NextResponse.json(response, {
          status: 200,
          headers: rateLimitHeaders,
        });
      }
    } catch (chatError) {
      console.error('Chat service error:', chatError);
      
      // Return user-friendly error
      return NextResponse.json(
        {
          error: 'API_ERROR',
          message: chatError instanceof Error ? chatError.message : 'Unable to generate response. Please check your API keys.',
          details: {
            retryable: true,
            hint: 'Make sure OPENAI_API_KEY and ANTHROPIC_API_KEY are set in .env.local',
          },
        },
        {
          status: 500,
          headers: rateLimitHeaders,
        }
      );
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', error instanceof Error ? error.stack : error);
    }
    
    return NextResponse.json(
      {
        error: 'API_ERROR',
        message: 'Unable to generate response. Please try again.',
        details: {
          retryable: true,
        },
      },
      {
        status: 500,
        headers: {
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '99',
          'X-RateLimit-Reset': (Date.now() + 3600000).toString(),
        },
      }
    );
  }
}

/**
 * GET handler for health check
 */
export async function GET() {
  try {
    // Import knowledge base to check status
    const { getKnowledgeBaseStats } = await import('@/lib/data/knowledge-base');
    const stats = await getKnowledgeBaseStats();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        knowledgeBase: {
          status: stats.initialized ? 'ready' : 'initializing',
          chunks: stats.totalChunks,
          lastBuilt: stats.lastBuilt,
        },
        embeddings: {
          status: process.env.OPENAI_API_KEY ? 'operational' : 'missing_key',
          provider: 'openai',
        },
        chat: {
          status: process.env.ANTHROPIC_API_KEY ? 'operational' : 'missing_key',
          provider: 'anthropic',
        },
        rateLimiter: {
          status: process.env.UPSTASH_REDIS_REST_URL ? 'operational' : 'local',
          provider: process.env.UPSTASH_REDIS_REST_URL ? 'upstash' : 'none',
        },
      },
      version: '1.0.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
