# Ideas Vault - System Architecture

## ⚠️ Important Notice

**Current State: Frontend-Only Application**

Ideas Vault is currently a **frontend-only prototype** with no backend implementation. This document describes:
1. **Current Architecture** (what exists now - browser-based only)
2. **Proposed Future Architecture** (design for when/if backend is added)

All references to backend services, databases, APIs, and infrastructure are **proposed designs** for potential future implementation.

## Overview

This document provides a detailed view of Ideas Vault's system architecture using the C4 model (Context, Containers, Components, and Code).

**Current Implementation**: Single-page React application using browser APIs for all functionality.  
**Proposed Expansion**: Full-stack architecture with backend services (community contributions welcome).

## C4 Model

### Level 1: System Context Diagram

#### Current State (Frontend-Only)

```mermaid
graph TB
    User[👤 User/Entrepreneur]
    
    subgraph "Browser Environment"
        System[Ideas Vault Application<br/>React SPA]
        Storage[LocalStorage<br/>Data Persistence]
    end
    
    Browser[Web Browser]
    
    User -->|Uses| Browser
    Browser -->|Runs| System
    System -->|Stores Data| Storage
    
    style System fill:#4f46e5,stroke:#818cf8,stroke-width:3px,color:#fff
    style User fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
```

**Current Interactions:**
- Users interact through modern web browsers
- All data stored in browser's localStorage
- No external services or APIs
- Fully offline-capable after initial load

#### Proposed Future State (With Backend)

The proposed view showing how Ideas Vault could fit into a broader ecosystem.

```mermaid
graph TB
    User[👤 User/Entrepreneur]
    Admin[👨‍💼 System Administrator]
    
    subgraph "Ideas Vault System"
        System[Ideas Vault Application]
    end
    
    Browser[Web Browser]
    AIProvider[AI/ML Services<br/>OpenAI, Anthropic]
    MarketData[Market Data APIs<br/>Crunchbase, PitchBook]
    Analytics[Analytics Platform<br/>Google Analytics, Mixpanel]
    Email[Email Service<br/>SendGrid]
    Auth[Auth Provider<br/>Auth0, Azure AD]
    
    User -->|Uses| Browser
    Admin -->|Manages| System
    Browser -->|Accesses| System
    
    System -->|Analyzes ideas| AIProvider
    System -->|Fetches market data| MarketData
    System -->|Sends events| Analytics
    System -->|Sends notifications| Email
    System -->|Authenticates| Auth
    
    style System fill:#4f46e5,stroke:#818cf8,stroke-width:3px,color:#fff
    style User fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Admin fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

**Key Interactions:**
- Users interact with the system through modern web browsers
- System authenticates users via OAuth2 providers
- AI services analyze ideas and generate insights
- Market data APIs provide competitive intelligence
- Email service sends notifications and digests
- Analytics platform tracks usage and performance

### Level 2: Container Diagram

Shows the high-level technical building blocks of the system.

```mermaid
graph TB
    subgraph "User Devices"
        Browser[Web Browser<br/>Desktop/Mobile]
        PWA[Progressive Web App<br/>Offline Capable]
    end
    
    subgraph "Frontend Container"
        SPA[Single Page Application<br/>React 19 + TypeScript<br/>Vite Build]
    end
    
    subgraph "Backend Container - .NET"
        API[Web API<br/>ASP.NET Core 8<br/>RESTful + WebSockets]
        BG[Background Services<br/>AI Analysis, Jobs]
    end
    
    subgraph "Data Container"
        DB[(Primary Database<br/>PostgreSQL)]
        Cache[(Cache<br/>Redis)]
        Storage[Blob Storage<br/>Azure/S3]
    end
    
    subgraph "External Services"
        AI[AI Services]
        Market[Market APIs]
        Auth[Auth Provider]
        Email[Email Service]
    end
    
    Browser --> SPA
    PWA --> SPA
    SPA -->|HTTPS/WSS| API
    API --> DB
    API --> Cache
    API --> Storage
    BG --> DB
    
    API --> AI
    API --> Market
    API --> Auth
    BG --> Email
    
    style SPA fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
    style API fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
    style DB fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Cache fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

**Container Responsibilities:**

