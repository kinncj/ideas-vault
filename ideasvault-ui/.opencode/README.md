# Captain Current - OpenCode Agents

AI development squad for building and maintaining Captain Current, a marine weather and fishing conditions Progressive Web Application (PWA).

## What is Captain Current?

**Product**: Marine weather and fishing conditions PWA for anglers, boaters, and water sports enthusiasts  
**Problem**: Fragmented marine weather data across multiple sources makes planning difficult  
**Solution**: Aggregated, normalized weather/tide/astronomy data with intelligent fishing condition scoring  
**Core Value**: Actionable marine forecasts with "Best Fishing Day" predictions

## Available Agents

### Orchestrator Agent
**Role**: Squad coordinator and task delegator  
**When to use**: Multi-domain tasks, complex features, architectural decisions  
**Capabilities**: Break down requirements, delegate to specialists, coordinate work

### Frontend Agent
**Role**: React SPA development  
**Expertise**: React 18, Chart.js, Tailwind CSS, React Router, Context API  
**Focus**: Forecast visualization, location search, settings, PWA features

### Backend Agent
**Role**: Supabase Edge Functions (Deno/TypeScript)  
**Expertise**: Supabase Auth, Edge Functions, Stripe integration, PostgreSQL  
**Focus**: Authentication, subscription management, payment processing

### Infrastructure Agent
**Role**: DevOps and cloud infrastructure  
**Expertise**: Cloudflare Pages, Supabase, GitHub Actions, Docker  
**Focus**: CI/CD pipelines, deployment, service worker, PWA optimization

### QA Agent
**Role**: Testing and quality assurance  
**Expertise**: Playwright, Cucumber.js, React Testing Library, E2E testing  
**Focus**: E2E tests, BDD scenarios, component tests, regression testing

### Product Owner Agent
**Role**: Domain modeling and requirements  
**Expertise**: Marine weather domain, fishing conditions, user workflows  
**Focus**: Feature specifications, user stories, weather provider integration

### Technical Writer Agent
**Role**: Documentation and technical writing  
**Expertise**: Architecture docs, API docs, user guides, developer docs  
**Focus**: Business logic documentation, provider docs, deployment guides

## Technology Stack

### Frontend (`web-app/`)
- **Runtime**: Node.js 20+
- **Language**: JavaScript (ES6+)
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Maps**: Leaflet + react-leaflet
- **State**: React Context API
- **Storage**: localforage (IndexedDB wrapper)
- **HTTP**: Axios
- **Routing**: React Router DOM v6
- **Auth**: Supabase Auth
- **Testing**: Playwright, Cucumber.js, React Testing Library

### Backend (`supabase-edge/`)
- **Runtime**: Deno (Supabase Edge Functions)
- **Language**: TypeScript
- **Platform**: Supabase
- **Payments**: Stripe
- **Database**: PostgreSQL (via Supabase)

### Infrastructure
- **Hosting**: Cloudflare Pages
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **CI/CD**: GitHub Actions
- **Payments**: Stripe

### External APIs
- **Open-Meteo**: Open-source weather and marine data
- **Stormglass**: Premium marine weather API
- **NOAA**: US National weather data

## Architecture Overview

### Three-Layer DTO Architecture
```
Raw API DTOs → Combined Provider DTOs → App-Facing DTOs (WeatherAppDTO)
```

1. **Raw API DTOs**: Mirror provider API responses exactly
2. **Combined DTOs**: Glue marine/standard/other responses together
3. **App DTOs**: Unified, provider-agnostic, UI-ready format

### Data Normalization (Decorator Pattern)
- `WaterTempDecorator` - Water temperature normalization
- `WindDecorator` - Wind data normalization
- `TemperatureDecorator` - Air temperature normalization
- `TideDecorator` - Tide event processing
- `WaveDecorator` - Wave data normalization
- `FogDecorator` - Fog probability calculation

### Provider Pattern
Weather/location providers implement common interfaces:
- Open-Meteo provider (default)
- Stormglass provider (premium)
- NOAA provider (US data)

## Folder Structure

```
CaptainCurrent/
├── .opencode/
│   └── agent/              # Agent configuration files
├── web-app/                # React SPA (main application)
│   ├── src/
│   │   ├── api/            # Weather/location providers, DTOs, services
│   │   │   └── weather/    # Weather providers, DTOs, hydrators
│   │   ├── components/     # React UI components
│   │   │   ├── common/     # Shared components (Layout, ErrorBoundary)
│   │   │   ├── forecast/   # Forecast display components
│   │   │   ├── map/        # Map components (Leaflet)
│   │   │   ├── logs/       # Catch log components
│   │   │   └── routing/    # Route planning components
│   │   ├── constants/      # Centralized constants and thresholds
│   │   ├── contexts/       # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utilities (cache, geo, storage)
│   ├── public/             # Static assets, service worker
│   └── dist/               # Production build output
├── supabase-edge/          # Supabase Edge Functions
│   ├── functions/          # Edge functions (Stripe, subscriptions)
│   └── migrations/         # Database migrations
├── docs/                   # Documentation
├── mockups/                # UI mockups
└── prompt/                 # Project prompts and references
```

