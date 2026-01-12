# Ideas Vault - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation & Running

```bash
# Navigate to the project directory
cd ideasvault-ui

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

## 🎯 Using the Application

### 1. Landing Page
When you first open the app, you'll see the marketing landing page.

**Action**: Click the **"Open Your Vault"** button to enter the application.

### 2. Dashboard View
You'll see 4 pre-loaded startup ideas displayed as cards.

**Features**:
- Each card shows:
  - Title and description
  - Tags (e.g., #SaaS, #AI)
  - Status badge (Ready/Analyzing)
  - Readiness score
- Click any card to view full details
- Click **"Add New Idea"** button to add your own

### 3. Adding a New Idea

Click "Add New Idea" to open the capture modal. You have three input options:

#### Text Tab (Default)
1. Enter a title (e.g., "AI-Powered Task Manager")
2. Enter a description of your idea
3. Add tags separated by commas (e.g., "SaaS, Productivity, AI")
4. Click **"Send to Vault"**

#### Voice Note Tab
1. Click the microphone icon to simulate voice recording
2. Wait 3 seconds for the simulated transcription
3. Edit the transcribed text if needed
4. Enter title and tags
5. Click **"Send to Vault"**

#### Snapshot Tab
1. Use the drag-and-drop zone (visual only in this prototype)
2. Add context in the description field
3. Enter title and tags
4. Click **"Send to Vault"**

**Note**: There's a 2-second delay to simulate a network request. Your idea will then appear in the dashboard with auto-generated research data!

### 4. Viewing Idea Details

Click any idea card to see:

- **Concept**: Full description
- **Readiness Score**: 0-100 rating
- **Key Metrics**:
  - Market size (TAM)
  - Target audience
  - Top competitor
  - Market trend
- **Growth Chart**: 4-year market projection
- **Competitor Analysis**: 3 competitors with strengths/weaknesses
- **Action Plan**: 3 suggested next steps

**Navigation**: Click the "Back to Vault" button to return to the dashboard.

### 5. Navigation

#### Desktop (> 1024px)
- Use the fixed left sidebar to navigate
- Menu items: Vault, Weekly Digest, Board, Settings
- Log Out button at the bottom

#### Mobile (< 1024px)
- Top header with hamburger menu icon
- Bottom navigation bar with 4 main items
- Tap hamburger to open full sidebar menu

### 6. Logging Out

Click the **"Log Out"** button in the sidebar to return to the landing page.

## 🎨 Design Features to Notice

### Animations
- **Landing Page**: Watch the gradient orbs pulse and glow
- **Idea Cards**: Notice the stagger animation when loading
- **Hover Effects**: Cards lift up on hover
- **Status Badges**: "Analyzing" badges pulse with animation
- **Modals**: Smooth scale and blur effects

### Responsive Design
Try resizing your browser window to see:
- Sidebar transforms to hamburger menu on mobile
- Bottom navigation appears on small screens
- Grid layouts adjust automatically
- Charts resize responsively

### Glassmorphism
Notice the frosted glass effect on:
- Modal backdrops
- Sidebar backgrounds
- Card hover states

## 📊 Pre-Loaded Ideas

The app comes with 4 sample ideas to explore:

1. **AI-Powered Email Assistant** - Readiness: 87%
2. **LocalChef - Home Cook Marketplace** - Readiness: 72%
3. **DevPortfolio - No-Code Portfolio Builder** - Readiness: 91%
4. **MindfulMeetings - AI Meeting Wellness Coach** - Readiness: 79%

Each has realistic market research data, competitor analysis, and growth projections.

## 💡 Tips

1. **Add Multiple Ideas**: The more ideas you add, the better you can see the grid layout adapt
2. **Try Different Input Types**: Switch between Text, Voice, and Image tabs to see different interactions
3. **Mobile Testing**: Open the app on your phone or use Chrome DevTools device emulation
4. **Check the Charts**: The growth projections are fully interactive - hover over bars for details
5. **Read Competitor Analysis**: Each competitor has specific strengths and weaknesses listed

## 🔧 Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is taken, Vite will automatically use the next available port.

### Styles Not Loading
Make sure Tailwind CSS is properly configured. The app uses Tailwind v4 with the new `@import` syntax.

### Build Warnings
The "chunks larger than 500kB" warning is expected. For a production app, you'd want to implement code splitting.

## 📱 Best Viewing Experience

- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Screen Size**: Optimized for 375px (mobile) to 1920px (desktop)

## 🎓 Learning Points

This app demonstrates:
- Modern React patterns (functional components, hooks)
- TypeScript for type safety
- Tailwind CSS for rapid styling
- Framer Motion for smooth animations
- Responsive design patterns
- Component composition
- State management with useState
- Conditional rendering
- Form handling
- Data visualization with Recharts

## 🚀 Next Steps

Try enhancing the app:
1. Add search/filter functionality
2. Implement idea categories
3. Add export to PDF feature
4. Create a comparison view for multiple ideas
5. Build the actual Weekly Digest feature
6. Add data persistence with localStorage

Enjoy building with Ideas Vault! 💡
