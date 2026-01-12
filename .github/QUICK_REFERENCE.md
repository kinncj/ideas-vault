# OpenCode Quick Reference

Quick reference for using custom agents, prompts, and instructions in this project.

## 🤖 Custom Agents

Invoke agents in GitHub Copilot Chat with `@agent-name`:

| Agent | Purpose | Example |
|-------|---------|---------|
| `@accessibility` | WCAG compliance, a11y patterns | `@accessibility Review this form for keyboard navigation` |
| `@api-architect` | API design, service architecture | `@api-architect Design REST API for user management` |
| `@expert-react-frontend-engineer` | React 19.2, hooks, performance | `@expert-react-frontend-engineer Optimize this component` |
| `@mantine-ui-specialist` | Mantine components, theming | `@mantine-ui-specialist Create a responsive card grid` |
| `@playwright-tester` | E2E testing, test patterns | `@playwright-tester Write tests for checkout flow` |

## 📋 Instructions (Auto-Applied)

These instructions automatically apply when working on matching files:

| Instruction | Applied To | Purpose |
|-------------|-----------|----------|
| `reactjs.instructions.md` | `**/*.jsx, **/*.tsx` | React best practices, hooks, patterns |
| `typescript-5-es2022.instructions.md` | `**/*.ts` | TypeScript standards, type safety |
| `a11y.instructions.md` | `**` (all files) | Accessibility guidelines, WCAG |
| `playwright-typescript.instructions.md` | `**/*.spec.ts` | E2E test patterns |
| `nodejs-javascript-vitest.instructions.md` | `**/*.test.ts` | Unit test patterns |

## 🎯 Prompts

Use prompts with the `/` command in Copilot Chat:

| Prompt | Usage | Purpose |
|--------|-------|---------|
| `/architecture-blueprint` | `/architecture-blueprint Generate system diagram` | Create architecture docs |
| `/breakdown-feature-implementation` | `/breakdown-feature-implementation User dashboard` | Implementation plan |
| `/breakdown-feature-prd` | `/breakdown-feature-prd Payment integration` | Product requirements |
| `/breakdown-plan` | `/breakdown-plan Sprint goals` | Task planning |
| `/review-and-refactor` | `/review-and-refactor` | Code review |

## 💡 Common Use Cases

### 1. Building a New Feature

```
# Step 1: Create PRD
/breakdown-feature-prd Shopping cart with checkout

# Step 2: Get implementation plan
/breakdown-feature-implementation Shopping cart feature

# Step 3: Build UI with Mantine
@mantine-ui-specialist Create shopping cart component with:
- Product list
- Quantity controls
- Total calculation
- Checkout button

# Step 4: Ensure accessibility
@accessibility Review shopping cart for WCAG compliance

# Step 5: Add tests
@playwright-tester Write E2E tests for cart checkout flow
```

### 2. Improving Existing Code

```
# Code review
/review-and-refactor

# Accessibility check
@accessibility Audit this page for keyboard navigation

# Performance optimization
@expert-react-frontend-engineer Optimize re-renders in this component
```

### 3. Creating Forms

```
@mantine-ui-specialist @accessibility

Create a registration form with:
- Email, password, confirm password
- Real-time validation
- Accessible error messages
- Mobile responsive
```

### 4. API Development

```
@api-architect

Design REST API for:
- User CRUD operations
- JWT authentication
- Rate limiting
- Circuit breaker pattern
Language: TypeScript
Framework: Express
```

### 5. Testing

```
# Unit tests
Write unit tests for UserProfile component with Vitest

# E2E tests
@playwright-tester

Create E2E test suite for:
- User login
- Dashboard navigation
- Form submission
- Error handling
```

## 🎨 Mantine UI Quick Reference

### Common Components

```typescript
// Button with variants
<Button variant="filled" color="blue">Primary</Button>
<Button variant="light" color="gray">Secondary</Button>
<Button variant="subtle" color="red">Danger</Button>

// Form with validation
const form = useForm({
  initialValues: { email: '', password: '' },
  validate: {
    email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    password: (val) => (val.length >= 6 ? null : 'Min 6 characters'),
  },
});

// Responsive layout
<Grid>
  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
    <Card>Content</Card>
  </Grid.Col>
</Grid>

// Dark mode toggle
const { colorScheme, toggleColorScheme } = useMantineColorScheme();
```

## 🧪 Testing Quick Reference

### Vitest (Unit Tests)

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('UserProfile', () => {
  it('displays user name', () => {
    render(<UserProfile name="John" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### Playwright (E2E Tests)

```typescript
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## ♿ Accessibility Checklist

Quick checks before committing:

- [ ] Semantic HTML (`<button>`, `<nav>`, `<main>`)
- [ ] ARIA labels on icons and decorative elements
- [ ] Keyboard navigation works (`Tab`, `Enter`, `Escape`)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Screen reader tested (at least quick check)
- [ ] Forms have proper labels and error messages
- [ ] Images have alt text

## 🚀 Performance Tips

### React Optimization

```typescript
// Memoize expensive computations
const result = useMemo(() => expensiveCalc(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => doSomething(id), [id]);

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Code splitting
<Suspense fallback={<Loader />}>
  <HeavyComponent />
</Suspense>
```

## 📚 Quick Links

- [Copilot Setup Details](.opencode/COPILOT_SETUP.md)
- [Project README](../README.md)
- [Mantine Documentation](https://mantine.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)

## 🔥 Pro Tips

1. **Combine agents**: Use multiple agents in one query for comprehensive solutions
   ```
   @mantine-ui-specialist @accessibility Create an accessible modal
   ```

2. **Context matters**: Reference files or code in your prompts
   ```
   @expert-react-frontend-engineer Optimize the UserList component in src/components/
   ```

3. **Iterative refinement**: Start with basics, then refine
   ```
   Create a basic form
   [Review output]
   Add validation and error handling
   [Review output]
   Make it accessible with WCAG AA compliance
   ```

4. **Use prompts for templates**: Prompts give you structured output
   ```
   /breakdown-feature-implementation [your feature]
   ```

5. **Review instructions**: Check `.opencode/instructions/` to understand what standards are enforced

---

For detailed information, see [COPILOT_SETUP.md](COPILOT_SETUP.md)
