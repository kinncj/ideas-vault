# AI-Assisted Development Configuration

This project uses **two complementary AI systems** for development:

## 📁 Directory Structure

```
ideasvault-ui/
├── .github/                    # GitHub Copilot configuration
│   ├── agents/                 # Custom Copilot agents
│   ├── instructions/           # Auto-applied coding standards
│   └── prompts/                # Reusable task templates
│
└── .opencode/                  # OpenCode configuration
    ├── agent/                  # OpenCode specialized agents
    ├── command/                # Custom slash commands
    └── skill/                  # Project-specific utilities
```

## 🔄 GitHub Copilot vs OpenCode

### GitHub Copilot (`.github/`)

**Purpose:** In-editor AI assistance while coding in VS Code

**Location:** `.github/` directory

**Components:**
- **Agents** (`.agent.md`) - Specialized AI personas
- **Instructions** (`.instructions.md`) - Auto-applied standards
- **Prompts** (`.prompt.md`) - Task templates

**Usage:**
```
# In VS Code Copilot Chat
@mantine-ui-specialist Create a dashboard layout
/review-and-refactor
```

**Best For:**
- Real-time code suggestions
- Component creation
- Code reviews
- Quick refactoring
- In-editor assistance

---

### OpenCode (`.opencode/`)

**Purpose:** CLI-based AI development with multi-agent coordination

**Location:** `.opencode/` directory

**Components:**
- **Agents** (`.opencode/agent/*.md`) - Specialized subagents
- **Commands** (`.opencode/command/*.ts`) - Custom workflows
- **Skills** (`.opencode/skill/*.ts`) - Reusable utilities

**Usage:**
```bash
# In OpenCode CLI or Chat
Create a user authentication feature
@frontend Build the login form
/test-coverage
```

**Best For:**
- Multi-file refactoring
- Feature implementation
- Coordinated backend/frontend work
- Architecture planning
- Testing workflows

## 🎯 When to Use Which

| Scenario | Use GitHub Copilot | Use OpenCode |
|----------|-------------------|--------------|
| Writing a single component | ✅ | |
| Creating multiple related files | | ✅ |
| Quick code completion | ✅ | |
| Full feature implementation | | ✅ |
| Code review in editor | ✅ | |
| Cross-file refactoring | | ✅ |
| Learning/exploring APIs | ✅ | |
| Coordinating backend + frontend | | ✅ |
| Inline suggestions | ✅ | |
| Architecture planning | | ✅ |

## 🔧 Configuration Philosophy

### Shared Principles
Both systems follow:
- TypeScript strict mode
- React 19.2 best practices
- Mantine UI v7+ patterns
- WCAG accessibility standards
- Clean Architecture principles

### Different Scopes

**GitHub Copilot:**
- Focused on **individual files**
- Context from current editor
- Fast, inline suggestions
- Great for implementation details

**OpenCode:**
- Focused on **entire features**
- Context from full codebase
- Coordinated multi-agent work
- Great for architecture and planning

## 📚 Available Agents

### GitHub Copilot Agents (`.github/agents/`)

| Agent | Mention | Expertise |
|-------|---------|-----------|
| Accessibility | `@accessibility` | WCAG compliance |
| API Architect | `@api-architect` | API design patterns |
| React Engineer | `@expert-react-frontend-engineer` | React 19.2, hooks |
| Mantine Specialist | `@mantine-ui-specialist` | Mantine UI v7+ |
| Playwright Tester | `@playwright-tester` | E2E testing |

### OpenCode Agents (`.opencode/agent/`)

| Agent | Usage | Expertise |
|-------|-------|-----------|
| Orchestrator | Default | Coordinates all agents |
| Frontend | `@frontend` | React + Mantine + Vite |
| Backend | `@backend` | .NET + ASP.NET Core |
| Infrastructure | `@infrastructure` | Docker + K8s + CI/CD |
| QA | `@qa` | Testing strategy |
| Product Owner | `@po` | DDD + Specifications |
| Technical Writer | `@technical-writer` | Documentation |

## 🚀 Quick Start

### For GitHub Copilot (VS Code)
1. Install GitHub Copilot extension
2. Open Copilot Chat (Cmd/Ctrl + Shift + I)
3. Try: `@mantine-ui-specialist Create a button`

### For OpenCode (CLI)
1. Already configured!
2. Just start chatting
3. Try: "Create a new feature with frontend and tests"

## 🤝 Working Together

Both systems can complement each other:

**Example Workflow:**
1. **OpenCode:** Plan and create feature structure
2. **GitHub Copilot:** Implement individual components
3. **OpenCode:** Review and test the complete feature
4. **GitHub Copilot:** Refine and optimize specific files

## 📖 Documentation

### GitHub Copilot
- [COPILOT_SETUP.md](.github/COPILOT_SETUP.md)
- [QUICK_REFERENCE.md](.github/QUICK_REFERENCE.md)
- [VERIFICATION_GUIDE.md](.github/VERIFICATION_GUIDE.md)

### OpenCode
- [README.md](.opencode/README.md)
- [AGENTS_OVERVIEW.md](../AGENTS_OVERVIEW.md)
- [AGENTS.md](../AGENTS.md)

## 🎓 Best Practices

### Do ✅
- Use GitHub Copilot for quick, focused tasks
- Use OpenCode for features spanning multiple files
- Let OpenCode coordinate agents for complex work
- Use GitHub Copilot for learning and exploration
- Combine both for optimal productivity

### Don't ❌
- Don't duplicate agent configurations
- Don't mix command patterns between systems
- Don't expect GitHub Copilot to coordinate multi-file work
- Don't use OpenCode for simple inline completions

## 🔍 Troubleshooting

### GitHub Copilot Not Working?
- Check `.github/VERIFICATION_GUIDE.md`
- Ensure proper frontmatter in agent files
- Verify VS Code extension is active

### OpenCode Not Working?
- Ensure you're in the correct directory
- Check agent files in `.opencode/agent/`
- Verify commands in `.opencode/command/`

## 💡 Tips

1. **Start with OpenCode** for new features
2. **Use GitHub Copilot** for implementation
3. **Return to OpenCode** for testing and integration
4. **Leverage both** for comprehensive development

---

**Summary:** GitHub Copilot excels at **in-editor assistance**, while OpenCode excels at **coordinated development**. Use both for maximum productivity!
