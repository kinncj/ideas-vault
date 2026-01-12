# IdeasVault UI - OpenCode Skills

OpenCode doesn't use traditional "slash commands" like GitHub Copilot. Instead, you interact naturally with agents. This guide shows common tasks and how to request them.

## Common Development Tasks

### Creating Components

**Instead of `/new-component`**, just ask naturally:

```
Create a new Mantine component called IdeaCard in src/components/features/
Include:
- Props for title, description, and tags
- Mantine Card, Title, Text, and Badge components
- Responsive design
- Unit tests with Vitest
```

The agent will create the component file and tests automatically.

---

### Running Tests

**Instead of `/test-coverage`**, request:

```
Run the test suite with coverage reporting
```

Or for specific tests:

```
Run tests for the IdeaCard component with verbose output
```

---

### Bundle Analysis

**Instead of `/analyze-bundle`**, ask:

```
Build the project and analyze the bundle size
Show me which dependencies are largest
```

---

### Accessibility Checks

**Instead of `/check-a11y`**, request:

```
@qa Check the IdeaCard component for accessibility issues
Review WCAG AA compliance
```

---

### Feature Planning

**Instead of `/feature-checklist`**, ask:

```
@po Create a specification for the "Save Idea" feature
Include acceptance criteria and implementation tasks
```

Or:

```
Create an implementation checklist for the search feature
Include frontend, testing, and documentation tasks
```

---

### Project Cleanup

**Instead of `/clean-project`**, request:

```
Clean build artifacts and remove the dist folder
```

Or for deep clean:

```
Remove node_modules and reinstall all dependencies
```

---

## Using Agents for Specific Tasks

### Frontend Development
```
@frontend Create a responsive dashboard layout with Mantine Grid
Include a header, sidebar, and main content area
```

### QA and Testing
```
@qa Write comprehensive tests for the IdeaCard component
Include unit tests, accessibility tests, and edge cases
```

### Documentation
```
@technical-writer Document the IdeaCard component
Include props table, usage examples, and accessibility notes
```

### Infrastructure
```
@infrastructure Update the Dockerfile for the frontend
Optimize for production builds with multi-stage builds
```

---

## Natural Language Workflows

OpenCode excels at understanding natural requests. Examples:

### Multi-Step Features
```
Build a complete "Ideas Board" feature:
1. Create a Kanban-style board component
2. Add drag-and-drop functionality
3. Include state management with Zustand
4. Write E2E tests with Playwright
5. Document the component usage
```

The orchestrator will coordinate multiple agents to complete all tasks.

### Code Review
```
Review the src/components/features/IdeaCard.tsx file
Check for:
- TypeScript best practices
- Mantine component usage
- Accessibility compliance
- Performance optimization opportunities
```

### Refactoring
```
Refactor the Ideas list component to use Mantine's DataTable
Replace the current implementation with proper sorting and filtering
Maintain all existing functionality
```

---

## Agent Coordination

OpenCode automatically coordinates agents. For example:

```
Add user authentication to the app
```

The orchestrator will:
1. **@po** - Define authentication requirements
2. **@frontend** - Create login/register UI
3. **@backend** - Implement authentication API (if applicable)
4. **@qa** - Write authentication tests
5. **@technical-writer** - Document the flow

---

## Quick Reference

| Task | Natural Request |
|------|----------------|
| Create component | "Create a [component name] component with [features]" |
| Run tests | "Run tests for [component/feature]" |
| Fix bugs | "Fix the [issue] in [file]" |
| Accessibility | "@qa Check [component] for WCAG compliance" |
| Documentation | "@technical-writer Document [feature]" |
| Performance | "Optimize [component] for better performance" |
| Refactoring | "Refactor [code] to [improvement]" |
| Feature planning | "@po Create specification for [feature]" |

---

## Tips for Effective OpenCode Usage

1. **Be Specific**: Provide clear requirements and context
2. **Use Agents**: Mention `@frontend`, `@qa`, etc. for specialized work
3. **Multi-Step**: OpenCode handles complex, multi-file operations
4. **Context**: Reference specific files or components
5. **Iterate**: Build features incrementally with feedback

---

## Examples from IdeasVault UI

### Creating a New Page
```
Create a new Ideas List page in src/pages/IdeasList.tsx
Use Mantine components:
- AppShell for layout
- DataTable for ideas list
- Search bar with TextInput
- Filters with MultiSelect
Include pagination and sorting
```

### Adding a Feature
```
Add "favorite ideas" functionality:
1. Add favorite icon to IdeaCard
2. Create useFavorites hook for state
3. Persist favorites in localStorage
4. Add favorites filter to list
5. Write tests for all components
```

### Fixing Issues
```
The IdeaCard component isn't responsive on mobile
Fix the layout to:
- Stack elements vertically on small screens
- Adjust font sizes for mobile
- Ensure touch targets are at least 44x44px
```

---

## When to Use What

**Use Natural Requests:**
- ✅ Multi-file features
- ✅ Coordinated agent work
- ✅ Complex refactoring
- ✅ Architecture planning

**Use GitHub Copilot (in VS Code):**
- ✅ Quick code completion
- ✅ Single-file edits
- ✅ Learning APIs
- ✅ Inline suggestions

---

**Remember:** OpenCode is conversational. Just describe what you want to accomplish!
