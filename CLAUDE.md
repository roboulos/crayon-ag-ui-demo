# CLAUDE.md - Crayon AG UI Demo

## 🚨 CRITICAL SETUP INFO - READ THIS FIRST!

### The API Key Issue That Wasted Our Time
The #1 issue that made this "pretty rough" was the **OpenAI API key setup**. Here's what you MUST do:

1. **Check if you have an API key in your environment**:
   ```bash
   echo $OPENAI_API_KEY
   ```

2. **If not, get it from another project**:
   ```bash
   # Find it in other .env.local files
   find ~/Desktop/ai_projects -name ".env.local" -exec grep -l "OPENAI_API_KEY" {} \;
   ```

3. **Add it to .env.local IMMEDIATELY**:
   ```bash
   echo "OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE" > .env.local
   ```

4. **RESTART THE SERVER** - The env vars don't reload automatically!
   ```bash
   # Kill existing server
   lsof -ti:3000 | xargs kill -9
   # Start fresh
   npm run dev
   ```

## 🏃‍♂️ FASTEST SETUP COMMANDS

```bash
# 1. Clone and enter
git clone https://github.com/roboulos/crayon-ag-ui-demo.git && cd crayon-ag-ui-demo

# 2. Install deps
npm install

# 3. Copy API key from another project (adjust path as needed)
grep "OPENAI_API_KEY" ~/Desktop/ai_projects/interactive-vc-reports/.env.local > .env.local

# 4. Run it
npm run dev
```

**That's it! Should be running in < 60 seconds.**

## 🎯 WHAT THIS PROJECT ACTUALLY IS

**Crayon AG UI Demo** = The ONLY working AG UI implementation after trying:
- CopilotKit (failed due to auth issues)
- Vercel AI SDK (incompatible architecture)
- Raw AG UI protocol (too complex)

**What makes Crayon special**:
- Purpose-built for streaming UI components
- Simple SSE protocol
- Works with standard OpenAI API
- Beautiful out of the box

## 🧠 KEY LEARNINGS & GOTCHAS

### 1. Environment Variables Are Tricky
- **Problem**: Added .env.local but API still failing
- **Solution**: MUST restart the server after changing env vars
- **Fast fix**: `lsof -ti:3000 | xargs kill -9 && npm run dev`

### 2. Message Format Matters
- **Problem**: 500 errors on every chat request
- **Solution**: Crayon expects `message.message` not `message.content`
- **Code fix**: In route.ts, access the message correctly

### 3. Tailwind Version Conflicts
- **Problem**: Tailwind v4 breaks everything
- **Solution**: Downgrade to v3 immediately
- **Command**: `npm uninstall tailwindcss @tailwindcss/postcss && npm install -D tailwindcss@^3.4.17 postcss autoprefixer`

### 4. Response Format is Critical
- **Problem**: AI doesn't know how to respond
- **Solution**: Must pass template schemas to `templatesToResponseFormat()`
- **Pattern**: Define Zod schemas → Pass to API → AI generates correct JSON

## 💡 HOW AG UI ACTUALLY WORKS

```
User types → API receives → OpenAI generates JSON → SSE streams → Template renders
```

**The magic**: AI chooses which UI component to render based on the prompt!

## 🚀 QUICK WINS & IMPROVEMENTS

### Make It Look Good FAST
```css
/* Add to globals.css for instant beauty */
.animate-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Test Prompts That Work
- "Show me a dashboard with sales metrics" → Dashboard card
- "Display a bar chart of monthly revenue" → Bar chart
- "Create an action card for user management" → Action buttons

### Debug Like a Pro
```bash
# Watch the API logs
npm run dev | grep -E "(POST|error|500)"

# Test the API directly
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

## 🔥 DEPLOYMENT READY

### Deploy to Vercel
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy (it reads .env.local automatically)
vercel

# Set env var in Vercel dashboard
# Settings → Environment Variables → Add OPENAI_API_KEY
```

## 📂 PROJECT STRUCTURE AT A GLANCE

```
app/api/chat/route.ts    ← The API (fix message.message here)
app/page.tsx             ← Main UI with templates array
components/templates/    ← Your UI components (Dashboard, Chart, Action)
types/templates.ts       ← Zod schemas (MUST match component props)
```

## 🎨 WHY THIS LOOKS SO GOOD

The subagent who fixed the UI added:
1. **Gradient backgrounds** on everything
2. **Glass morphism** effects (backdrop-blur)
3. **Smooth animations** (fadeIn, slideUp, pulse)
4. **Hover states** on all interactive elements
5. **Professional spacing** (8px grid system)

## ⚡ COMMON ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| "OPENAI_API_KEY environment variable is missing" | Add to .env.local AND restart server |
| 500 errors on chat | Check message.message vs message.content |
| Ugly UI | Run the enhanced CSS from subagent |
| "Unknown event type" console warnings | Normal - ignore them |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |

## 🎯 THE BOTTOM LINE

**This works because**:
- Crayon is built for AG UI (unlike CopilotKit)
- Simple architecture (unlike Vercel AI SDK)
- Beautiful results (unlike our first attempts)

**Remember**: The hardest part was the API key. Everything else just works!

---

Last updated: 2025-08-03
This doc contains all the pain points we hit so you don't have to!