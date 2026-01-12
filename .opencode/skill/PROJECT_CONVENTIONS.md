# IdeasVault UI - Project Conventions

Code standards and conventions specific to this project.

## File Naming

### Components
- **PascalCase** for component files: `IdeaCard.tsx`
- **PascalCase** for component names: `export const IdeaCard`
- Test files: `IdeaCard.test.tsx`
- Story files: `IdeaCard.stories.tsx`

### Hooks
- **camelCase** with `use` prefix: `useIdeas.ts`
- Test files: `useIdeas.test.ts`

### Utilities
- **camelCase** for utility files: `formatDate.ts`
- Test files: `formatDate.test.ts`

### Constants
- **UPPER_SNAKE_CASE** for constants: `API_BASE_URL`
- File: `constants.ts`

---

## Directory Structure

```
src/
├── components/           # React components
│   ├── features/        # Feature-specific components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── contexts/            # React Context providers
├── pages/               # Page components
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Constants and configuration
├── services/            # API services
└── assets/              # Static assets
```

---

## Component Organization

### Component File Structure
```typescript
// 1. Imports
import { FC } from 'react';
import { Stack } from '@mantine/core';
import { useIdeas } from '../../hooks/useIdeas';
import { formatDate } from '../../utils/formatDate';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Constants (component-specific)
const DEFAULT_VALUE = 10;

// 4. Component
export const Component: FC<ComponentProps> = (props) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
};

// 5. Sub-components (if any)
const SubComponent = () => {
  // ...
};
```

### Export Pattern
- **Named exports** for components: `export const Component`
- **Default exports** for pages: `export default ComponentPage`

---

## TypeScript Conventions

### Interface Naming
```typescript
// Props interfaces
interface IdeaCardProps {
  // ...
}

// Data models
interface Idea {
  id: string;
  title: string;
  // ...
}

// API responses
interface IdeasResponse {
  data: Idea[];
  total: number;
}
```

### Type vs Interface
- **Interfaces** for object shapes (preferred)
- **Types** for unions, intersections, primitives
```typescript
// Interface
interface User {
  id: string;
  name: string;
}

// Type for union
type Status = 'idle' | 'loading' | 'success' | 'error';
```

### Generic Components
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  // ...
}
```

---

## State Management

### Local State
Use `useState` for component-specific state:
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Shared State (Context)
Use React Context for app-wide state:
```typescript
const { ideas, addIdea } = useIdeas();
```

### Form State
Use Mantine's `useForm` for forms:
```typescript
const form = useForm({
  initialValues: { /* ... */ },
  validate: { /* ... */ },
});
```

---

## Mantine UI Conventions

### Component Usage
```typescript
import { Button, Stack, Card, Title } from '@mantine/core';

// Always use semantic Mantine components
<Button>Submit</Button>  // ✅
<button>Submit</button>  // ❌

// Use Stack/Group for layout
<Stack gap="md">  // ✅
<div style={{ display: 'flex' }}>  // ❌
```

### Styling
```typescript
// Use Mantine props
<Box p="md" bg="gray.1">  // ✅

// Use sx for complex styles
<Box sx={(theme) => ({
  backgroundColor: theme.colors.blue[6],
  '&:hover': {
    backgroundColor: theme.colors.blue[7],
  }
})}>
```

### Theme Values
```typescript
// Use theme tokens
gap="md"  // ✅
gap={16}  // ❌

// Responsive
<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
```

---

## Testing Conventions

### Test Structure
```typescript
describe('ComponentName', () => {
  // Setup
  const defaultProps = { /* ... */ };
  
  describe('rendering', () => {
    it('renders without crashing', () => {});
    it('displays correct content', () => {});
  });
  
  describe('interactions', () => {
    it('handles click', () => {});
    it('handles form submission', () => {});
  });
  
  describe('edge cases', () => {
    it('handles empty data', () => {});
    it('handles errors', () => {});
  });
  
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {});
    it('supports keyboard navigation', () => {});
  });
});
```

### Test Coverage Goals
- **Components**: >80%
- **Hooks**: >90%
- **Utils**: >95%

---

## Accessibility Standards

### ARIA Attributes
```typescript
// Always provide accessible labels
<button aria-label="Delete idea">
  <IconTrash />
