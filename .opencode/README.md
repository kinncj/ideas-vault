# OpenCode Squad Agents

This repository contains a comprehensive set of OpenCode agents designed to work as a collaborative development squad. Each agent is a specialist in their domain and can work independently or be coordinated by the Orchestrator Agent.

## Primary vs Subagents

OpenCode has two types of agents:

- **Primary agents**: Main assistants you interact with (switch with Tab key)
  - `orchestrator` - The default primary agent for coordinating development work

- **Subagents**: Specialized assistants invoked by primary agents or with `@` mentions
  - `@backend`, `@frontend`, `@infrastructure`, `@qa`, `@po`, `@technical-writer`

**How it works:**
- Start any conversation with the orchestrator (no command needed)
- The orchestrator automatically invokes specialist subagents as needed
- You can manually invoke subagents with `@backend`, `@frontend`, etc.

**Examples:**
```
# Orchestrator automatically coordinates specialists:
Build a user authentication feature with login and registration
Create a complete order processing system

# Or manually invoke a specialist:
@backend Implement JWT authentication
@frontend Create a login form with Mantine
```

## Agent Squad

### 1. Orchestrator Agent (PRIMARY - Default)
**Role**: Task coordinator and delegator

The Orchestrator Agent is the primary agent you interact with. It analyzes requirements, breaks them down into parallel tasks, and delegates work to specialist subagents.

**Usage**:
```
# Just start talking - orchestrator is the default
Create a new user management feature with frontend, backend, tests, and documentation
```

### 2. Backend Specialist (SUBAGENT - `@backend`)
**Role**: .NET + SOLID principles expert

Specializes in ASP.NET Core, Entity Framework Core, Clean Architecture, and SOLID principles. Works in `{app-name}-backend/` directories.

**Usage**:
```
@backend Implement a user registration API endpoint with validation
```

### 3. Frontend Specialist (SUBAGENT - `@frontend`)
**Role**: Vite + React + Mantine + SOLID expert

Specializes in modern React development with Vite, Mantine UI components, and SOLID principles. Works in `{app-name}-ui/` directories.

**Usage**:
```
@frontend Create a user registration form with Mantine components and validation
```

### 4. Infrastructure Specialist (SUBAGENT - `@infrastructure`)
**Role**: Containers + Kubernetes + Terraform + GitHub Actions expert

Handles containerization, Kubernetes deployments, Terraform IaC, and CI/CD pipelines. Works in `infrastructure/` directory.

**Usage**:
```
@infrastructure Create Kubernetes manifests and Terraform configuration for the user service
```

### 5. QA Specialist (SUBAGENT - `@qa`)
**Role**: Testing expert (Unit + Integration + E2E + Playwright)

Implements comprehensive testing strategies including unit tests, integration tests, and E2E tests with Playwright. Works in `tests/{app-name}/` directories.

**Usage**:
```
@qa Create unit tests for the user service and E2E tests for the registration flow
```

### 6. Product Owner (SUBAGENT - `@po`)
**Role**: DDD + Specification writing expert

Creates domain models, writes specifications, defines user stories, and documents acceptance criteria using Domain-Driven Design principles. Works in `docs/{app-name}/` directories.

**Usage**:
```
@po Write a specification for the user management feature using DDD principles
```

### 7. Technical Writer (SUBAGENT - `@technical-writer`)
**Role**: Technical documentation specialist

Creates comprehensive API documentation, user guides, developer guides, and maintains all technical documentation. Works in `docs/{app-name}/` directories.

**Usage**:
```
@technical-writer Document the user management API endpoints with examples
```

## Folder Structure

All agents operate within this standardized folder structure:

```
project-root/
├── infrastructure/
│   ├── kubernetes/{app-name}/       # K8s manifests
│   └── terraform/{app-name}/        # Terraform IaC
├── {app-name}-backend/              # Backend application
├── {app-name}-ui/                   # Frontend application
├── docs/{app-name}/                 # Documentation
├── tests/{app-name}/                # Test suites
└── .github/workflows/               # CI/CD pipelines
```

## Usage Patterns

### Pattern 1: Default (Orchestrated) - RECOMMENDED
When building features or apps, just describe what you want (no command needed):

```
Build a user authentication system with JWT tokens
Create a dashboard with user management
Add payment processing to the shopping cart
```

The **Orchestrator (default agent)** will automatically coordinate all necessary specialists.

### Pattern 2: Single Agent Task (Advanced)
When you have a task specific to one domain and want direct specialist access:

```
/backend Implement user authentication with JWT tokens
```

### Pattern 3: Explicit Orchestration (Optional)
You can still explicitly call the orchestrator if you prefer:

```
/orchestrator Build a complete order processing feature with:
- Backend API for order management
- Frontend order form and tracking UI
- Kubernetes deployment configuration
- Unit and E2E tests
- API documentation
```

But this is **the same as just saying**: "Build a complete order processing feature..."

The Orchestrator will:
1. Break down the requirement
2. Create a task plan
3. Delegate to specialist agents in parallel
4. Coordinate outputs to ensure integration

