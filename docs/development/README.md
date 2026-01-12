# Ideas Vault - Development Guide

Welcome to the Ideas Vault development documentation! This guide will help you get started with developing and contributing to the Ideas Vault project.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Additional Resources](#additional-resources)

## Overview

Ideas Vault is a modern web application for capturing, analyzing, and managing innovative ideas. The project follows a structured development approach using specialized AI agents for different aspects of development.

### Technology Stack

**Frontend:**
- React 19+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Local-first architecture with localStorage

**Backend (Future):**
- .NET 8+ with ASP.NET Core
- Entity Framework Core
- Clean Architecture pattern

**Infrastructure:**
- Docker for containerization
- Kubernetes for orchestration
- GitHub Actions for CI/CD

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Tools

- **Node.js**: Version 20.x or later
  ```bash
  node --version  # Should be v20.x or higher
  ```

- **npm** or **pnpm**: Package manager
  ```bash
  npm --version   # Should be 10.x or higher
  # or
  pnpm --version  # Should be 8.x or higher
  ```

- **Git**: Version control
  ```bash
  git --version   # Should be 2.x or higher
  ```

### Optional (Future Backend)

- **.NET SDK**: Version 8.0 or later
  ```bash
  dotnet --version  # Should be 8.0 or higher
  ```

- **Docker**: For containerization
  ```bash
  docker --version  # Should be 20.x or higher
  ```

### Editor Setup

We recommend **Visual Studio Code** with these extensions:

- ESLint
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens
- C# (for future backend work)
- C# Dev Kit (for future backend work)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/kinncj/ideasvault.git
cd ideasvault
```

### 2. Setup Frontend

```bash
cd ideasvault-ui
npm install
```

### 3. Configure Environment

The frontend uses Vite's built-in environment variable support. Create a `.env` file if needed:

```env
# API Configuration (when backend is available)
VITE_API_BASE_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000

# Development settings
VITE_DEV_TOOLS=true
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Verify Installation

1. Open your browser to `http://localhost:5173`
2. You should see the Ideas Vault landing page
3. Click "Enter App" to access the main application
4. Try creating a new idea to verify functionality

## Project Structure

```
ideasvault/
├── .opencode/                      # AI agent configurations
│   ├── agent/                      # Specialized development agents
│   │   ├── orchestrator.md         # Coordination agent
│   │   ├── backend.md              # .NET backend specialist
│   │   ├── frontend.md             # React frontend specialist
│   │   ├── infrastructure.md       # DevOps specialist
│   │   ├── qa.md                   # Testing specialist
│   │   ├── po.md                   # Product owner
│   │   └── technical-writer.md     # Documentation specialist
│   └── command/                    # Custom development commands
│
├── docs/                           # Documentation
│   ├── development/                # Developer guides (this directory)
│   └── ideasvault/                 # Product documentation
│
├── ideasvault-ui/                  # React frontend application
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── Dashboard.tsx       # Main dashboard
│   │   │   ├── CaptureModal.tsx    # Idea capture modal
│   │   │   ├── IdeaDetailView.tsx  # Idea details
│   │   │   └── ...
│   │   ├── utils/                  # Utility functions
│   │   │   ├── storage.ts          # localStorage wrapper
│   │   │   ├── aiAnalyzer.ts       # AI analysis logic
│   │   │   └── ...
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Application entry point
│   │   ├── constants.ts            # Type definitions and constants
│   │   └── index.css               # Global styles
│   ├── public/                     # Static assets
│   ├── package.json                # Dependencies and scripts
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── eslint.config.js            # ESLint configuration
│
├── ideasvault-backend/             # .NET backend (future)
│
├── infrastructure/                 # Infrastructure as code
│   ├── kubernetes/                 # K8s manifests
│   └── terraform/                  # Terraform configs
│
├── tests/                          # Test suites
│   └── ideasvault/                 # Application tests
│
├── AGENTS.md                       # Development workflow guide
└── README.md                       # Project overview
```

## Development Workflow

### Agent-Based Development

Ideas Vault uses a unique agent-based development workflow powered by OpenCode. Specialized AI agents help with different aspects of development:

1. **Orchestrator Agent** - Coordinates complex features across multiple domains
2. **Frontend Agent** - React/TypeScript development
3. **Backend Agent** - .NET/C# development (future)
4. **QA Agent** - Testing and quality assurance
5. **Infrastructure Agent** - DevOps and deployment
6. **Product Owner Agent** - Requirements and specifications
7. **Technical Writer Agent** - Documentation

#### Using Agents

The **Orchestrator** is the default agent. Just describe what you want:

```
Build a user authentication feature
Add export functionality to the dashboard
Create a search feature for ideas
```

For specialist tasks, invoke agents directly:

```
/frontend Add a dark mode toggle to the settings
/qa Create E2E tests for the idea capture flow
/technical-writer Document the storage API
```

See [AGENTS.md](../../AGENTS.md) for detailed agent usage.

### Feature Development Workflow

1. **Specification** - Define requirements and acceptance criteria
2. **Implementation** - Develop the feature (frontend/backend)
3. **Testing** - Unit, integration, and E2E tests
4. **Documentation** - Update relevant documentation
5. **Review** - Code review and quality checks
6. **Deploy** - CI/CD pipeline deployment

### Definition of Done

A feature is complete when:

- ✅ Implementation matches specification
- ✅ All unit tests pass
- ✅ All integration tests pass
- ✅ All E2E tests pass
- ✅ Documentation is updated
- ✅ Code is reviewed
- ✅ Product Owner approves

## Common Tasks

### Running the Development Server

```bash
cd ideasvault-ui
npm run dev
```

Access at: `http://localhost:5173`

### Building for Production

```bash
cd ideasvault-ui
npm run build
```

Output: `dist/` directory

### Running Linters

```bash
# ESLint
npm run lint

# TypeScript type checking
npm run build  # This includes type checking
```

### Running Tests (Future)

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

This builds and deploys to GitHub Pages automatically.

### Working with Components

#### Creating a New Component

1. Create component file in `src/components/`:
   ```typescript
   // src/components/MyComponent.tsx
   import { useState } from 'react';
   
   interface MyComponentProps {
     title: string;
     onAction: () => void;
   }
   
   export function MyComponent({ title, onAction }: MyComponentProps) {
     const [isActive, setIsActive] = useState(false);
     
     return (
       <div className="p-4 bg-slate-800 rounded-lg">
         <h2 className="text-xl font-bold text-white">{title}</h2>
         <button
           onClick={onAction}
           className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
         >
           Action
         </button>
       </div>
     );
   }
   ```

2. Export from `src/components/index.ts`:
   ```typescript
   export { MyComponent } from './MyComponent';
   ```

3. Use in parent component:
   ```typescript
   import { MyComponent } from './components';
   
   function App() {
     return <MyComponent title="Hello" onAction={() => console.log('Clicked')} />;
   }
   ```

### Working with State

Ideas Vault uses local-first architecture with localStorage:

```typescript
import { storage } from './utils/storage';

// Load ideas
const ideas = storage.getIdeas();

// Add idea
storage.addIdea(newIdea);

// Update idea
storage.updateIdea(ideaId, { status: 'ready' });

// Delete idea
storage.deleteIdea(ideaId);
```

### Adding Routes

Routes are defined in `App.tsx`:

```typescript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/vault" element={<Dashboard />} />
  <Route path="/vault/idea/:id" element={<IdeaDetailView />} />
  <Route path="/vault/settings" element={<Settings />} />
</Routes>
```

## Additional Resources

### Developer Guides

- [Frontend Development Guide](./frontend-guide.md) - React/TypeScript patterns
- [Backend Development Guide](./backend-guide.md) - .NET/C# patterns (future)
- [Testing Guide](./testing-guide.md) - Testing strategies and practices
- [Code Style Guide](./code-style.md) - Coding standards and conventions

### Project Documentation

- [AGENTS.md](../../AGENTS.md) - Development workflow with AI agents
- [.opencode/README.md](../../.opencode/README.md) - Agent usage patterns
- [.opencode/AGENTS_OVERVIEW.md](../../.opencode/AGENTS_OVERVIEW.md) - Detailed agent descriptions

### External Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)

## Getting Help

- **Documentation Issues**: Check [docs/development/](./README.md)
- **Code Questions**: Review [code-style.md](./code-style.md)
- **Testing Help**: See [testing-guide.md](./testing-guide.md)
- **Agent Usage**: Read [AGENTS.md](../../AGENTS.md)

## Next Steps

1. Read the [Frontend Development Guide](./frontend-guide.md)
2. Review the [Code Style Guide](./code-style.md)
3. Explore the [Testing Guide](./testing-guide.md)
4. Start contributing!

---

**Welcome to the Ideas Vault development team! Happy coding!** 🚀
