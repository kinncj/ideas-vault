# Ideas Vault 💡

A high-fidelity, dark-themed React web application that acts as a secure repository for storing startup ideas. AI agents (simulated) passively research your ideas to provide market validation, competitor analysis, and readiness scores.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)

## ✨ Features

### 🎨 Design System
- **Dark Theme**: Deep slate/navy gradient backgrounds (#0f172a to #1e293b)
- **Typography**: Inter font from Google Fonts
- **Color Palette**: 
  - Slate-200 for body text, White for headings
  - Indigo/Violet gradients for primary actions
  - Emerald for success/ready states
  - Amber for warnings/processing states
- **Modern SaaS Aesthetics**: 
  - Rounded corners (rounded-xl, rounded-2xl)
  - Subtle borders (border-slate-700)
  - Glassmorphism effects on modals and overlays

### 🚀 Core Features

#### 1. Landing Page
- Marketing-style hero section with animated background orbs
- Call-to-action button to enter the app
- Feature showcase with icon cards
- Smooth transitions and animations

#### 2. App Layout
- **Desktop**: Fixed left sidebar with navigation
- **Mobile**: 
  - Top header with hamburger menu
  - Bottom navigation bar
  - Slide-out sidebar menu
- Responsive design that adapts to all screen sizes

#### 3. Dashboard (The Vault)
- Grid layout of idea cards
- Each card displays:
  - Title and truncated description
  - Tags (e.g., #SaaS, #FinTech)
  - Status badge (Ready or Agents Analyzing...)
  - Input type icon (Text, Voice, Image)
  - Readiness score preview
- Empty state with helpful onboarding
- "Add New Idea" button

#### 4. Capture Modal
- Three input methods via tabs:
  - **Text**: Standard form input
  - **Voice Note**: Simulated voice recording with animation
  - **Snapshot**: Drag-and-drop image upload zone
- Form fields:
  - Title (required)
  - Description (required)
  - Tags (comma-separated, optional)
- 2-second simulated network delay on submission
- Automatically generates mock research data

#### 5. Idea Detail View
- Comprehensive analysis dashboard:
  - **Concept Section**: Full idea description
  - **Readiness Score**: Large prominent display (0-100)
  - **Key Metrics Grid**:
    - Total Addressable Market (TAM)
    - Primary Target Audience
    - Top Competitor & Strength
    - Key Market Trend
  - **Growth Chart**: Bar chart showing 4-year market projection
  - **Competitor Analysis**: Detailed strengths and weaknesses
  - **Action Plan**: 3 suggested next steps
- Share and Download buttons
- Back navigation to dashboard

### 🎯 Data & Logic

- **Initial Data**: 4 pre-populated ideas with rich market research
- **Mock Data Generation**: Automatic research packet creation for new ideas
- **Local State Management**: All data stored in React state
- **No Backend**: Pure frontend prototype with simulated delays

## 🛠️ Tech Stack

- **React 19**: Functional components with hooks
- **TypeScript 5**: Type-safe development
- **Vite 7**: Lightning-fast development server and build tool
- **Tailwind CSS 4**: Utility-first styling with custom design tokens
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **Recharts**: Data visualization with responsive charts
- **Inter Font**: Modern, readable typography from Google Fonts

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

1. **Landing Page**: Click "Open Your Vault" to enter the application
2. **Dashboard**: View your existing ideas or click "Add New Idea"
3. **Add Idea**: Fill out the form in any of the three input modes (Text, Voice, Image)
4. **View Details**: Click any idea card to see full analysis
5. **Navigate**: Use the sidebar (desktop) or bottom nav (mobile) to navigate

## 📱 Responsive Design

The application is fully responsive with three breakpoints:
- **Mobile**: < 768px (Bottom nav + hamburger menu)
- **Tablet**: 768px - 1024px (Adjusted grid layouts)
- **Desktop**: > 1024px (Sidebar + full layouts)

## 🎨 Key Components

### LandingPage
Marketing page with animated background and feature cards.

**Location**: `src/components/LandingPage.tsx`

### AppLayout
Main application shell with sidebar and mobile navigation.

**Location**: `src/components/AppLayout.tsx`

### Dashboard
Grid view of all ideas with cards and empty state.

**Location**: `src/components/Dashboard.tsx`

### CaptureModal
Modal form for adding new ideas with three input modes.

**Location**: `src/components/CaptureModal.tsx`

### IdeaDetailView
Comprehensive view of a single idea with metrics and charts.

**Location**: `src/components/IdeaDetailView.tsx`

## 📊 Data Structure

```typescript
interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'ready' | 'analyzing';
  inputType: 'text' | 'voice' | 'image';
  readinessScore: number;
  marketSize: string;
  targetAudience: string;
  topCompetitor: string;
  competitorStrength: string;
  keyTrend: string;
  competitors: Competitor[];
  growthMetrics: GrowthMetric[];
  actionPlan: string[];
  createdAt: Date;
}
```

## 🎭 Animations

- **Landing Page**: Pulsing gradient orbs, sliding arrows
- **Idea Cards**: Stagger animation on load, hover lift effect
- **Status Badges**: Pulse animation for "Analyzing" state
- **Modals**: Backdrop blur with scale/fade transitions
- **Navigation**: Smooth tab transitions with layout animations
- **Voice Recording**: Scale pulse animation during listening

## 🚀 Performance

- **Code Splitting**: Ready for dynamic imports (warning shown in build)
- **Optimized Images**: Use SVG icons for crisp display at any size
- **Lazy Loading**: Charts only render when detail view is opened
- **Minimal Bundle**: ~214KB gzipped production build

## 📝 Future Enhancements

- [ ] Real backend integration with API
- [ ] User authentication and authorization
- [ ] Actual AI research agent integration
- [ ] Export ideas to PDF/JSON
- [ ] Collaboration features (Board view)
- [ ] Weekly digest email functionality
- [ ] Real-time notifications
- [ ] Search and filter functionality
- [ ] Dark/Light theme toggle
- [ ] Idea versioning and history

## 🤖 AI Development Setup

This project includes enhanced GitHub Copilot capabilities with custom agents, instructions, and prompts from the [awesome-copilot](https://github.com/github/awesome-copilot) repository.

See [.opencode/COPILOT_SETUP.md](.opencode/COPILOT_SETUP.md) for:
- Custom AI agents (Accessibility, Mantine UI, React, Testing specialists)
- Coding instructions for React, TypeScript, and testing
- Reusable prompts for feature planning and code review
- Usage examples and best practices

**Quick Start with Copilot:**
```
@mantine-ui-specialist Create a responsive dashboard layout
@accessibility Review this component for WCAG compliance
/review-and-refactor Improve code quality
```

## 🤝 Contributing

This is a prototype application. Feel free to fork and enhance!

## 📄 License

MIT

---

Built with ❤️ using React, Vite, and Tailwind CSS
