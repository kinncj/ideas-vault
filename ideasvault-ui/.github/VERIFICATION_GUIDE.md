# GitHub Copilot Agent Verification Guide

## Quick Test Commands

Open **GitHub Copilot Chat** in VS Code and try these commands:

### 1. Test Mantine UI Specialist
```
@mantine-ui-specialist Create a simple user profile card with avatar, name, and email
```

**Expected:** Copilot should provide a Mantine-based component using Card, Avatar, Text, Stack

### 2. Test React Frontend Engineer
```
@expert-react-frontend-engineer Create a form using useFormStatus and Actions API
```

**Expected:** Copilot should provide React 19.2 code with modern hooks

### 3. Test Accessibility Agent
```
@accessibility Review this button for WCAG compliance: <button>Click</button>
```

**Expected:** Copilot should provide accessibility improvements (aria-label, semantic HTML, keyboard support)

### 4. Test Playwright Tester
```
@playwright-tester Write E2E tests for a login form with email and password
```

**Expected:** Copilot should provide Playwright test code with Page Object Model pattern

### 5. Test Custom Prompts
```
/review-and-refactor
```

**Expected:** Copilot should start a code review workflow

## Troubleshooting

### If agents don't respond:

1. **Check VS Code Settings:**
   - Open Settings (Cmd+,)
   - Search for "GitHub Copilot"
   - Ensure "GitHub Copilot: Enable" is checked

2. **Verify File Location:**
   ```bash
   ls -la .github/agents/
   ls -la .github/instructions/
   ls -la .github/prompts/
   ```

3. **Check File Format:**
   - All agent files should have frontmatter with `---`
   - Name should match the @mention name (kebab-case)

4. **Reload VS Code:**
   - Close and reopen VS Code
   - Or run: "Developer: Reload Window"

5. **Check Copilot Status:**
   - Click GitHub Copilot icon in status bar
   - Ensure you're signed in and active

### Expected Behavior

- **Agents (@name):** Specialized AI personas that understand domain-specific context
- **Instructions (.instructions.md):** Auto-applied to matching file patterns
- **Prompts (/name):** Reusable templates for common tasks

## Verification Checklist

- [ ] GitHub Copilot extension installed in VS Code
- [ ] Signed in to GitHub Copilot
- [ ] Can open Copilot Chat (Cmd+Shift+I or Ctrl+Shift+I)
- [ ] @mantine-ui-specialist responds
- [ ] @accessibility responds
- [ ] @playwright-tester responds
- [ ] /review-and-refactor prompt works
- [ ] Instructions auto-apply to .tsx files

## Success Indicators

When working correctly, you should see:
- Agent responses include domain expertise
- Instructions automatically considered for relevant files
- Prompts provide structured workflows
- Code suggestions follow project conventions

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
- Project: [COPILOT_SETUP.md](.github/COPILOT_SETUP.md)
- Quick Reference: [QUICK_REFERENCE.md](.github/QUICK_REFERENCE.md)
