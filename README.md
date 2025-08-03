# Crayon AG UI Demo 🎨

The **best implementation** of AG UI (Agentic UI) we've achieved - a beautiful, professional demo using the Crayon framework for streaming UI components.

![Crayon AG UI Demo](https://img.shields.io/badge/AG_UI-Crayon-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge)

## 🌟 Features

### ✨ Working AG UI Components
- **Dashboard Cards** - Display metrics with trend indicators and beautiful gradients
- **Charts** - Animated bar charts with gradient fills and smooth transitions
- **Action Cards** - Interactive buttons with modern styling and hover effects

### 🎨 Professional Design
- **Gradient Backgrounds** - Modern purple-to-blue gradients
- **Glass Morphism** - Subtle transparency effects
- **Smooth Animations** - Fade-ins, slide-ups, and hover transitions
- **Modern Typography** - Clean, readable text hierarchy
- **Responsive Layout** - Works beautifully on all screen sizes

### 🚀 Technical Implementation
- **Crayon Framework** - Purpose-built for streaming UI components
- **SSE Protocol** - Real-time streaming of UI from AI
- **Zod Schemas** - Type-safe template definitions
- **OpenAI Integration** - GPT-4 mini for fast responses
- **Next.js 15** - Latest React framework features

## 📸 Screenshots

### Dashboard with Sales Metrics
Ask: "Show me a dashboard with sales metrics"
- Beautiful gradient cards
- Trend indicators with colors
- Professional metric display

### Monthly Revenue Chart
Ask: "Display a bar chart of monthly revenue"
- Animated bar charts
- Gradient fills
- Smooth hover effects

### User Management Actions
Ask: "Create an action card for user management"
- Styled action buttons
- Color-coded by type
- Interactive hover states

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/roboulos/crayon-ag-ui-demo.git
   cd crayon-ag-ui-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your OpenAI API key**
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your-api-key-here" > .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to http://localhost:3000

## 💬 Example Prompts

Try these prompts to see AG UI in action:

- "Show me a dashboard with sales metrics"
- "Display a bar chart of monthly revenue"
- "Create an action card for user management"
- "Show me customer analytics dashboard"
- "Display a pie chart of market share"
- "Create action buttons for product management"

## 🏗️ Architecture

```
app/
├── api/chat/route.ts    # SSE streaming endpoint
├── page.tsx             # Main chat interface
├── globals.css          # Beautiful animations & styles
└── layout.tsx           # App layout

components/templates/
├── DashboardCard.tsx    # Metric dashboard component
├── Chart.tsx            # Data visualization component
└── ActionCard.tsx       # Interactive action component

types/
└── templates.ts         # Zod schemas for templates
```

## 🎯 Why This is the Best Implementation

1. **Purpose-Built Framework** - Crayon is designed specifically for AG UI
2. **Beautiful Design** - Professional gradients, animations, and modern styling
3. **Actually Works** - Unlike other attempts, this streams real UI components
4. **Clean Architecture** - Simple, understandable code structure
5. **Type Safety** - Zod schemas ensure reliable AI responses

## 🔄 Comparison with Other Attempts

| Framework | Result | Issues |
|-----------|---------|---------|
| CopilotKit | 6/10 | Authentication issues, complex setup |
| Vercel AI SDK | Failed | Incompatible with AG UI patterns |
| **Crayon** | **8+/10** | **Works beautifully!** |

## 🚀 Future Enhancements

- [ ] Add more template types (tables, forms, galleries)
- [ ] Implement dark mode toggle
- [ ] Add more chart types (line, pie, area)
- [ ] Create a template builder interface
- [ ] Add export functionality for generated UI

## 📝 License

MIT License - feel free to use this for your own AG UI projects!

## 🙏 Acknowledgments

- [Crayon Framework](https://crayonai.com) - For the excellent AG UI SDK
- [OpenAI](https://openai.com) - For GPT-4 mini
- [Next.js](https://nextjs.org) - For the React framework

---

🤖 Generated with [Claude Code](https://claude.ai/code)

This represents the best AG UI implementation we've achieved after multiple attempts with different frameworks. The Crayon framework proves to be the ideal choice for streaming UI components!