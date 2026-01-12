# OpenCode Configuration

This directory contains custom agents, instructions, and prompts to enhance GitHub Copilot for this React + TypeScript + Mantine project.

## 📁 Structure

```
.opencode/
├── README.md                    # This file
├── COPILOT_SETUP.md            # Comprehensive setup guide
├── QUICK_REFERENCE.md          # Quick command reference
├── agent/                      # Custom AI agents
│   ├── accessibility.agent.md
│   ├── api-architect.agent.md
│   ├── expert-react-frontend-engineer.agent.md
│   ├── mantine-ui-specialist.agent.md
│   └── playwright-tester.agent.md
├── instructions/               # Auto-applied coding standards
│   ├── a11y.instructions.md
│   ├── nodejs-javascript-vitest.instructions.md
│   ├── playwright-typescript.instructions.md
│   ├── reactjs.instructions.md
│   └── typescript-5-es2022.instructions.md
└── prompts/                    # Reusable task templates
    ├── architecture-blueprint-generator.prompt.md
    ├── breakdown-feature-implementation.prompt.md
    ├── breakdown-feature-prd.prompt.md
    ├── breakdown-plan.prompt.md
    └── review-and-refactor.prompt.md
```

## 🚀 Quick Start

### For New Developers

1. **Read the guides**:
   - [COPILOT_SETUP.md](COPILOT_SETUP.md) - Full documentation
   - [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command cheat sheet

2. **Install GitHub Copilot**:
   - Install VS Code extension
   - Sign in with your GitHub account

3. **Start using agents**:
   ```
   @mantine-ui-specialist Create a user profile card
   ```

4. **Apply prompts**:
   ```
   /review-and-refactor
   ```

### For Experienced Users

Jump straight to [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for command examples.

## 🎯 What's Included

### 5 Custom Agents
Expert AI personas for specific domains:
- Accessibility (WCAG compliance)
- API Architecture (REST, GraphQL)
- React Frontend (React 19.2, hooks, performance)
- Mantine UI (Component library specialist)
- E2E Testing (Playwright patterns)

### 5 Instruction Sets
Auto-applied coding standards:
- React best practices
- TypeScript strict mode
- Accessibility guidelines
- Playwright testing patterns
- Vitest unit testing

### 5 Reusable Prompts
Templates for common tasks:
- Architecture documentation
- Feature implementation plans
- Product requirements (PRD)
- Task planning
- Code review and refactoring

## 📊 Stats

- **Total Files**: 16 configuration files
- **Total Lines**: ~3,500 lines of guidance
- **Source**: [awesome-copilot](https://github.com/github/awesome-copilot)
- **Custom Files**: 2 (Mantine specialist agent + docs)

## 🎓 Learning Path

1. **Week 1**: Use the Mantine UI specialist for building components
2. **Week 2**: Add accessibility reviews with the accessibility agent
3. **Week 3**: Create tests with the Playwright tester agent
4. **Week 4**: Use prompts for feature planning and code reviews

## 💡 Best Practices

### DO ✅
- Combine multiple agents in queries
- Reference specific files in your prompts
- Use prompts for structured output
- Review instruction files to understand standards
- Test accessibility with the accessibility agent

### DON'T ❌
- Ignore WCAG guidelines in instructions
- Skip TypeScript type safety rules
- Override Mantine styles unnecessarily
- Write tests without following patterns
- Commit without code review prompts

## 🔧 Customization

### Adding a Custom Agent

1. Create `agent/my-agent.agent.md`
2. Add frontmatter with description and tools
3. Write expertise and guidelines
4. Test with `@my-agent` in Copilot Chat

### Adding Custom Instructions

1. Create `instructions/my-instructions.instructions.md`
2. Add frontmatter with `applyTo` pattern
3. Write coding standards
4. Instructions auto-apply to matching files

### Adding a Custom Prompt

1. Create `prompts/my-prompt.prompt.md`
2. Add frontmatter with description
3. Write prompt template
4. Use with `/my-prompt` in Copilot Chat

## 🤝 Contributing

Improvements to agents, instructions, or prompts are welcome:

1. Test changes with GitHub Copilot
2. Document new features
3. Update QUICK_REFERENCE.md
4. Commit with clear description

## 📚 Resources

- [awesome-copilot Repository](https://github.com/github/awesome-copilot)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Mantine Documentation](https://mantine.dev/)
- [React Documentation](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## ❓ FAQ

**Q: Do I need to install anything?**
A: Just GitHub Copilot extension in VS Code.

**Q: Are instructions automatically applied?**
A: Yes, based on file patterns in frontmatter.

**Q: Can I create my own agents?**
A: Yes! Follow the customization guide above.

**Q: How do I test if it's working?**
A: Try `@mantine-ui-specialist` in Copilot Chat.

**Q: What if an agent doesn't respond?**
A: Check agent name spelling and ensure Copilot is active.

---

**Need Help?** Check [COPILOT_SETUP.md](COPILOT_SETUP.md) or [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