| Container | Technology | Purpose |
|-----------|-----------|---------|
| **SPA** | React + TypeScript | User interface and interaction |
| **Web API** | ASP.NET Core | Business logic and data access |
| **Background Services** | .NET Hosted Services | Async processing and scheduled jobs |
| **Database** | PostgreSQL | Persistent data storage |
| **Cache** | Redis | Performance optimization |
| **Blob Storage** | Azure/S3 | Image and file storage |

### Level 3: Component Diagram - Frontend

Detailed view of the React SPA components and their interactions.

```mermaid
graph TB
    subgraph "Presentation Layer"
        Pages[Page Components<br/>Landing, Dashboard, Detail]
        Layout[Layout Components<br/>AppLayout, Sidebar, Nav]
        UI[UI Components<br/>Modal, Card, Button]
    end
    
    subgraph "Business Logic Layer"
        Hooks[Custom Hooks<br/>useIdeas, useAuth, useAnalysis]
        Context[Context Providers<br/>Auth, Theme, Ideas]
        Services[Service Layer<br/>API Client, Storage]
    end
    
    subgraph "Infrastructure Layer"
        Router[React Router<br/>Route Management]
        State[State Management<br/>Local State + Context]
        Storage[LocalStorage<br/>Persistence]
        API[API Gateway<br/>HTTP Client]
    end
    
    subgraph "Domain Layer"
        Models[Domain Models<br/>Idea, User, Analysis]
        Interfaces[Type Definitions<br/>TypeScript Interfaces]
        Validators[Validation Logic<br/>Form Validators]
    end
    
    Pages --> Layout
    Pages --> UI
    Pages --> Hooks
    Layout --> UI
    
    Hooks --> Context
    Hooks --> Services
    Context --> State
    
    Services --> API
    Services --> Storage
    Services --> Models
    
    Router --> Pages
    State --> Storage
    
    Models --> Interfaces
    Models --> Validators
    
    style Pages fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
    style Hooks fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
    style Services fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Models fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

### Level 3: Component Diagram - Backend API

Detailed view of the .NET backend components (planned architecture).

```mermaid
graph TB
    subgraph "API Layer"
        Controllers[Controllers<br/>REST Endpoints]
        Middleware[Middleware<br/>Auth, Logging, Error]
        Filters[Filters<br/>Validation, Authorization]
    end
    
    subgraph "Application Layer"
        Services[Application Services<br/>IdeaService, UserService]
        Commands[Commands<br/>CQRS Write Operations]
        Queries[Queries<br/>CQRS Read Operations]
        Validators[FluentValidation<br/>Input Validation]
    end
    
    subgraph "Domain Layer"
        Entities[Domain Entities<br/>Idea, User, Analysis]
        Aggregates[Aggregates<br/>IdeaAggregate]
        DomainServices[Domain Services<br/>Business Rules]
        Events[Domain Events<br/>IdeaCreated, etc.]
    end
    
    subgraph "Infrastructure Layer"
        Repositories[Repositories<br/>Data Access]
        UnitOfWork[Unit of Work<br/>Transaction Management]
        DbContext[EF Core Context<br/>Database Mapping]
        External[External Services<br/>AI, Email, Storage]
    end
    
    Controllers --> Middleware
    Controllers --> Services
    Controllers --> Validators
    
    Services --> Commands
    Services --> Queries
    Commands --> Entities
    Queries --> Repositories
    
    Entities --> DomainServices
    Entities --> Events
    Aggregates --> Entities
    
    Commands --> Repositories
    Repositories --> UnitOfWork
    UnitOfWork --> DbContext
    Services --> External
    
    style Controllers fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
    style Services fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
    style Entities fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Repositories fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## Data Flow Diagrams

### Idea Capture Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React UI
    participant State as State Manager
    participant Storage as LocalStorage
    participant API as Backend API
    participant AI as AI Service
    participant DB as Database
    
    User->>UI: Enter idea details
    UI->>UI: Validate input
    UI->>State: Submit idea
    State->>Storage: Save locally (optimistic)
    State->>UI: Update UI immediately
    
    par Background Processing
        State->>API: POST /api/ideas
        API->>DB: Save idea
        DB-->>API: Confirm
        API->>AI: Request analysis
        AI-->>API: Return insights
        API->>DB: Update with analysis
        DB-->>API: Confirm
        API-->>State: Analysis complete
        State->>Storage: Update local copy
        State->>UI: Update with insights
        UI->>User: Show analysis
    end
