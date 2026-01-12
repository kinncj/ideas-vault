# OpenCode Squad Agents - Overview

## The Squad

```
                    ┌─────────────────┐
                    │  Orchestrator   │
                    │   Coordinator   │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
        ┌───────▼───────┐    │    ┌───────▼───────┐
        │   Product     │    │    │   Technical   │
        │    Owner      │    │    │    Writer     │
        │  (DDD/Specs)  │    │    │  (Docs/API)   │
        └───────────────┘    │    └───────────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
     ┌───────▼───────┐ ┌─────▼─────┐ ┌─────▼─────┐
     │   Backend     │ │  Frontend │ │   Infra   │
     │  (.NET/API)   │ │(React/UI) │ │  (K8s/CI) │
     └───────────────┘ └───────────┘ └─────┬─────┘
                                            │
                                     ┌──────▼──────┐
                                     │     QA      │
                                     │  (Testing)  │
                                     └─────────────┘
```

## Agent Capabilities Matrix

| Agent | Primary Skills | Output Location | Works With |
|-------|---------------|-----------------|------------|
| **Orchestrator** | Task delegation, Coordination, Architecture | All areas | All agents |
| **Backend** | .NET, ASP.NET Core, EF Core, SOLID | `{app}-backend/` | Frontend, Infrastructure, QA |
| **Frontend** | React, Vite, Mantine, TypeScript | `{app}-ui/` | Backend, QA |
| **Infrastructure** | Docker, K8s, Terraform, GitHub Actions | `infrastructure/` | All agents |
| **QA** | xUnit, Vitest, Playwright, Testing Strategy | `tests/{app}/` | All agents |
| **Product Owner** | DDD, Domain Modeling, Specifications | `docs/{app}/` | All agents |
| **Technical Writer** | Documentation, API Docs, Guides | `docs/{app}/` | All agents |

## Expertise Breakdown

### Orchestrator
- Multi-agent coordination
- Task decomposition and delegation
- Parallel execution planning
- Integration oversight
- Architectural decisions

### Backend Specialist
- C# / .NET 8+
- ASP.NET Core Web APIs
- Entity Framework Core
- SOLID Principles
- Clean Architecture
- Domain-Driven Design
- Authentication/Authorization
- Database design and migrations

### Frontend Specialist
- React 18+ (Hooks, Context, Suspense)
- Vite build tool
- Mantine UI library
- TypeScript (strict mode)
- State management (Context, Zustand)
- React Query / TanStack Query
- React Router
- Form handling (React Hook Form)
- SOLID principles in components

### Infrastructure Specialist
- Docker containerization
- Kubernetes (manifests, Kustomize)
- Terraform (IaC, modules, state)
- GitHub Actions (CI/CD)
- Cloud platforms (AWS, Azure, GCP)
- Monitoring (Prometheus, Grafana)
- Security (RBAC, secrets, scanning)

### QA Specialist
- Unit testing (xUnit, Vitest)
- Integration testing (TestContainers)
- E2E testing (Playwright)
- Test strategy and coverage
- TDD/BDD methodologies
- Performance testing
- Accessibility testing

### Product Owner
- Domain-Driven Design
- Bounded contexts and aggregates
- Ubiquitous language
- User stories and epics
- Acceptance criteria
- Requirements engineering
- API contract specifications

### Technical Writer
- API documentation (OpenAPI/Swagger)
- User guides and tutorials
- Developer documentation
- Architecture documentation
- Troubleshooting guides
- Code documentation standards
- Diagrams (Mermaid, PlantUML)

## Communication Patterns

### Pattern 1: Top-Down (Orchestrator-Led)
```
User Request → Orchestrator → Analyzes → Delegates to Specialists in Parallel
```

### Pattern 2: Specialist Direct
```
User Request → Specific Specialist → Executes → Coordinates with Related Specialists
```

### Pattern 3: Sequential Pipeline
```
PO (Spec) → Backend (API) → Frontend (UI) → QA (Tests) → Infra (Deploy) → Writer (Docs)
```

### Pattern 4: Parallel Development
```
                    ┌→ Backend (API)
User Request → PO → ┼→ Frontend (UI)  → QA (Tests) → Infra (Deploy)
                    └→ Writer (Docs)
```

## Integration Points

### Backend ↔ Frontend
- API contracts and data models
- Authentication flows
- Error handling patterns

### Infrastructure ↔ All
- Environment variables
- Deployment configurations
- CI/CD pipelines
- Resource requirements

### QA ↔ All
- Test requirements
- Acceptance criteria validation
- Test data needs

### PO ↔ All
- Domain specifications
- Business rules
- Acceptance criteria

### Technical Writer ↔ All
- Documentation requirements
- API documentation
- User guides

## When to Use Which Agent

### Use Orchestrator When:
- Building complete features across multiple domains
- Need coordination between 3+ specialists
- Complex architectural decisions required
- Parallel work needs synchronization

### Use Specialist Directly When:
- Task is confined to single domain
- Clear, focused requirements
- No cross-domain coordination needed
- Quick iterations needed

### Start with PO When:
- New feature or epic
- Domain model needs definition
- Requirements are unclear
- Need acceptance criteria

### Finish with Technical Writer When:
- Feature is complete and needs documentation
- API changes need documentation
- User-facing changes need guides
- Troubleshooting guides needed

## Success Metrics

Each agent ensures:
- **Code Quality**: Following SOLID principles and best practices
- **Testing**: Appropriate test coverage at all levels
- **Documentation**: Clear, comprehensive documentation
- **Integration**: Seamless integration between components
- **Standards**: Consistent coding and architectural standards
- **Efficiency**: Parallel execution where possible

## Getting the Most from Your Squad

1. **Start Right**: Begin with `/po` for proper specifications
2. **Think Parallel**: Use `/orchestrator` for multi-domain work
3. **Be Specific**: Provide clear context and requirements
4. **Trust Specialists**: Let them apply their expertise
5. **Verify Integration**: Check that pieces work together
6. **Document Everything**: Use `/technical-writer` generously
7. **Test Thoroughly**: Engage `/qa` early and often

---

**Next Steps**: 
- Read `.opencode/README.md` for detailed usage
- Check `.opencode/QUICK_REFERENCE.md` for commands
- Explore individual agent docs in `.opencode/agents/`
