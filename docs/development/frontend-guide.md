# Frontend Development Guide

This guide covers frontend development patterns, best practices, and workflows for Ideas Vault using React, TypeScript, and Tailwind CSS.

## Table of Contents

- [Project Structure](#project-structure)
- [Component Development](#component-development)
- [State Management](#state-management)
- [Styling with Tailwind CSS](#styling-with-tailwind-css)
- [TypeScript Patterns](#typescript-patterns)
- [Routing](#routing)
- [Adding New Features](#adding-new-features)
- [Performance Optimization](#performance-optimization)
- [Common Pitfalls](#common-pitfalls)

## Project Structure

```
ideasvault-ui/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main dashboard view
│   │   ├── CaptureModal.tsx # Idea capture modal
│   │   ├── IdeaDetailView.tsx
│   │   ├── AppLayout.tsx    # Layout wrapper
│   │   ├── LandingPage.tsx  # Landing page
│   │   ├── Settings.tsx     # Settings page
│   │   └── index.ts         # Component exports
│   │
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # localStorage wrapper
│   │   ├── aiAnalyzer.ts    # AI analysis logic
│   │   ├── speechRecognition.ts
│   │   └── onboarding.ts
│   │
│   ├── App.tsx              # Root component & routing
│   ├── main.tsx             # Application entry point
│   ├── constants.ts         # Types and constants
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── eslint.config.js        # ESLint config
└── package.json            # Dependencies
```

### Directory Guidelines

- **components/** - All React components (organized by feature if needed)
- **utils/** - Pure utility functions and services
- **constants.ts** - Type definitions, interfaces, and constants
- **App.tsx** - Main app component with routing logic
- **main.tsx** - Application bootstrap and providers

## Component Development

### Component Architecture

Ideas Vault follows a functional component pattern with React hooks:

```typescript
import { useState, useEffect } from 'react';

interface MyComponentProps {
  title: string;
  onAction: (value: string) => void;
  isLoading?: boolean;
}

export function MyComponent({ title, onAction, isLoading = false }: MyComponentProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Side effects here
    console.log('Component mounted');
    
    return () => {
      // Cleanup
      console.log('Component unmounted');
    };
  }, []);

  const handleSubmit = () => {
    if (value.trim()) {
      onAction(value);
      setValue('');
    }
  };

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {isLoading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 text-white rounded"
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
```

### Component Best Practices

#### 1. Single Responsibility

Each component should have one clear purpose:

```typescript
// ❌ Bad: Component doing too much
export function IdeaCard({ idea, onEdit, onDelete, onShare, onExport }) {
  // 200 lines of mixed concerns
}

// ✅ Good: Focused components
export function IdeaCard({ idea, onSelect }) {
  return (
    <div onClick={() => onSelect(idea)}>
      <IdeaHeader title={idea.title} />
      <IdeaMetrics readinessScore={idea.readinessScore} />
      <IdeaTags tags={idea.tags} />
    </div>
  );
}
```

#### 2. Props Interface

Always define explicit prop types:

```typescript
// ✅ Good: Clear interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = ''
}: ButtonProps) {
  // Implementation
}
```

#### 3. Component Composition

Build complex UIs from simple components:

```typescript
// Dashboard.tsx
export function Dashboard({ ideas, onOpenCapture, onSelectIdea }) {
  return (
    <div className="p-6">
      <DashboardHeader onOpenCapture={onOpenCapture} />
      <DashboardStats ideas={ideas} />
      <IdeaGrid ideas={ideas} onSelectIdea={onSelectIdea} />
    </div>
  );
}

// IdeaGrid.tsx
export function IdeaGrid({ ideas, onSelectIdea }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map(idea => (
        <IdeaCard key={idea.id} idea={idea} onSelect={onSelectIdea} />
      ))}
    </div>
  );
}
```

#### 4. Custom Hooks

Extract reusable logic into custom hooks:

```typescript
// useIdeas.ts
import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import type { Idea } from '../constants';

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const storedIdeas = storage.getIdeas();
        setIdeas(storedIdeas);
      } catch (error) {
        console.error('Failed to load ideas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIdeas();
  }, []);

  const addIdea = (idea: Idea) => {
    storage.addIdea(idea);
    setIdeas(prev => [idea, ...prev]);
  };

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    storage.updateIdea(id, updates);
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, ...updates } : idea
    ));
  };

  const deleteIdea = (id: string) => {
    storage.deleteIdea(id);
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  return { ideas, isLoading, addIdea, updateIdea, deleteIdea };
}

// Usage in component
function Dashboard() {
  const { ideas, isLoading, addIdea } = useIdeas();
  
  if (isLoading) return <LoadingSpinner />;
  
  return <IdeaList ideas={ideas} onAdd={addIdea} />;
}
```

### Component Export Pattern

Use a central `index.ts` for cleaner imports:

```typescript
// components/index.ts
export { Dashboard } from './Dashboard';
export { CaptureModal } from './CaptureModal';
export { IdeaDetailView } from './IdeaDetailView';
export { AppLayout } from './AppLayout';
export { LandingPage } from './LandingPage';
export { Settings } from './Settings';

// Usage
import { Dashboard, CaptureModal, IdeaDetailView } from './components';
```

## State Management

Ideas Vault uses a local-first architecture with localStorage and React state.

### Local State

For component-specific state:

```typescript
function CaptureModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(title, description, tags);
      // Reset form
      setTitle('');
      setDescription('');
      setTags([]);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Component JSX
}
```

### Lifted State

For shared state between components, lift to common ancestor:

```typescript
// App.tsx
function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);

  const handleSubmitIdea = async (title, description, tags) => {
    const newIdea = createIdea(title, description, tags);
    setIdeas([newIdea, ...ideas]);
    storage.addIdea(newIdea);
  };

  return (
    <>
      <Dashboard 
        ideas={ideas}
        onOpenCapture={() => setIsCaptureModalOpen(true)}
      />
      <CaptureModal
        isOpen={isCaptureModalOpen}
        onClose={() => setIsCaptureModalOpen(false)}
        onSubmit={handleSubmitIdea}
      />
    </>
  );
}
```

### Storage Layer

Use the storage utility for persistence:

```typescript
// utils/storage.ts
import type { Idea } from '../constants';

const STORAGE_KEY = 'ideasvault_ideas';

export const storage = {
  getIdeas(): Idea[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const ideas = JSON.parse(data);
      return ideas.map((idea: any) => ({
        ...idea,
        createdAt: new Date(idea.createdAt)
      }));
    } catch (error) {
      console.error('Error loading ideas:', error);
      return [];
    }
  },

  saveIdeas(ideas: Idea[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch (error) {
      console.error('Error saving ideas:', error);
    }
  },

  addIdea(idea: Idea): void {
    const ideas = this.getIdeas();
    ideas.unshift(idea);
    this.saveIdeas(ideas);
  },

  updateIdea(id: string, updates: Partial<Idea>): void {
    const ideas = this.getIdeas();
    const index = ideas.findIndex(i => i.id === id);
    if (index !== -1) {
      ideas[index] = { ...ideas[index], ...updates };
      this.saveIdeas(ideas);
    }
  },

  deleteIdea(id: string): void {
    const ideas = this.getIdeas().filter(i => i.id !== id);
    this.saveIdeas(ideas);
  }
};
```

### Future: Context API

For complex state that needs deep propagation:

```typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function Settings() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Styling with Tailwind CSS

Ideas Vault uses Tailwind CSS v4 for styling with a dark theme aesthetic.

### Tailwind Patterns

#### Layout

```typescript
// Container with padding and max width
<div className="container mx-auto px-4 py-8 max-w-7xl">
  {/* Content */}
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Flexbox layout
<div className="flex items-center justify-between gap-4">
  <h1 className="text-2xl font-bold">Title</h1>
  <button className="px-4 py-2 bg-indigo-600">Action</button>
</div>
```

#### Colors (Dark Theme)

```typescript
// Background colors
className="bg-slate-900"     // Main background
className="bg-slate-800"     // Card background
className="bg-slate-700"     // Input background

// Text colors
className="text-white"       // Primary text
className="text-slate-300"   // Secondary text
className="text-slate-400"   // Muted text

// Accent colors
className="bg-indigo-600"    // Primary action
className="bg-violet-600"    // Secondary accent
className="bg-emerald-500"   // Success
className="bg-rose-500"      // Error/danger
```

#### Interactive Elements

```typescript
// Button variants
<button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all">
  Primary Action
</button>

<button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
  Secondary Action
</button>

// Input fields
<input
  type="text"
  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  placeholder="Enter text..."
/>
```

#### Cards and Surfaces

```typescript
<div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
  <h3 className="text-xl font-bold text-white mb-2">Card Title</h3>
  <p className="text-slate-300">Card content goes here.</p>
</div>
```

#### Responsive Design

```typescript
// Mobile-first approach
<div className="
  p-4 md:p-6 lg:p-8           // Padding scales up
  text-base md:text-lg        // Font size increases
  grid-cols-1 md:grid-cols-2  // Single to double column
  lg:grid-cols-3              // Triple column on large screens
">
  {/* Content */}
</div>
```

### Custom Styling

For one-off custom styles, use inline styles or CSS modules:

```typescript
// Inline styles (sparingly)
<div style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}>
  {/* Content */}
</div>

// CSS modules (for complex styles)
import styles from './MyComponent.module.css';

<div className={styles.customContainer}>
  {/* Content */}
</div>
```

## TypeScript Patterns

### Type Definitions

Define types in `constants.ts`:

```typescript
// constants.ts
export type InputType = 'text' | 'voice' | 'image';
export type IdeaStatus = 'ready' | 'analyzing';

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export interface GrowthMetric {
  year: number;
  value: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: IdeaStatus;
  inputType: InputType;
  imageData?: string;
  readinessScore: number;
  marketSize: string;
  targetAudience: string;
  competitors: Competitor[];
  growthMetrics: GrowthMetric[];
  actionPlan: string[];
  createdAt: Date;
}
```

### Type Guards

```typescript
function isAnalyzingIdea(idea: Idea): boolean {
  return idea.status === 'analyzing';
}

function hasImageData(idea: Idea): idea is Idea & { imageData: string } {
  return idea.imageData !== undefined;
}
```

### Generic Types

```typescript
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(asyncFn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });

  // Implementation
  return state;
}
```

### Utility Types

```typescript
// Partial updates
function updateIdea(id: string, updates: Partial<Idea>) {
  // Only specified fields need to be provided
}

// Pick specific fields
type IdeaSummary = Pick<Idea, 'id' | 'title' | 'readinessScore'>;

// Omit fields
type IdeaInput = Omit<Idea, 'id' | 'createdAt'>;

// Required fields
type RequiredIdea = Required<Idea>;
```

## Routing

Ideas Vault uses React Router v7 for navigation.

### Route Structure

```typescript
// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Protected routes */}
      <Route path="/vault" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/vault/settings" element={<AppLayout><Settings /></AppLayout>} />
      <Route path="/vault/idea/:id" element={<AppLayout><IdeaDetailView /></AppLayout>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

### Navigation

```typescript
import { useNavigate, useParams } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleClick = () => {
    navigate('/vault/idea/123');
  };

  const handleBack = () => {
    navigate(-1); // Go back
  };

  return (
    <div>
      <p>Current ID: {id}</p>
      <button onClick={handleClick}>View Idea</button>
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
}
```

### Link Component

```typescript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="flex gap-4">
      <Link to="/" className="text-white hover:text-indigo-400">
        Home
      </Link>
      <Link to="/vault" className="text-white hover:text-indigo-400">
        Vault
      </Link>
      <Link to="/vault/settings" className="text-white hover:text-indigo-400">
        Settings
      </Link>
    </nav>
  );
}
```

## Adding New Features

### Step-by-Step Process

#### 1. Define Types

```typescript
// constants.ts
export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf';
  includeAnalysis: boolean;
  selectedIds?: string[];
}
```

#### 2. Create Utility Functions

```typescript
// utils/export.ts
import type { Idea, ExportOptions } from '../constants';

export async function exportIdeas(
  ideas: Idea[],
  options: ExportOptions
): Promise<Blob> {
  switch (options.format) {
    case 'json':
      return exportAsJson(ideas);
    case 'csv':
      return exportAsCsv(ideas);
    case 'pdf':
      return exportAsPdf(ideas);
  }
}

function exportAsJson(ideas: Idea[]): Blob {
  const json = JSON.stringify(ideas, null, 2);
  return new Blob([json], { type: 'application/json' });
}
```

#### 3. Create Components

```typescript
// components/ExportModal.tsx
import { useState } from 'react';
import { exportIdeas } from '../utils/export';
import type { Idea, ExportOptions } from '../constants';

interface ExportModalProps {
  isOpen: boolean;
  ideas: Idea[];
  onClose: () => void;
}

export function ExportModal({ isOpen, ideas, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<ExportOptions['format']>('json');
  const [includeAnalysis, setIncludeAnalysis] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await exportIdeas(ideas, { format, includeAnalysis });
      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ideas.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Export Ideas</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ExportOptions['format'])}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeAnalysis}
              onChange={(e) => setIncludeAnalysis(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-slate-300">Include AI analysis</span>
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### 4. Integrate in App

```typescript
// App.tsx
import { ExportModal } from './components/ExportModal';

function App() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <>
      <Dashboard onOpenExport={() => setIsExportModalOpen(true)} />
      <ExportModal
        isOpen={isExportModalOpen}
        ideas={ideas}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
}
```

#### 5. Export from Index

```typescript
// components/index.ts
export { ExportModal } from './ExportModal';
```

## Performance Optimization

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

function Dashboard({ ideas }) {
  // Memoize expensive computations
  const stats = useMemo(() => {
    return {
      total: ideas.length,
      avgScore: ideas.reduce((sum, i) => sum + i.readinessScore, 0) / ideas.length,
      byStatus: ideas.reduce((acc, i) => {
        acc[i.status] = (acc[i.status] || 0) + 1;
        return acc;
      }, {})
    };
  }, [ideas]);

  // Memoize callbacks
  const handleSelect = useCallback((idea: Idea) => {
    navigate(`/vault/idea/${idea.id}`);
  }, [navigate]);

  return <DashboardView stats={stats} onSelect={handleSelect} />;
}
```

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyChart data={chartData} />
    </Suspense>
  );
}
```

### List Virtualization

For long lists, consider using virtual scrolling (future enhancement):

```typescript
// Using react-window (to be added)
import { FixedSizeList } from 'react-window';

function IdeaList({ ideas }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <IdeaCard idea={ideas[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={ideas.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Common Pitfalls

### 1. Stale Closures

```typescript
// ❌ Bad: Stale closure
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // Always uses initial count value!
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Missing dependency

  return <div>{count}</div>;
}

// ✅ Good: Use functional update
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // Uses latest value
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

### 2. Missing Dependencies

```typescript
// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchData(userId);
}, []); // userId is missing

// ✅ Good: Include all dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### 3. Unnecessary Re-renders

```typescript
// ❌ Bad: New object on every render
function Parent() {
  const config = { theme: 'dark' }; // New object every time
  return <Child config={config} />;
}

// ✅ Good: Memoize or move outside
const config = { theme: 'dark' }; // Outside component

function Parent() {
  return <Child config={config} />;
}

// Or use useMemo
function Parent() {
  const config = useMemo(() => ({ theme: 'dark' }), []);
  return <Child config={config} />;
}
```

### 4. Not Handling Loading States

```typescript
// ❌ Bad: No loading state
function IdeaList({ ideas }) {
  return (
    <div>
      {ideas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
    </div>
  );
}

// ✅ Good: Handle all states
function IdeaList({ ideas, isLoading, error }) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (ideas.length === 0) return <EmptyState />;
  
  return (
    <div>
      {ideas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
    </div>
  );
}
```

### 5. Mutating State Directly

```typescript
// ❌ Bad: Mutating state
const handleAddTag = (tag: string) => {
  idea.tags.push(tag); // Direct mutation!
  setIdea(idea);
};

// ✅ Good: Create new object
const handleAddTag = (tag: string) => {
  setIdea({
    ...idea,
    tags: [...idea.tags, tag]
  });
};
```

## Next Steps

- Review [Testing Guide](./testing-guide.md) for testing patterns
- Check [Code Style Guide](./code-style.md) for conventions
- Explore [Backend Guide](./backend-guide.md) for API integration (future)

---

**Happy coding with React and TypeScript!** ⚛️
