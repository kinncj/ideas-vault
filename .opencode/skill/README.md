# IdeasVault UI - Skills & Utilities

Project-specific guides, templates, and conventions for OpenCode agents.

## Available Skills

### 📚 [Common Tasks](./COMMON_TASKS.md)
Natural language patterns for common development tasks. Since OpenCode doesn't use slash commands, this guide shows you how to request common operations naturally.

**Topics:**
- Creating components
- Running tests
- Bundle analysis
- Accessibility checks
- Feature planning
- Project cleanup
- Agent coordination

**Example:**
```
Create a new IdeaCard component in src/components/features/
Include props for title, description, and tags
Use Mantine Card, Title, Text components
Include unit tests with Vitest
```

---

### 🎨 [Component Templates](./COMPONENT_TEMPLATES.md)
Ready-to-use templates for React components, hooks, and tests.

**Templates:**
- Mantine Component
- Page Component
- Form Component
- Modal Component
- Custom Hook
- Test File
- Context Provider

**Example:**
```
Create a new form using the Form Component Template
Include fields for title and description
Add validation with Mantine's useForm
```

---

### 📋 [Project Conventions](./PROJECT_CONVENTIONS.md)
Code standards, naming conventions, and best practices specific to IdeasVault UI.

**Sections:**
- File naming conventions
- Directory structure
- TypeScript conventions
- Mantine UI patterns
- Testing standards
- Accessibility requirements
- Performance best practices
- Git commit format

**Example:**
```
Review the IdeaCard component
Ensure it follows all project conventions
Check naming, TypeScript types, and accessibility
```

---

## How to Use Skills

### 1. Reference Skills in Requests
```
Create a component following the Mantine Component Template
from .opencode/skill/COMPONENT_TEMPLATES.md
```

### 2. Ask Agents to Apply Conventions
```
@frontend Refactor this component to match PROJECT_CONVENTIONS.md
Fix any naming or pattern inconsistencies
```

### 3. Use as Reference
```
What are the accessibility standards for this project?
```

Agents will reference `PROJECT_CONVENTIONS.md` automatically.

---

## Adding New Skills

Create a new `.md` file in this directory:

```markdown
# Skill Name

Description of what this skill provides.

## Content

[Your content here]

## Usage

How to use this skill with OpenCode agents.
```

Then update this index to list it.

---

## Integration with Agents

### Frontend Agent
Uses these skills when creating components:
- Component Templates
- Project Conventions (TypeScript, Mantine patterns)
- Accessibility standards

### QA Agent
References:
- Testing conventions
- Accessibility requirements
- Code quality standards

### Technical Writer
Uses:
- Documentation standards
- JSDoc conventions
- README structure

---

## Quick Commands Reference

Even though OpenCode doesn't have slash commands, here are natural language patterns:

| Task | Natural Request |
|------|----------------|
| New component | "Create [name] component with [features]" |
| Run tests | "Run tests for [component/feature]" |
| Check accessibility | "@qa Check [component] for WCAG AA compliance" |
| Generate docs | "@technical-writer Document [feature]" |
| Refactor code | "Refactor [file] following PROJECT_CONVENTIONS" |
| Create hook | "Create use[Name] hook with [functionality]" |

---

## Tips for Effective Use

1. **Be Specific**: Mention which skill/template to use
2. **Reference Files**: Point to specific skill documents
3. **Combine Skills**: Use multiple skills in one request
4. **Ask for Guidance**: "What template should I use for [task]?"

---

## Examples

### Creating a New Feature
```
I need to build an "Ideas Board" feature. 

1. Use Component Templates for the board component
2. Follow Project Conventions for naming and structure
3. Reference Common Tasks for testing workflow
4. Include accessibility from Project Conventions

Create:
- IdeasBoard component (grid layout)
- IdeaCard component (individual idea)
- useIdeasBoard hook (state management)
- Tests for all components
```

### Code Review
```
Review src/components/IdeaCard.tsx

Check against:
1. Component Templates - proper structure
2. Project Conventions - naming, TypeScript, accessibility
3. Test coverage standards

Suggest improvements
```

### Onboarding
```
I'm new to this project. Show me:
1. The main conventions from PROJECT_CONVENTIONS.md
2. Available component templates
3. How to request common tasks
```

---

## Skill Organization

```
.opencode/skill/
├── README.md                      # This file
├── COMMON_TASKS.md                # Natural language patterns
├── COMPONENT_TEMPLATES.md          # Code templates
└── PROJECT_CONVENTIONS.md          # Standards and conventions
```

---

## Contributing

To add a new skill:

1. Create a new `.md` file
2. Follow the existing format
3. Update this README
4. Test with OpenCode agents
5. Commit with: `docs(skill): add [skill-name] guide`

---

**Remember:** Skills are living documents. Update them as the project evolves!