```

### Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React UI
    participant Auth as Auth Service
    participant Provider as OAuth Provider
    participant API as Backend API
    participant DB as Database
    
    User->>UI: Click Login
    UI->>Auth: Initiate OAuth flow
    Auth->>Provider: Redirect to login
    User->>Provider: Enter credentials
    Provider->>Auth: Authorization code
    Auth->>Provider: Exchange for tokens
    Provider-->>Auth: Access + Refresh tokens
    Auth->>API: Validate token
    API->>DB: Get/Create user
    DB-->>API: User data
    API-->>Auth: User profile
    Auth->>UI: Set session
    UI->>User: Redirect to dashboard
```

### Real-Time Analysis Flow

```mermaid
sequenceDiagram
    participant UI as React UI
    participant WS as WebSocket
    participant API as Backend API
    participant Queue as Message Queue
    participant Worker as Background Worker
    participant AI as AI Service
    
    UI->>WS: Connect for updates
    WS->>API: Establish connection
    
    UI->>API: POST /api/ideas
    API->>Queue: Enqueue analysis job
    API-->>UI: 202 Accepted
    
    Queue->>Worker: Dequeue job
    Worker->>AI: Analyze idea
    AI-->>Worker: Analysis results
    Worker->>API: Update idea
    API->>WS: Push update
    WS->>UI: Receive analysis
    UI->>UI: Update display
```

## Integration Points

### Frontend → Backend API

**Endpoints:**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/ideas` | List user's ideas |
| POST | `/api/ideas` | Create new idea |
| GET | `/api/ideas/{id}` | Get idea details |
| PUT | `/api/ideas/{id}` | Update idea |
| DELETE | `/api/ideas/{id}` | Delete idea |
| GET | `/api/ideas/{id}/analysis` | Get AI analysis |
| POST | `/api/ideas/{id}/share` | Share idea |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/settings` | Update settings |

**WebSocket Connections:**

| Endpoint | Purpose |
|----------|---------|
| `/ws/ideas` | Real-time idea updates |
| `/ws/analysis` | Real-time analysis progress |
| `/ws/notifications` | System notifications |

### Backend → External Services

**AI Service Integration:**
```typescript
interface AIServiceClient {
  analyzeIdea(idea: Idea): Promise<AnalysisResult>;
  generateTags(text: string): Promise<string[]>;
  summarize(text: string): Promise<string>;
  sentiment(text: string): Promise<SentimentScore>;
}
```

**Market Data Integration:**
```typescript
interface MarketDataClient {
  searchCompetitors(query: string): Promise<Competitor[]>;
  getMarketSize(industry: string): Promise<MarketMetrics>;
  getTrends(industry: string): Promise<Trend[]>;
}
```

## Deployment Architecture

### Current Deployment (Frontend Only)

```mermaid
graph LR
    subgraph "GitHub"
        Repo[Git Repository]
    end
    
    subgraph "GitHub Actions"
        CI[CI Pipeline<br/>Build & Test]
    end
    
    subgraph "GitHub Pages"
        CDN[Static Site Hosting]
    end
    
    Repo --> CI
    CI --> CDN
    CDN --> Users[Users]
    
    style CDN fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
```

### Future Deployment (Full Stack)

