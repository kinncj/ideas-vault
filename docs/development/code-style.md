# Code Style Guide

This guide defines coding standards, naming conventions, formatting rules, and best practices for Ideas Vault across TypeScript/React and C#/.NET codebases.

## Table of Contents

- [General Principles](#general-principles)
- [TypeScript/React Standards](#typescriptreact-standards)
- [C#/.NET Standards](#cnet-standards)
- [Code Formatting](#code-formatting)
- [SOLID Principles](#solid-principles)
- [Code Review Checklist](#code-review-checklist)
- [Git Commit Conventions](#git-commit-conventions)
- [Documentation Requirements](#documentation-requirements)

## General Principles

### Core Values

1. **Clarity over Cleverness**: Write code that's easy to understand
2. **Consistency**: Follow established patterns throughout the codebase
3. **Maintainability**: Code should be easy to modify and extend
4. **Testability**: Write code that's easy to test
5. **Performance**: Optimize where it matters, but don't prematurely optimize

### Code Quality Rules

- **DRY (Don't Repeat Yourself)**: Extract common logic into reusable functions
- **KISS (Keep It Simple, Stupid)**: Favor simple solutions over complex ones
- **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's needed
- **Separation of Concerns**: Keep different responsibilities in different modules
- **Single Source of Truth**: Avoid data duplication

## TypeScript/React Standards

### File Naming

```
Components:        PascalCase.tsx        (Dashboard.tsx, CaptureModal.tsx)
Utilities:         camelCase.ts          (storage.ts, aiAnalyzer.ts)
Types/Constants:   camelCase.ts          (constants.ts, types.ts)
Tests:             *.test.ts(x)          (Dashboard.test.tsx, storage.test.ts)
Styles:            *.css                 (index.css, App.css)
```

### Variable Naming

```typescript
// Constants - UPPER_SNAKE_CASE
const MAX_IDEAS_PER_PAGE = 20;
const API_BASE_URL = 'https://api.example.com';

// Variables and functions - camelCase
const ideaCount = ideas.length;
const handleSubmit = () => {};
const calculateScore = (idea: Idea) => {};

// Types and Interfaces - PascalCase
type IdeaStatus = 'ready' | 'analyzing';
interface IdeaProps {
  idea: Idea;
  onSelect: (idea: Idea) => void;
}

// Components - PascalCase
function Dashboard() {}
export function IdeaCard() {}

// Private/internal - prefix with underscore (sparingly)
const _internalHelper = () => {};

// Booleans - prefix with is, has, should, can
const isLoading = false;
const hasErrors = true;
const shouldUpdate = false;
const canEdit = true;
```

### Type Annotations

Always use explicit types for function parameters and return values:

```typescript
// ✅ Good: Explicit types
function calculateReadinessScore(
  idea: Idea,
  competitors: Competitor[]
): number {
  // Implementation
  return score;
}

interface StorageService {
  getIdeas(): Idea[];
  addIdea(idea: Idea): void;
  updateIdea(id: string, updates: Partial<Idea>): void;
}

// ❌ Bad: Implicit types
function calculate(data) {
  return data.score;
}
```

### Type Definitions

Use `interface` for object shapes, `type` for unions/intersections:

```typescript
// ✅ Good: Interface for objects
interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
}

// ✅ Good: Type for unions and utilities
type IdeaStatus = 'ready' | 'analyzing';
type InputType = 'text' | 'voice' | 'image';
type IdeaPartial = Partial<Idea>;

// ✅ Good: Type for intersection
type AuditableIdea = Idea & {
  createdAt: Date;
  updatedAt: Date;
};
```

### Component Structure

```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import type { Idea } from '../constants';

// 2. Types/Interfaces
interface DashboardProps {
  ideas: Idea[];
  onOpenCapture: () => void;
  onSelectIdea: (idea: Idea) => void;
}

// 3. Constants (if any)
const ITEMS_PER_PAGE = 20;

// 4. Component
export function Dashboard({ 
  ideas, 
  onOpenCapture, 
  onSelectIdea 
}: DashboardProps) {
  // 4a. Hooks
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  
  // 4b. Derived state
  const filteredIdeas = ideas.filter(idea => 
    filter === 'all' || idea.status === filter
  );
  
  // 4c. Effects
  useEffect(() => {
    document.title = `Dashboard (${ideas.length} ideas)`;
  }, [ideas.length]);
  
  // 4d. Event handlers
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  // 4e. Render helpers (if complex)
  const renderIdeaCard = (idea: Idea) => (
    <IdeaCard key={idea.id} idea={idea} onSelect={onSelectIdea} />
  );
  
  // 4f. Main render
  return (
    <div className="p-6">
      <DashboardHeader onOpenCapture={onOpenCapture} />
      <FilterBar filter={filter} onChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdeas.map(renderIdeaCard)}
      </div>
    </div>
  );
}
```

### Props Destructuring

Destructure props in function signature:

```typescript
// ✅ Good: Destructured with types
function IdeaCard({ idea, onSelect, onDelete }: IdeaCardProps) {
  return <div onClick={() => onSelect(idea)}>{idea.title}</div>;
}

// ❌ Bad: Using props object
function IdeaCard(props: IdeaCardProps) {
  return <div onClick={() => props.onSelect(props.idea)}>{props.idea.title}</div>;
}
```

### Conditional Rendering

```typescript
// ✅ Good: Early returns
function IdeaList({ ideas, isLoading, error }: IdeaListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (ideas.length === 0) return <EmptyState />;
  
  return (
    <div>
      {ideas.map(idea => <IdeaCard key={idea.id} idea={idea} />)}
    </div>
  );
}

// ✅ Good: Ternary for simple conditions
<div>
  {isEditing ? <EditForm /> : <DisplayView />}
</div>

// ✅ Good: Logical AND for optional rendering
<div>
  {showDetails && <DetailPanel />}
</div>

// ❌ Bad: Nested ternaries
<div>
  {isLoading ? <Spinner /> : hasError ? <Error /> : ideas.length > 0 ? <List /> : <Empty />}
</div>
```

### Array Methods

Prefer declarative array methods over imperative loops:

```typescript
// ✅ Good: Declarative
const readyIdeas = ideas.filter(idea => idea.status === 'ready');
const titles = ideas.map(idea => idea.title);
const avgScore = ideas.reduce((sum, idea) => sum + idea.readinessScore, 0) / ideas.length;
const hasUnanalyzed = ideas.some(idea => idea.status === 'analyzing');

// ❌ Bad: Imperative (unless performance-critical)
const readyIdeas = [];
for (let i = 0; i < ideas.length; i++) {
  if (ideas[i].status === 'ready') {
    readyIdeas.push(ideas[i]);
  }
}
```

### Async/Await

Always use async/await instead of Promise chains:

```typescript
// ✅ Good: Async/await
async function loadIdea(id: string): Promise<Idea> {
  try {
    const response = await fetch(`/api/ideas/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load idea:', error);
    throw error;
  }
}

// ❌ Bad: Promise chains
function loadIdea(id: string): Promise<Idea> {
  return fetch(`/api/ideas/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Failed to load idea:', error);
      throw error;
    });
}
```

### Error Handling

```typescript
// ✅ Good: Specific error handling
async function saveIdea(idea: Idea): Promise<void> {
  try {
    await storage.addIdea(idea);
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      console.error('Storage quota exceeded');
      throw new Error('Storage is full. Please delete some ideas.');
    }
    console.error('Failed to save idea:', error);
    throw error;
  }
}

// Error boundaries for components
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## C#/.NET Standards

### File Naming

```
Classes:           PascalCase.cs         (Idea.cs, IdeaService.cs)
Interfaces:        IPascalCase.cs        (IRepository.cs, IIdeaAnalyzer.cs)
Tests:             *Tests.cs             (IdeaTests.cs, IdeaServiceTests.cs)
```

### Naming Conventions

```csharp
// Namespaces - PascalCase, hierarchical
namespace IdeasVault.Application.Ideas.Commands;

// Classes and Structs - PascalCase
public class Idea
public struct Coordinates

// Interfaces - PascalCase with 'I' prefix
public interface IRepository<T>
public interface IIdeaAnalyzer

// Methods - PascalCase
public async Task<Idea> GetIdeaAsync(Guid id)
public void UpdateStatus(IdeaStatus status)

// Properties - PascalCase
public string Title { get; private set; }
public int ReadinessScore { get; set; }

// Fields - camelCase with underscore prefix
private readonly IApplicationDbContext _context;
private string _internalState;

// Constants - PascalCase
public const int MaxIdeasPerPage = 20;
private const string DefaultStatus = "analyzing";

// Local variables and parameters - camelCase
var ideaCount = ideas.Count;
public void ProcessIdea(Idea idea, bool forceUpdate)

// Booleans - descriptive, can use 'is', 'has', 'can' prefix
public bool IsValid { get; }
private bool hasBeenAnalyzed;
public bool CanEdit(User user)
```

### Class Structure

```csharp
public class Idea : AuditableEntity
{
    // 1. Constants
    private const int MaxTitleLength = 200;
    
    // 2. Fields
    private readonly List<Tag> _tags = new();
    
    // 3. Constructors
    private Idea() { } // For EF Core
    
    // 4. Properties
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public IReadOnlyCollection<Tag> Tags => _tags.AsReadOnly();
    
    // 5. Factory methods
    public static Idea Create(string title, string description)
    {
        var idea = new Idea
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = description
        };
        
        idea.AddDomainEvent(new IdeaCreatedEvent(idea));
        return idea;
    }
    
    // 6. Public methods
    public void UpdateTitle(string newTitle)
    {
        if (string.IsNullOrWhiteSpace(newTitle))
            throw new DomainException("Title cannot be empty");
            
        if (newTitle.Length > MaxTitleLength)
            throw new DomainException($"Title cannot exceed {MaxTitleLength} characters");
            
        Title = newTitle;
    }
    
    public void AddTag(Tag tag)
    {
        if (_tags.Any(t => t.Name == tag.Name))
            return;
            
        _tags.Add(tag);
    }
    
    // 7. Private methods
    private void ValidateState()
    {
        // Validation logic
    }
}
```

### Method Guidelines

```csharp
// ✅ Good: Clear intent, single responsibility
public async Task<IdeaDto> GetIdeaByIdAsync(Guid id, CancellationToken cancellationToken)
{
    var idea = await _context.Ideas
        .Include(i => i.Tags)
        .FirstOrDefaultAsync(i => i.Id == id, cancellationToken);
        
    if (idea == null)
        throw new NotFoundException(nameof(Idea), id);
        
    return idea.ToDto();
}

// ✅ Good: Expression-bodied members for simple methods
public bool IsAnalyzing() => Status == IdeaStatus.Analyzing;
public int GetTagCount() => Tags.Count;

// ✅ Good: Guard clauses
public void UpdateAnalysis(int readinessScore)
{
    if (readinessScore < 0 || readinessScore > 100)
        throw new DomainException("Score must be between 0 and 100");
        
    if (Status != IdeaStatus.Analyzing)
        throw new DomainException("Can only update analysis for analyzing ideas");
        
    ReadinessScore = readinessScore;
    Status = IdeaStatus.Ready;
}

// ❌ Bad: Deep nesting
public void ProcessIdea(Idea idea)
{
    if (idea != null)
    {
        if (idea.Status == IdeaStatus.Analyzing)
        {
            if (idea.ReadinessScore > 0)
            {
                // Logic deeply nested
            }
        }
    }
}
```

### LINQ Usage

```csharp
// ✅ Good: Readable query syntax
var readyIdeas = ideas
    .Where(i => i.Status == IdeaStatus.Ready)
    .OrderByDescending(i => i.ReadinessScore)
    .Take(10)
    .ToList();

// ✅ Good: Async LINQ with EF Core
var highScoreIdeas = await _context.Ideas
    .Where(i => i.ReadinessScore > 80)
    .Include(i => i.Tags)
    .ToListAsync(cancellationToken);

// ✅ Good: Projection to DTOs
var ideaSummaries = await _context.Ideas
    .Select(i => new IdeaSummaryDto
    {
        Id = i.Id,
        Title = i.Title,
        Score = i.ReadinessScore
    })
    .ToListAsync();
```

### Async/Await

```csharp
// ✅ Good: Async all the way
public async Task<Idea> GetIdeaAsync(Guid id)
{
    var idea = await _context.Ideas.FindAsync(id);
    return idea;
}

// ✅ Good: ConfigureAwait in library code
public async Task<Idea> GetIdeaAsync(Guid id)
{
    var idea = await _context.Ideas
        .FindAsync(id)
        .ConfigureAwait(false);
    return idea;
}

// ✅ Good: CancellationToken support
public async Task<List<Idea>> GetIdeasAsync(CancellationToken cancellationToken = default)
{
    return await _context.Ideas
        .ToListAsync(cancellationToken);
}

// ❌ Bad: Blocking on async code
public Idea GetIdea(Guid id)
{
    return GetIdeaAsync(id).Result; // Can cause deadlocks!
}
```

### Null Handling

```csharp
// ✅ Good: Nullable reference types enabled
#nullable enable

public class IdeaService
{
    private readonly IApplicationDbContext _context;
    
    public async Task<Idea?> FindIdeaAsync(Guid id)
    {
        return await _context.Ideas.FindAsync(id);
    }
    
    public async Task<Idea> GetIdeaAsync(Guid id)
    {
        var idea = await FindIdeaAsync(id);
        return idea ?? throw new NotFoundException(nameof(Idea), id);
    }
}

// ✅ Good: Null-coalescing and null-conditional
var title = idea?.Title ?? "Untitled";
var tagCount = idea?.Tags?.Count ?? 0;

// ✅ Good: Pattern matching
if (idea is not null)
{
    ProcessIdea(idea);
}
```

### Exception Handling

```csharp
// ✅ Good: Specific exceptions
public void UpdateIdea(Idea idea)
{
    if (idea == null)
        throw new ArgumentNullException(nameof(idea));
        
    if (string.IsNullOrWhiteSpace(idea.Title))
        throw new ValidationException("Title is required");
        
    try
    {
        _context.Ideas.Update(idea);
        _context.SaveChanges();
    }
    catch (DbUpdateException ex)
    {
        _logger.LogError(ex, "Failed to update idea {IdeaId}", idea.Id);
        throw new DataAccessException("Failed to update idea", ex);
    }
}

// ✅ Good: Domain exceptions
public class DomainException : Exception
{
    public DomainException(string message) : base(message) { }
}

public class NotFoundException : Exception
{
    public NotFoundException(string entityName, object key)
        : base($"{entityName} with key {key} was not found") { }
}
```

## Code Formatting

### EditorConfig

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{ts,tsx,js,jsx}]
indent_size = 2
quote_type = single

[*.{cs,csx}]
indent_size = 4

[*.{json,yml,yaml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

### ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
```

### Prettier Configuration (Optional)

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid"
}
```

## SOLID Principles

### Single Responsibility Principle (SRP)

Each class/function should have one reason to change:

```typescript
// ✅ Good: Separated concerns
class IdeaStorage {
  save(idea: Idea): void { /* ... */ }
  load(id: string): Idea { /* ... */ }
}

class IdeaValidator {
  validate(idea: Idea): ValidationResult { /* ... */ }
}

class IdeaAnalyzer {
  analyze(idea: Idea): AnalysisResult { /* ... */ }
}

// ❌ Bad: Multiple responsibilities
class IdeaManager {
  save(idea: Idea): void { /* ... */ }
  validate(idea: Idea): boolean { /* ... */ }
  analyze(idea: Idea): AnalysisResult { /* ... */ }
  sendEmail(idea: Idea): void { /* ... */ }
}
```

### Open/Closed Principle (OCP)

Open for extension, closed for modification:

```typescript
// ✅ Good: Extensible through interfaces
interface IdeaExporter {
  export(ideas: Idea[]): Blob;
}

class JsonExporter implements IdeaExporter {
  export(ideas: Idea[]): Blob {
    return new Blob([JSON.stringify(ideas)], { type: 'application/json' });
  }
}

class CsvExporter implements IdeaExporter {
  export(ideas: Idea[]): Blob {
    // CSV export logic
  }
}

class ExportService {
  constructor(private exporter: IdeaExporter) {}
  
  exportIdeas(ideas: Idea[]): Blob {
    return this.exporter.export(ideas);
  }
}
```

### Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types:

```csharp
// ✅ Good: Proper inheritance
public abstract class BaseRepository<T>
{
    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        // Base implementation
    }
}

public class IdeaRepository : BaseRepository<Idea>
{
    public override async Task<Idea?> GetByIdAsync(Guid id)
    {
        // Enhances but doesn't break base contract
        var idea = await base.GetByIdAsync(id);
        // Additional logic
        return idea;
    }
}
```

### Interface Segregation Principle (ISP)

Clients shouldn't depend on interfaces they don't use:

```typescript
// ✅ Good: Focused interfaces
interface IdeaReader {
  getIdea(id: string): Idea;
  getAllIdeas(): Idea[];
}

interface IdeaWriter {
  addIdea(idea: Idea): void;
  updateIdea(id: string, updates: Partial<Idea>): void;
  deleteIdea(id: string): void;
}

// ❌ Bad: Fat interface
interface IdeaRepository {
  getIdea(id: string): Idea;
  getAllIdeas(): Idea[];
  addIdea(idea: Idea): void;
  updateIdea(id: string, updates: Partial<Idea>): void;
  deleteIdea(id: string): void;
  exportToJson(): string;
  importFromJson(json: string): void;
  validateIdea(idea: Idea): boolean;
}
```

### Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

```csharp
// ✅ Good: Depend on abstraction
public interface IIdeaAnalyzer
{
    Task<AnalysisResult> AnalyzeAsync(Idea idea);
}

public class IdeaService
{
    private readonly IIdeaAnalyzer _analyzer; // Abstraction
    
    public IdeaService(IIdeaAnalyzer analyzer)
    {
        _analyzer = analyzer;
    }
}

// ❌ Bad: Depend on concrete implementation
public class IdeaService
{
    private readonly OpenAIAnalyzer _analyzer; // Concrete class
    
    public IdeaService()
    {
        _analyzer = new OpenAIAnalyzer(); // Tight coupling
    }
}
```

## Code Review Checklist

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs

### Design
- [ ] Follows SOLID principles
- [ ] Appropriate separation of concerns
- [ ] Reuses existing code where appropriate
- [ ] No unnecessary complexity

### Code Quality
- [ ] Follows naming conventions
- [ ] Self-documenting with clear names
- [ ] No commented-out code
- [ ] No console.log or debug statements

### Testing
- [ ] Unit tests added/updated
- [ ] Tests are meaningful and cover edge cases
- [ ] Tests pass locally
- [ ] Code coverage maintained or improved

### Documentation
- [ ] Public APIs are documented
- [ ] Complex logic has explanatory comments
- [ ] README updated if needed
- [ ] Breaking changes documented

### Performance
- [ ] No obvious performance issues
- [ ] Appropriate use of caching
- [ ] Database queries are optimized
- [ ] Large lists use pagination/virtualization

### Security
- [ ] Input validation performed
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Sensitive data protected

## Git Commit Conventions

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(dashboard): add filtering by status
feat(api): implement JWT authentication

# Bug fix
fix(storage): handle quota exceeded error
fix(modal): prevent form submission when invalid

# Documentation
docs(readme): add installation instructions
docs(api): document authentication endpoints

# Refactoring
refactor(storage): extract localStorage logic to utility
refactor(components): simplify Dashboard component structure

# Testing
test(storage): add tests for updateIdea function
test(api): add integration tests for idea endpoints

# Multiple lines
feat(export): add CSV export functionality

Implements CSV export for ideas with configurable options.
Users can now export their ideas to CSV format including
all metadata and analysis results.

Closes #123
```

### Branch Naming

```
feature/add-export-functionality
bugfix/fix-storage-quota-error
hotfix/critical-security-patch
refactor/simplify-dashboard-logic
docs/update-api-documentation
```

## Documentation Requirements

### Code Comments

```typescript
// ✅ Good: Explain WHY, not WHAT
// Use batch processing to avoid rate limits from the AI service
const results = await analyzeBatch(ideas, { batchSize: 10 });

// ✅ Good: Explain complex logic
// Calculate weighted score: readiness (60%) + market size (25%) + trend (15%)
const finalScore = (readinessScore * 0.6) + (marketScore * 0.25) + (trendScore * 0.15);

// ❌ Bad: Obvious comment
// Increment counter by one
counter++;

// ❌ Bad: Commented-out code
// const oldCalculation = (a, b) => a + b;
```

### Function Documentation

```typescript
/**
 * Analyzes an idea and generates insights including market size,
 * competitors, and readiness score.
 * 
 * @param idea - The idea to analyze
 * @param options - Analysis options
 * @returns Analysis results with score and recommendations
 * @throws {ValidationError} If idea data is invalid
 * @throws {ServiceError} If AI service is unavailable
 * 
 * @example
 * ```typescript
 * const result = await analyzeIdea(myIdea, { includeCompetitors: true });
 * console.log(result.readinessScore);
 * ```
 */
async function analyzeIdea(
  idea: Idea, 
  options: AnalysisOptions
): Promise<AnalysisResult> {
  // Implementation
}
```

```csharp
/// <summary>
/// Creates a new idea and triggers asynchronous analysis.
/// </summary>
/// <param name="command">The command containing idea details</param>
/// <param name="cancellationToken">Cancellation token</param>
/// <returns>The created idea DTO</returns>
/// <exception cref="ValidationException">Thrown when command validation fails</exception>
/// <remarks>
/// This method adds the idea to the database immediately with 'Analyzing' status.
/// The analysis is performed asynchronously and the status is updated when complete.
/// </remarks>
public async Task<IdeaDto> Handle(
    CreateIdeaCommand command,
    CancellationToken cancellationToken)
{
    // Implementation
}
```

### README Sections

Every significant module should have a README:

```markdown
# Module Name

## Overview
Brief description of what this module does.

## Installation
Steps to install dependencies.

## Usage
Basic usage examples.

## API Reference
Key functions/classes and their signatures.

## Configuration
Environment variables and configuration options.

## Development
How to run tests, build, etc.

## Contributing
How to contribute to this module.
```

---

**Consistent code is maintainable code!** 📝
