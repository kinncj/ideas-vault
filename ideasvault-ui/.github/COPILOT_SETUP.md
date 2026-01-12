# OpenCode Copilot Enhancements

This project has been enhanced with custom agents, prompts, and instructions from the [awesome-copilot](https://github.com/github/awesome-copilot) repository to supercharge your GitHub Copilot experience.

## 📁 Directory Structure

```
.opencode/
├── agent/                  # Custom specialized agents
│   ├── accessibility.agent.md          # WCAG expert for building accessible UIs
│   ├── api-architect.agent.md          # API design and implementation expert
│   ├── expert-react-frontend-engineer.agent.md  # React 19.2 specialist
│   ├── mantine-ui-specialist.agent.md  # Mantine UI library expert
│   └── playwright-tester.agent.md      # E2E testing specialist
├── instructions/           # Coding standards and best practices
│   ├── a11y.instructions.md            # Accessibility guidelines
│   ├── nodejs-javascript-vitest.instructions.md  # Vitest testing patterns
│   ├── playwright-typescript.instructions.md     # Playwright E2E testing
│   ├── reactjs.instructions.md         # React best practices
│   └── typescript-5-es2022.instructions.md      # TypeScript standards
└── prompts/               # Task-specific prompts
    ├── architecture-blueprint-generator.prompt.md  # Generate architecture docs
    ├── breakdown-feature-implementation.prompt.md  # Break down features
    ├── breakdown-feature-prd.prompt.md             # Create PRDs
    ├── breakdown-plan.prompt.md                     # Create implementation plans
    └── review-and-refactor.prompt.md               # Code review and refactoring
```

## 🤖 Custom Agents

Agents are specialized AI personas that provide expert-level guidance for specific domains:

### Available Agents

1. **Accessibility Agent** - WCAG 2.1/2.2 expert
   - Ensures WCAG AA/AAA compliance
   - Provides keyboard navigation patterns
   - Implements screen reader support
   - Reviews code for accessibility issues

2. **API Architect** - API design specialist
   - Designs RESTful APIs with best practices
   - Creates service layer architecture
   - Implements resilience patterns (circuit breaker, retry, etc.)
   - Provides complete working API implementations

3. **Expert React Frontend Engineer** - React 19.2 specialist
   - Modern React patterns with latest hooks
   - Server Components and Actions API
   - Performance optimization
   - TypeScript integration

4. **Mantine UI Specialist** - Mantine v7+ expert
   - Component composition patterns
   - Theming and dark mode
   - Responsive layouts
   - Form handling with @mantine/form

5. **Playwright Tester** - E2E testing expert
   - Playwright test patterns
   - Page Object Model
   - Visual regression testing
   - CI/CD integration

### Using Agents

Agents can be invoked in GitHub Copilot Chat:

```
@accessibility Review this component for WCAG compliance
@mantine-ui-specialist Create a responsive dashboard layout
@playwright-tester Write E2E tests for the login flow
```

## 📋 Instructions

Instructions automatically apply to files based on patterns and provide contextual coding standards:

- **reactjs.instructions.md** - Applied to `**/*.jsx, **/*.tsx` files
- **typescript-5-es2022.instructions.md** - Applied to `**/*.ts` files
- **a11y.instructions.md** - Applied to all files for accessibility
- **playwright-typescript.instructions.md** - Applied to test files
- **nodejs-javascript-vitest.instructions.md** - Applied to test files

These instructions are automatically loaded by Copilot when working on matching files.

## 🎯 Prompts

Prompts are reusable templates for common tasks. Use them with the `/` command in Copilot Chat:

### Available Prompts

1. **Architecture Blueprint Generator**
   ```
   /architecture-blueprint Generate architecture documentation
   ```

2. **Feature Breakdown**
   ```
   /breakdown-feature Create implementation plan for user authentication
   ```

3. **PRD Creation**
   ```
   /breakdown-feature-prd Write PRD for the dashboard feature
   ```

4. **Code Review**
   ```
   /review-and-refactor Review and refactor this component
   ```

## 🚀 Getting Started

### Prerequisites

- GitHub Copilot subscription
- VS Code with GitHub Copilot extension
- OpenCode CLI (optional)

### Usage Examples

#### 1. Building an Accessible Form

```
@accessibility @mantine-ui-specialist 

Create a registration form with:
- Email and password fields
- Validation
- WCAG AA compliance
- Proper ARIA labels
- Keyboard navigation
```

#### 2. Creating Feature Implementation Plan

```
/breakdown-feature-implementation

Feature: User Dashboard
- User profile display
- Recent activity feed
- Quick actions panel
```

#### 3. API Development

```
@api-architect

Create a REST API for:
- User management (CRUD)
- Authentication with JWT
- Circuit breaker pattern
- Rate limiting
Language: TypeScript
```

#### 4. E2E Testing

```
@playwright-tester

Write comprehensive E2E tests for:
- User login flow
- Dashboard navigation
- Form submission with validation
```

## 🎨 Theming with Mantine

The project uses Mantine UI v7+ for components. Key features:

- **Dark mode** - Automatic dark/light theme switching
- **Responsive** - Mobile-first responsive layouts
- **Accessible** - WCAG-compliant components out of the box
- **Customizable** - Extensive theme configuration

See `mantine-ui-specialist.agent.md` for detailed usage patterns.

## 🧪 Testing Strategy

### Unit Tests (Vitest)
- Fast, isolated tests for components and utilities
- See `nodejs-javascript-vitest.instructions.md`

### E2E Tests (Playwright)
- Full user journey testing
- Visual regression testing
- See `playwright-typescript.instructions.md`

Run tests:
```bash
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:coverage # Coverage report
```

## 📚 Best Practices

### React Development
- Use functional components with hooks
- Follow React 19.2 patterns (use(), Actions API)
- Implement proper error boundaries
- Optimize with React.memo, useMemo, useCallback when needed

### TypeScript
- Use strict mode
- Avoid `any` - prefer `unknown` with type guards
- Define proper interfaces for all props and state
- Use discriminated unions for complex state

### Accessibility
- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Meet WCAG 2.1 AA standards

### Testing
- Follow AAA pattern (Arrange, Act, Assert)
- Test behavior, not implementation
- Use Page Object Model for E2E tests
- Maintain high code coverage (>80%)

## 🔧 Customization

### Adding Custom Agents

Create a new file in `.opencode/agent/`:

```markdown
---
description: "Your agent description"
name: "Agent Name"
---

# Agent Name

Your agent instructions here...
```

### Adding Custom Instructions

Create a new file in `.opencode/instructions/`:

```markdown
---
description: "Instruction description"
applyTo: "**/*.ts"
---

# Instructions

Your coding standards here...
```

### Adding Custom Prompts

Create a new file in `.opencode/prompts/`:

```markdown
---
agent: 'agent'
description: "Prompt description"
---

# Prompt Name

Your prompt template here...
```

## 📖 Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
- [Mantine UI Documentation](https://mantine.dev/)
- [React Documentation](https://react.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 🤝 Contributing

To add more agents, instructions, or prompts:

1. Create new files in appropriate directories
2. Follow the frontmatter format
3. Test with GitHub Copilot
4. Document usage patterns

## 📝 License

This setup follows the MIT license from the awesome-copilot repository.