## Domain Knowledge

### Core Concepts
- **Forecast**: Multi-day weather prediction with hourly data
- **Fishing Conditions**: Calculated score based on weather factors
- **Best Fishing Day**: Algorithm-determined optimal day for fishing
- **Weather Provider**: External API source (Open-Meteo, Stormglass, NOAA)
- **Location**: Saved fishing/boating spot with coordinates

### Scoring Factors
- Wind Speed (lower is better)
- Wave Height (lower is better for most activities)
- Precipitation (none is optimal)
- Fog Probability (lower is better)
- Temperature (bell curve, 60-80°F optimal)
- Wave Period (longer is generally better)

### Key Features
1. **Multi-Provider Weather**: Aggregate data from multiple sources
2. **Best Fishing Day**: Algorithm identifies optimal fishing conditions
3. **Hourly Forecasts**: Detailed hourly breakdown for each day
4. **Tide Data**: High/low tide times and heights
5. **Offline Support**: PWA with service worker caching
6. **Subscription**: Stripe-based premium features
7. **Multi-language**: English, Spanish, French support

## Usage Examples

### Example 1: Add New Weather Provider
```
Use Orchestrator Agent when you need to coordinate multiple agents:

"Add a new weather provider for Weather.gov API"

Orchestrator will:
1. Ask Product Owner to define data requirements
2. Delegate backend provider implementation to Frontend Agent
3. Coordinate DTOs and hydrator creation
4. Trigger QA to write integration tests
5. Request Technical Writer to document the new provider
```

### Example 2: Fix Scoring Bug
```
Use specific agent for focused work:

"Frontend Agent: Fix the best fishing day calculation - temperature scoring is inverted"

Frontend Agent will:
1. Locate scoring logic in weatherService.js
2. Fix the temperature calculation
3. Update unit tests
4. Notify QA Agent to verify fix
```

### Example 3: Add New Forecast Metric
```
"Frontend Agent: Add UV index to the forecast display"

Frontend Agent will:
1. Update WeatherAppDTO to include UV index
2. Modify provider hydrators to extract UV data
3. Add UI component to display UV index
4. Write component tests
```

## Code Quality Standards

- **ESLint**: react-app configuration
- **Prettier**: Consistent formatting
- **Max File Size**: Keep components focused
- **Test Coverage**: E2E tests for critical paths
- **Documentation**: JSDoc for public APIs, README in major directories

## Testing Requirements

- **E2E Tests**: Playwright for full user workflows
- **BDD Tests**: Cucumber.js for behavior-driven scenarios
- **Component Tests**: React Testing Library for UI components
- **Manual Testing**: Cross-browser, mobile viewport testing

## Common Commands

### Frontend (`web-app/`)
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run lint:strict  # Run ESLint with zero warnings
npm run preview      # Preview production build
```

### Edge Functions (`supabase-edge/`)
```bash
supabase start                    # Start local Supabase
supabase functions serve          # Start Edge Functions locally
supabase functions deploy <name>  # Deploy a function
```

## Agent Coordination Matrix

| Change Type | Primary Agent | Must Notify | For Action |
|------------|--------------|-------------|------------|
| Frontend Code | Frontend | QA | Testing |
| Edge Functions | Backend | QA | Testing |
| Weather Provider | Frontend | QA, Tech Writer | Testing, docs |
| Infrastructure | Infrastructure | Frontend, Backend | Config updates |
| Feature Complete | Any | PO, Tech Writer | Spec updates, docs |
| Test Failures | QA | Frontend or Backend | Bug fixes |

## Documentation

Extensive docs in `/doc/` covering:
- `ARCHITECTURE.md` - System architecture and data flow
- `BUSINESS_LOGIC.md` - Index to business logic docs
- `business_logic/BEST_FISHING_DAY.md` - Scoring algorithm
- `business_logic/DECORATORS.md` - Data normalization
- `business_logic/PROVIDERS.md` - Weather provider integration
- `DEPLOYMENT.md` - Cloudflare Pages, Supabase deployment
- `TESTING.md` - Test strategy and execution
- `SECURITY.md` - Security practices

## Agent Files

- [orchestrator.md](./agent/orchestrator.md) - Coordination agent
- [frontend.md](./agent/frontend.md) - React frontend agent
- [backend.md](./agent/backend.md) - Supabase Edge Functions agent
- [infrastructure.md](./agent/infrastructure.md) - DevOps agent
- [qa.md](./agent/qa.md) - Testing and QA agent
- [product-owner.md](./agent/product-owner.md) - Domain and requirements agent
- [technical-writer.md](./agent/technical-writer.md) - Documentation agent

---

**Squad Mission**: Maintain and enhance Captain Current - a marine weather PWA that helps anglers, boaters, and water sports enthusiasts find the best conditions for their activities.
