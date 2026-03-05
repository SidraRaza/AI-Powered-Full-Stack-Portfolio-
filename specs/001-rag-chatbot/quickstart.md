# Quickstart: RAG Chatbot

**Feature**: 001-rag-chatbot  
**Date**: 2026-03-02  
**Purpose**: Get developers up and running quickly

---

## 1. Prerequisites

- Node.js 20+ installed
- Existing sidra-raza-portfolio project set up
- API keys for:
  - OpenAI (embeddings)
  - Anthropic or Groq (chat completion)
  - Upstash Redis (rate limiting)

---

## 2. Environment Setup

### 2.1 Add Environment Variables

Create or update `.env.local`:

```bash
# OpenAI for embeddings
OPENAI_API_KEY=sk-...

# Anthropic for chat (or use Groq)
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Groq for chat (alternative to Anthropic)
GROQ_API_KEY=gsk_...

# Upstash for rate limiting
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 2.2 Install Dependencies

All dependencies already exist in `package.json`:

```bash
npm install
# or
yarn install
```

Verify installations:

```bash
npm list openai @anthropic-ai/sdk groq-sdk @upstash/ratelimit framer-motion
```

---

## 3. Build Knowledge Base

### 3.1 Create Portfolio Data File

Create `src/lib/data/portfolio-data.ts`:

```typescript
import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  about: {
    summary: "Sidra Raza is a Full Stack & Agentic AI Developer...",
    background: "...",
  },
  skills: {
    languages: ["TypeScript", "Python", "SQL"],
    frameworks: ["Next.js", "React", "FastAPI"],
    ai: ["RAG", "Fine-tuning", "Agent Systems"],
  },
  services: [
    {
      title: "AI Automation",
      description: "Automate business workflows...",
    },
  ],
  projects: [
    {
      title: "Project Name",
      description: "...",
      technologies: ["Next.js", "OpenAI"],
    },
  ],
  experience: [
    {
      company: "Company Name",
      role: "AI Developer",
      duration: "2023-Present",
    },
  ],
  contact: {
    email: "sidra@example.com",
    linkedin: "...",
    github: "...",
  },
  blog: [
    {
      title: "Blog Post Title",
      summary: "...",
      url: "/blog/post-slug",
    },
  ],
};
```

### 3.2 Initialize Knowledge Base

Run the initialization script:

```bash
npm run chatbot:init
```

Or manually:

```typescript
// From src/lib/data/knowledge-base.ts
import { initializeKnowledgeBase } from './knowledge-base';
import { portfolioData } from './portfolio-data';

const kb = await initializeKnowledgeBase(portfolioData);
console.log(`Knowledge base initialized with ${kb.chunks.length} chunks`);
```

---

## 4. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000`

---

## 5. Test Chatbot

### 5.1 Open Chatbot

1. Look for floating chat button (bottom-right corner)
2. Click to open chat panel

### 5.2 Test Scenarios

Try these test queries:

```
1. "Who is Sidra Raza?"
   Expected: Professional summary about Sidra

2. "What services does she provide?"
   Expected: List of services

3. "Show me her AI projects"
   Expected: Project descriptions

4. "How can I contact her?"
   Expected: Contact information

5. "Who is Elon Musk?"
   Expected: Polite decline (off-topic)
```

### 5.3 Test Edge Cases

```
1. Submit empty message
   Expected: "Please enter a message"

2. Submit very long message (1000+ chars)
   Expected: Truncated or error

3. Rapid-fire messages (10+ in 1 minute)
   Expected: Rate limit message

4. Ask same question twice
   Expected: Consistent answers
```

---

## 6. Verify Implementation

### 6.1 Check Components

Verify these files exist:

```
src/components/chatbot/
├── ChatWidget.tsx
├── ChatWindow.tsx
├── MessageBubble.tsx
└── ChatInput.tsx
```

### 6.2 Check API Route

Verify route exists:

```
src/app/api/chat/
└── route.ts
```

### 6.3 Check Knowledge Base

Verify modules exist:

```
src/lib/data/
├── knowledge-base.ts
├── embeddings.ts
├── retrieval.ts
└── portfolio-data.ts
```

---

## 7. Debugging

### 7.1 Common Issues

**Issue**: Chat button not visible

```bash
# Check layout.tsx includes ChatWidget
grep -n "ChatWidget" src/app/layout.tsx
```

**Issue**: "Knowledge base not ready" error

```typescript
// Verify knowledge base initialization
import { getKnowledgeBase } from '@/lib/data/knowledge-base';
const kb = await getKnowledgeBase();
console.log('KB initialized:', kb.initialized);
```

**Issue**: API errors

```bash
# Check server logs
npm run dev 2>&1 | grep "api/chat"
```

**Issue**: Rate limit errors in development

```bash
# Temporarily disable rate limiting
# Set in .env.local:
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 7.2 Health Check

```bash
curl http://localhost:3000/api/chat/health
```

Expected response:

```json
{
  "status": "healthy",
  "services": {
    "knowledgeBase": { "status": "ready", "chunks": 35 },
    "embeddings": { "status": "operational" },
    "chat": { "status": "operational" }
  }
}
```

---

## 8. Run Tests

### 8.1 Unit Tests

```bash
npm test -- chatbot
```

### 8.2 Integration Tests

```bash
npm run test:integration -- chat-api
```

### 8.3 E2E Tests (if available)

```bash
npm run test:e2e -- chatbot
```

---

## 9. Performance Check

### 9.1 Lighthouse

```bash
npm run lighthouse http://localhost:3000
```

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 9.2 Bundle Analysis

```bash
npm run build
npm run analyze
```

Check chatbot bundle size:
- Target: <50KB (lazy loaded)

---

## 10. Deployment

### 10.1 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables set in production
- [ ] Knowledge base initialized
- [ ] Rate limiting configured
- [ ] Error monitoring enabled

### 10.2 Deploy

```bash
git push origin main
# or
vercel deploy --prod
```

### 10.3 Post-Deployment Verification

1. Visit production URL
2. Test chatbot functionality
3. Check health endpoint
4. Monitor error logs

---

## 11. Next Steps

After quickstart:

1. **Customize**: Update portfolio data with actual content
2. **Style**: Adjust chat UI to match design preferences
3. **Monitor**: Set up analytics and error tracking
4. **Optimize**: Fine-tune chunk sizes and retrieval parameters

---

## 12. Resources

- **Full Documentation**: See `specs/001-rag-chatbot/`
- **API Contract**: `specs/001-rag-chatbot/contracts/chat-api.md`
- **Data Model**: `specs/001-rag-chatbot/data-model.md`
- **Research**: `specs/001-rag-chatbot/research.md`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Module not found errors | Run `npm install` |
| API key errors | Verify `.env.local` values |
| Chat not appearing | Check browser console for errors |
| Slow responses | Check embedding generation (should be cached) |
| Layout issues | Clear browser cache |

For additional help, see the full plan at `specs/001-rag-chatbot/plan.md`.