```mermaid
graph TB
    subgraph "Cloud Infrastructure"
        LB[Load Balancer<br/>Nginx/Azure LB]
        
        subgraph "Application Tier"
            API1[API Instance 1]
            API2[API Instance 2]
            API3[API Instance N]
        end
        
        subgraph "Data Tier"
            Primary[(Primary DB<br/>PostgreSQL)]
            Replica1[(Read Replica 1)]
            Replica2[(Read Replica 2)]
            Cache[(Redis Cluster)]
        end
        
        subgraph "Background Processing"
            Worker1[Worker 1]
            Worker2[Worker 2]
            Queue[Message Queue<br/>RabbitMQ]
        end
        
        subgraph "Storage Tier"
            Blob[Blob Storage<br/>Azure/S3]
        end
    end
    
    Users[Users] --> LB
    LB --> API1
    LB --> API2
    LB --> API3
    
    API1 --> Primary
    API2 --> Replica1
    API3 --> Replica2
    
    API1 --> Cache
    API2 --> Cache
    API3 --> Cache
    
    API1 --> Queue
    Queue --> Worker1
    Queue --> Worker2
    
    Worker1 --> Primary
    Worker2 --> Primary
    
    API1 --> Blob
    
    style LB fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
    style Primary fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style Cache fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## Scalability Patterns

### Horizontal Scaling

```mermaid
graph TB
    LB[Load Balancer]
    
    subgraph "Auto-Scaling Group"
        API1[API Instance 1<br/>Min: 2]
        API2[API Instance 2]
        API3[API Instance 3]
        APIN[API Instance N<br/>Max: 20]
    end
    
    subgraph "Shared State"
        Redis[(Redis<br/>Session Store)]
        DB[(Database<br/>Shared Data)]
    end
    
    LB --> API1
    LB --> API2
    LB --> API3
    LB --> APIN
    
    API1 --> Redis
    API2 --> Redis
    API3 --> Redis
    APIN --> Redis
    
    API1 --> DB
    API2 --> DB
    API3 --> DB
    APIN --> DB
```

### Caching Strategy

```mermaid
graph LR
    Client[Client Request]
    API[API Server]
    L1[L1 Cache<br/>Memory]
    L2[L2 Cache<br/>Redis]
    DB[(Database)]
    
    Client --> API
    API --> L1
    L1 -->|Cache Miss| L2
    L2 -->|Cache Miss| DB
    DB -->|Response| L2
    L2 -->|Response| L1
    L1 -->|Response| API
    API -->|Response| Client
    
    style L1 fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style L2 fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## Security Architecture

### Authentication & Authorization

```mermaid
graph TB
    User[User Request]
    Gateway[API Gateway]
    Auth[Auth Middleware]
    
    subgraph "Authorization"
        RBAC[Role-Based<br/>Access Control]
        Claims[Claims-Based<br/>Authorization]
        Policies[Custom Policies]
    end
    
    API[API Endpoints]
    
    User --> Gateway
    Gateway --> Auth
    Auth --> RBAC
    Auth --> Claims
    Auth --> Policies
    RBAC --> API
    Claims --> API
    Policies --> API
    
    style Auth fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style RBAC fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

### Data Protection

```mermaid
graph LR
    subgraph "In Transit"
        TLS[TLS 1.3<br/>Encryption]
    end
    
    subgraph "At Rest"
        DBEnc[Database<br/>Encryption]
        BlobEnc[Blob Storage<br/>Encryption]
    end
    
    subgraph "Application"
        Hash[Password<br/>Hashing]
        Tokens[JWT Tokens<br/>Signed & Encrypted]
    end
    
    style TLS fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style DBEnc fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style Hash fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
```

## Monitoring & Observability

```mermaid
graph TB
    subgraph "Application"
        API[API Services]
        UI[Frontend]
        BG[Background Jobs]
    end
    
    subgraph "Telemetry"
        Logs[Structured Logging<br/>Serilog]
        Metrics[Metrics<br/>Prometheus]
        Traces[Distributed Tracing<br/>OpenTelemetry]
    end
    
    subgraph "Observability Platform"
        Dashboard[Grafana<br/>Dashboards]
        Alerts[AlertManager<br/>Notifications]
        Analysis[Log Analysis<br/>Elasticsearch]
    end
    
    API --> Logs
    API --> Metrics
    API --> Traces
    UI --> Logs
    BG --> Logs
    BG --> Metrics
    
    Logs --> Analysis
    Metrics --> Dashboard
    Traces --> Analysis
    Dashboard --> Alerts
    
    style Dashboard fill:#4f46e5,stroke:#818cf8,stroke-width:2px,color:#fff
    style Alerts fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
```

## Related Documentation

- [Architecture Overview](./README.md)
- [Frontend Architecture](./frontend-architecture.md)
- [Backend Architecture](./backend-architecture.md)
- [Data Architecture](./data-architecture.md)
- [Architecture Decision Records](./adr/README.md)
