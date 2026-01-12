# Quick Reference: OpenCode Squad Commands

## Primary Agent: Orchestrator

**The orchestrator is the primary agent** - just describe what you want:

```
Build a user authentication feature
Create a dashboard with real-time updates
Add payment processing to my app
```

The orchestrator automatically coordinates all specialist subagents.

## Subagent @ Mentions

Use `@mention` to directly invoke a specialist:

| Command | Agent | Use When |
|---------|-------|----------|
| (default) | **Orchestrator (PRIMARY)** | Any multi-domain feature or complex task |
| `@backend` | Backend Specialist | Direct .NET backend development, APIs, domain logic |
| `@frontend` | Frontend Specialist | Direct React UI development with Vite & Mantine |
| `@infrastructure` | Infrastructure Specialist | Direct Docker, Kubernetes, Terraform, CI/CD |
| `@qa` | QA Specialist | Direct unit, integration, and E2E testing |
| `@po` | Product Owner | Direct specifications, domain modeling, user stories |
| `@technical-writer` | Technical Writer | Direct documentation, API docs, guides |

## Quick Start Examples

### Most Common (No Command Needed)
```
Create user authentication feature with login, registration, and password reset
Build a complete order processing system
Add real-time chat to the application
```

### Direct Specialist Access

Use `@mention` when you need focused work from a specific specialist:

**Backend Only**
```
@backend Implement a RESTful API for product management with CRUD operations
```

**Frontend Only**
```
@frontend Create a dashboard with charts and tables using Mantine components
```

**Infrastructure Only**
```
@infrastructure Setup CI/CD pipeline and Kubernetes deployment for the auth service
```

**Testing Only**
```
@qa Write unit tests for the OrderService and E2E tests for checkout flow
```

**Specification First**
```
@po Define the domain model and write specifications for inventory management
```

**Documentation**
```
@technical-writer Create API documentation for all user management endpoints
```

## When to Use What

- **Default (Orchestrator)**: 95% of the time - building features, apps, or anything complex
- **@ Mentions (Subagents)**: When you need focused work from one domain expert
  - Bug fixes in specific areas
  - Extending existing code in one domain
  - Focused refactoring or optimization
  - Direct documentation updates

## Folder Structure Quick Reference

```
{app-name}-backend/          → Backend agent works here
{app-name}-ui/              → Frontend agent works here
infrastructure/
  ├── kubernetes/{app-name}/ → Infrastructure agent (K8s)
  └── terraform/{app-name}/  → Infrastructure agent (Terraform)
tests/{app-name}/           → QA agent works here
docs/{app-name}/            → PO & Technical Writer work here
```

## Common Workflows

### New Feature
1. `/po` → Write specification
2. `/orchestrator` → Coordinate implementation
3. Agents execute in parallel

### Bug Fix
1. `/backend` or `/frontend` → Fix the bug
2. `/qa` → Add regression tests
3. `/technical-writer` → Update docs if needed

### Infrastructure Update
1. `/infrastructure` → Update configs
2. `/qa` → Verify in test environment
3. `/technical-writer` → Update deployment docs

## Pro Tips

- Use `/orchestrator` for complex, multi-agent tasks
- Start with `/po` for new features to define scope
- Be specific with app names: "myapp-backend" not just "backend"
- Reference locations: "based on spec in docs/myapp/"
- Agents understand the folder structure automatically
