# Development Squad Setup

This is a development-opencode-setup project that provides a structured agent-based development workflow.

## Project Structure

- `.opencode/agent/` - Specialized development agents (orchestrator, backend, frontend, infrastructure, qa, po, technical-writer)
- `.opencode/command/` - Custom commands for the development workflow
- `docs/` - Documentation and guides
- `infrastructure/` - Infrastructure as code and deployment configurations
- `tests/` - Test suites for all applications
- `{app-name}-backend/` - .NET backend applications
- `{app-name}-ui/` - React frontend applications

## Technology Stack

### Backend (.NET)
- **Language**: C# with .NET 8+
- **Framework**: ASP.NET Core for RESTful APIs
- **ORM**: Entity Framework Core
- **Testing**: xUnit, NUnit, Moq, FluentAssertions
- **Commands**: Always use `dotnet` CLI (`dotnet build`, `dotnet run`, `dotnet test`)

### Frontend (React)
- **Language**: TypeScript
- **Framework**: React 18+ with hooks
- **Build Tool**: Vite
- **UI Library**: Mantine components
- **State**: React Context, Zustand, TanStack Query
- **Testing**: Vitest, React Testing Library, Playwright
- **Commands**: Use `npm` or `pnpm` (`npm install`, `npm run dev`, `npm test`)

### Infrastructure
- **Containers**: Docker with multi-stage builds
- **Orchestration**: Kubernetes
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## Agent Coordination

### Primary Agent
- **Orchestrator**: Default agent for coordinating all development work. Delegates to specialists as needed.

### Specialist Agents (Subagents)
All specialists work together in an automated workflow:

1. **Backend Agent** - .NET/C# development
2. **Frontend Agent** - React/TypeScript development  
3. **Infrastructure Agent** - Docker/Kubernetes/Terraform
4. **QA Agent** - Automated testing at all levels
5. **Product Owner Agent** - Domain modeling and specifications
6. **Technical Writer Agent** - Documentation

## Development Workflow

### Automated Testing Cycle
**CRITICAL**: All code changes trigger automatic testing:

1. Developer agent (Backend/Frontend) makes changes
2. Developer agent immediately notifies QA Agent
3. QA Agent runs appropriate tests
4. If tests fail → QA notifies developer agent with specific failures
5. Developer agent fixes issues
6. Repeat steps 3-5 until all tests pass
7. Technical Writer updates documentation
8. Product Owner validates against requirements

### Port Configuration
When backend ports are configured:
1. Backend/Infrastructure agent notifies Frontend agent
2. Frontend updates environment variables:
   - `REACT_APP_API_BASE_URL`
   - `REACT_APP_WS_URL`
   - `REACT_APP_DETECTION_WS_URL`

### Definition of Done
A feature is complete only when:
- ✅ Implementation matches specification
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass
- ✅ Documentation is updated
- ✅ Code is reviewed
- ✅ Product Owner approves

## Code Standards

### General Principles
- Follow SOLID principles in all code
- Apply Clean Architecture patterns
- Use Domain-Driven Design for complex domains
- Write clean, maintainable, testable code
- Document public APIs and complex logic

### Backend Standards
- Use C# naming conventions
- Implement async/await patterns properly
- Use dependency injection
- Write XML documentation for public APIs
- Validate inputs using FluentValidation
- Handle errors with proper logging

### Frontend Standards
- Use TypeScript strict mode
- Follow React best practices
- Implement proper error boundaries
- Use semantic HTML
- Ensure accessibility (WCAG compliance)
- Optimize bundle size and performance

### Testing Standards
- Follow Test Pyramid (many unit, fewer integration, few E2E)
- Use AAA pattern (Arrange, Act, Assert)
- Keep tests independent and isolated
- Name tests to describe behavior
- Mock external dependencies appropriately

## Folder Conventions

When creating new applications, follow these patterns:
- Backend: `{app-name}-backend/`
- Frontend: `{app-name}-ui/`
- Infrastructure: `infrastructure/kubernetes/{app-name}/` and `infrastructure/terraform/{app-name}/`
- Tests: `tests/{app-name}/`
- Documentation: `docs/{app-name}/`

## Best Practices

1. **Start with Planning**: Use orchestrator for complex features
2. **Specifications First**: Product Owner defines domain and requirements
3. **Test Continuously**: QA validates every change automatically
4. **Document as You Go**: Technical Writer keeps docs synchronized
5. **Infrastructure as Code**: All deployments are version controlled
6. **Review Integration**: Ensure all components work together

## Communication Protocol

Agents must communicate when:
- Code changes are made → Notify QA Agent
- Tests fail → Notify responsible developer agent
- Ports change → Notify Frontend Agent
- Features complete → Notify Product Owner and Technical Writer
- Infrastructure changes → Notify all affected agents

## External Resources

For additional guidelines, agents should reference:
- This AGENTS.md file for project-specific rules
- `.opencode/README.md` for agent usage patterns
- `.opencode/AGENTS_OVERVIEW.md` for detailed agent descriptions
- Individual agent markdown files in `.opencode/agent/` for specialist expertise