### Pattern 4: Sequential Agent Workflow (Advanced)
For tasks that build on each other:

1. `/po Write specification for payment processing feature`
2. `/backend Implement the payment API based on the specification in docs/`
3. `/frontend Create payment UI based on the API in the backend`
4. `/qa Create tests for the payment flow`
5. `/infrastructure Deploy the payment service`
6. `/technical-writer Document the payment API`

### Pattern 5: Parallel Specialist Work (Advanced)
When multiple agents can work independently and you want manual control:

Start multiple agents in parallel by invoking them separately:
- `/backend Implement user service`
- `/frontend Create user management UI`
- `/infrastructure Setup user service infrastructure`

**Note:** The default Orchestrator can do this automatically for you.

## Best Practices

### 1. Let the Default Orchestrator Handle Most Tasks (RECOMMENDED)
For building features and apps, just describe what you want:
```
Build a shopping cart feature
Create an inventory management system
Add real-time notifications to the dashboard
```

The default Orchestrator will automatically handle coordination, planning, and delegation.

### 2. Use Specialist Agents for Focused Tasks
When you need to work directly with one domain:
```
/po Define the domain model and specifications for inventory management
/backend Fix the null reference exception in OrderService
/qa Add more test coverage for the payment flow
```

### 3. Context Sharing
Agents are aware of the folder structure. Reference work by location:
```
Implement the API based on the specification in docs/myapp/specifications/features/
```
Or with a specialist:
```
/backend Implement the API based on the specification in docs/myapp/specifications/features/
```

### 4. Iterative Development
Build incrementally - the default Orchestrator handles coordination:
```
Build a product search feature
```
Or manually coordinate with specialists:
```
/po Write user story for product search
/backend Implement search API endpoint
/frontend Add search UI component
/qa Test search functionality
/technical-writer Document search API
```

### 5. Review and Integration
The default Orchestrator automatically handles integration, but you can still explicitly request reviews:
```
Review and integrate the work done by backend and frontend agents for the user feature
```

## Agent Coordination

### The Orchestrator's Role
The Orchestrator Agent is unique - it:
- Analyzes complex requirements
- Breaks work into parallel tasks
- Invokes multiple specialist agents concurrently
- Ensures consistency across domains
- Resolves integration issues

### Specialist Collaboration
Specialists know how to collaborate:
- **Backend** and **Frontend** align on API contracts
- **Infrastructure** coordinates with all agents on deployment configs
- **QA** validates work from all agents
- **Product Owner** provides specifications for all
- **Technical Writer** documents outputs from all agents

## Example Workflows

### Workflow 1: New Microservice
```
# Step 1: Define requirements
/po Create specification for notification service using DDD

# Step 2: Coordinate implementation
/orchestrator Build notification service with:
- Backend API in .NET
- React admin UI for managing notifications
- Kubernetes deployment
- CI/CD pipeline
- Comprehensive tests
- Complete documentation

# The Orchestrator will delegate to all relevant agents in parallel
```

### Workflow 2: Feature Enhancement
```
# Step 1: Update specs
/po Update user management specification to include 2FA

# Step 2: Backend implementation
/backend Add 2FA support to authentication service

# Step 3: Frontend implementation
/frontend Add 2FA UI components to login flow

# Step 4: Testing
/qa Create tests for 2FA functionality

# Step 5: Infrastructure
/infrastructure Update deployment for 2FA requirements

# Step 6: Documentation
/technical-writer Document 2FA feature and API changes
```

### Workflow 3: Bug Fix
```
# Step 1: Identify and fix
/backend Fix the order calculation bug in OrderService

# Step 2: Test
/qa Add regression tests for order calculation

# Step 3: Document
/technical-writer Update troubleshooting guide with order calculation issue
```

## Tips

1. **Be Specific**: Provide clear requirements with context
2. **Reference Locations**: Point agents to specific files or directories when relevant
3. **Use App Names**: Always specify `{app-name}` in your requests
4. **Check Integration**: Verify that outputs from different agents work together
5. **Follow Standards**: All agents follow SOLID principles and best practices
6. **Parallel When Possible**: Use the Orchestrator for maximum efficiency

## Getting Started

### The Simple Way (RECOMMENDED)
Just describe what you want to build - no commands needed:
```
Create a new microservice for user notifications
Build a customer dashboard with charts
Add authentication to my app
```

The **default Orchestrator** handles everything: planning, coordination, delegation, and integration.

### The Manual Way (Advanced)
If you prefer direct control:
1. **For Specifications**: Use `/po` to define the domain and specifications
2. **For Backend Work**: Use `/backend` for .NET API development
3. **For Frontend Work**: Use `/frontend` for React UI development
4. **For Infrastructure**: Use `/infrastructure` for deployment configs
5. **For Testing**: Use `/qa` for comprehensive test coverage
6. **For Documentation**: Use `/technical-writer` for docs

## Support

Each agent is documented in `.opencode/agents/` with:
- Detailed expertise areas
- Responsibilities
- Code quality standards
- Integration points with other agents
- Best practices

Refer to individual agent documentation for more detailed information about their capabilities.