</button>

// Use semantic HTML
<nav>  // ✅
<div role="navigation">  // ❌
```

### Keyboard Support
```typescript
// Add keyboard handlers for clickable elements
<div
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabIndex={0}
>
```

### Focus Management
```typescript
// Manage focus for modals, dialogs
const modalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (opened) {
    modalRef.current?.focus();
  }
}, [opened]);
```

---

## Code Quality

### ESLint Rules
- **No unused variables**
- **No console.log** in production
- **Prefer const** over let
- **Use arrow functions** for components

### Comments
```typescript
// Good: Explain WHY, not WHAT
// Disable button during API call to prevent double submission
const isDisabled = isLoading;

// Bad: Obvious comment
// Set loading to true
setLoading(true);
```

### JSDoc for Public APIs
```typescript
/**
 * Formats a date string to human-readable format
 * 
 * @param date - ISO date string
 * @param format - Format pattern (default: 'MMM dd, yyyy')
 * @returns Formatted date string
 * @example
 * formatDate('2024-01-10') // "Jan 10, 2024"
 */
export function formatDate(date: string, format?: string): string {
  // ...
}
```

---

## Git Commit Conventions

### Commit Message Format
```
type(scope): short description

Longer description if needed

Fixes #123
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactoring
- **docs**: Documentation
- **test**: Tests
- **style**: Formatting
- **chore**: Build, dependencies

### Examples
```
feat(ideas): add delete functionality to IdeaCard
fix(form): prevent submission with empty title
refactor(hooks): extract useLocalStorage from useIdeas
docs(readme): add setup instructions
test(ideas): add tests for IdeaCard component
```

---

## Performance Best Practices

### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Code Splitting
```typescript
// Lazy load pages
const IdeasPage = lazy(() => import('./pages/IdeasPage'));

// Use Suspense
<Suspense fallback={<Loader />}>
  <IdeasPage />
</Suspense>
```

### Bundle Optimization
- Import only what you need from Mantine
- Use dynamic imports for large dependencies
- Optimize images (WebP, lazy loading)

---

## API Integration

### Service Pattern
```typescript
// services/ideasService.ts
export const ideasService = {
  async getAll(): Promise<Idea[]> {
    // API call
  },
  
  async create(idea: CreateIdeaDto): Promise<Idea> {
    // API call
  },
  
  async update(id: string, idea: UpdateIdeaDto): Promise<Idea> {
    // API call
  },
  
  async delete(id: string): Promise<void> {
    // API call
  },
};
```

### Error Handling
```typescript
try {
  const ideas = await ideasService.getAll();
  setIdeas(ideas);
} catch (error) {
  if (error instanceof ApiError) {
    showNotification({
      title: 'Error',
      message: error.message,
      color: 'red',
    });
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## Environment Variables

### Naming
```
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=IdeasVault
```

### Usage
```typescript
const API_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## Documentation

### Component Documentation
- **Props table** in README or Storybook
- **Usage examples** in JSDoc
- **Accessibility notes** for complex components

### README Sections
- Installation
- Usage
- Configuration
- Development
- Testing
- Deployment

---

## Code Review Checklist

Before submitting PR:
- [ ] TypeScript types are complete
- [ ] Tests pass and coverage is adequate
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] No console.logs or commented code
- [ ] Component is responsive
- [ ] ESLint passes with no warnings
- [ ] Code follows project conventions
- [ ] Documentation updated if needed

---

## Quick Reference

| Convention | Example | Don't |
|-----------|---------|-------|
| Component | `IdeaCard.tsx` | `ideaCard.tsx` |
| Hook | `useIdeas.ts` | `Ideas.ts` |
| Constant | `API_BASE_URL` | `apiBaseUrl` |
| Type | `interface IdeaCardProps` | `type IdeaCardProps` |
| Export | `export const IdeaCard` | `export default` |
| Layout | `<Stack gap="md">` | `<div style={{}}>` |
| State | `const [count, setCount]` | `let count` |
| Props | Destructure | `props.name` |

---

**Reminder:** Consistency is key. Follow these conventions to maintain code quality!
