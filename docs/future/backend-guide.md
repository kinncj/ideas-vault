# Backend Development Guide

## ⚠️ IMPORTANT: Backend Does Not Exist Yet

**This guide describes a PROPOSED future backend implementation.**

### Current State

Ideas Vault is currently a **frontend-only application** with:
- ❌ NO backend code
- ❌ NO API endpoints
- ❌ NO database
- ❌ NO server infrastructure

### Purpose of This Guide

This document provides:
- **Design patterns** for future backend implementation
- **Best practices** to follow when building the backend
- **Code examples** of recommended approaches
- **Architecture standards** for maintainability

**This is a BLUEPRINT, not documentation of existing code.**

### How to Contribute a Backend

Interested in building the backend for Ideas Vault? Here's how:

1. **Review this guide** for recommended patterns
2. **Open a Discussion** on GitHub to propose your approach
3. **Choose a tech stack**:
   - ASP.NET Core (as proposed here)
   - Node.js + Express/NestJS
   - Python + FastAPI/Django
   - Go + Gin/Echo
   - Your preferred stack!
4. **Start with a minimal API** (authentication, basic CRUD)
5. **Submit PRs incrementally** as you build features

See [Contributing](../../README.md#contributing) for more details.

---

## Proposed Backend Architecture

This guide covers backend development patterns, best practices, and workflows for Ideas Vault using .NET, C#, and Clean Architecture principles.

## Table of Contents

- [Project Structure](#project-structure)
- [Clean Architecture](#clean-architecture)
- [API Development](#api-development)
- [Database with Entity Framework Core](#database-with-entity-framework-core)
- [Dependency Injection](#dependency-injection)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)

## Project Structure

The backend will follow Clean Architecture with clear separation of concerns:

```
ideasvault-backend/
├── src/
│   ├── IdeasVault.Api/                 # Web API Layer
│   │   ├── Controllers/                # API controllers
│   │   ├── Middleware/                 # Custom middleware
│   │   ├── Filters/                    # Action filters
│   │   ├── Models/                     # DTOs and view models
│   │   ├── Program.cs                  # Application entry point
│   │   └── appsettings.json           # Configuration
│   │
│   ├── IdeasVault.Application/         # Application Layer
│   │   ├── Common/                     # Shared application logic
│   │   │   ├── Interfaces/            # Application interfaces
│   │   │   ├── Behaviors/             # MediatR behaviors
│   │   │   └── Exceptions/            # Application exceptions
│   │   ├── Ideas/                      # Idea feature
│   │   │   ├── Commands/              # CQRS commands
│   │   │   ├── Queries/               # CQRS queries
│   │   │   └── Validators/            # FluentValidation validators
│   │   └── DependencyInjection.cs     # DI registration
│   │
│   ├── IdeasVault.Domain/              # Domain Layer
│   │   ├── Entities/                   # Domain entities
│   │   ├── ValueObjects/               # Value objects
│   │   ├── Enums/                      # Domain enumerations
│   │   ├── Events/                     # Domain events
│   │   └── Exceptions/                 # Domain exceptions
│   │
│   └── IdeasVault.Infrastructure/      # Infrastructure Layer
│       ├── Persistence/                # Database implementation
│       │   ├── Configurations/        # EF Core configurations
│       │   ├── Migrations/            # Database migrations
│       │   └── ApplicationDbContext.cs
│       ├── Services/                   # External services
│       ├── Identity/                   # Auth implementation
│       └── DependencyInjection.cs     # DI registration
│
├── tests/
│   ├── IdeasVault.Api.Tests/          # API tests
│   ├── IdeasVault.Application.Tests/  # Application tests
│   ├── IdeasVault.Domain.Tests/       # Domain tests
│   └── IdeasVault.IntegrationTests/   # Integration tests
│
└── IdeasVault.sln                      # Solution file
```

## Clean Architecture

### Dependency Rule

Dependencies flow inward:
```
Infrastructure → Application → Domain
     ↓              ↓
    API    →   Application
```

- **Domain**: Core business logic, entities, value objects (no dependencies)
- **Application**: Use cases, commands, queries (depends on Domain)
- **Infrastructure**: External concerns, DB, services (depends on Application)
- **API**: Controllers, middleware (depends on Application)

### Layer Responsibilities

#### Domain Layer

Pure business logic with no external dependencies:

```csharp
// Domain/Entities/Idea.cs
namespace IdeasVault.Domain.Entities;

public class Idea : AuditableEntity
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public IdeaStatus Status { get; private set; }
    public int ReadinessScore { get; private set; }
    
    private readonly List<Tag> _tags = new();
    public IReadOnlyCollection<Tag> Tags => _tags.AsReadOnly();
    
    private readonly List<Competitor> _competitors = new();
    public IReadOnlyCollection<Competitor> Competitors => _competitors.AsReadOnly();

    // Factory method
    public static Idea Create(string title, string description)
    {
        var idea = new Idea
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = description,
            Status = IdeaStatus.Analyzing,
            ReadinessScore = 0
        };
        
        idea.AddDomainEvent(new IdeaCreatedEvent(idea));
        return idea;
    }

    // Business logic methods
    public void UpdateAnalysis(int readinessScore, IEnumerable<Competitor> competitors)
    {
        if (readinessScore < 0 || readinessScore > 100)
            throw new DomainException("Readiness score must be between 0 and 100");

        ReadinessScore = readinessScore;
        _competitors.Clear();
        _competitors.AddRange(competitors);
        Status = IdeaStatus.Ready;
        
        AddDomainEvent(new IdeaAnalysisCompletedEvent(this));
    }

    public void AddTag(Tag tag)
    {
        if (_tags.Any(t => t.Name == tag.Name))
            return; // Already exists

        _tags.Add(tag);
    }

    public void RemoveTag(string tagName)
    {
        var tag = _tags.FirstOrDefault(t => t.Name == tagName);
        if (tag != null)
            _tags.Remove(tag);
    }
}

// Domain/ValueObjects/Tag.cs
public class Tag : ValueObject
{
    public string Name { get; private set; }

    public Tag(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Tag name cannot be empty");

        Name = name.Trim().ToLower();
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
    }
}
```

#### Application Layer

Use cases and business workflows using CQRS pattern:

```csharp
// Application/Ideas/Commands/CreateIdea/CreateIdeaCommand.cs
using MediatR;

namespace IdeasVault.Application.Ideas.Commands.CreateIdea;

public record CreateIdeaCommand(
    string Title,
    string Description,
    List<string> Tags
) : IRequest<IdeaDto>;

// Application/Ideas/Commands/CreateIdea/CreateIdeaCommandHandler.cs
public class CreateIdeaCommandHandler : IRequestHandler<CreateIdeaCommand, IdeaDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdeaAnalyzer _analyzer;

    public CreateIdeaCommandHandler(
        IApplicationDbContext context,
        IIdeaAnalyzer analyzer)
    {
        _context = context;
        _analyzer = analyzer;
    }

    public async Task<IdeaDto> Handle(
        CreateIdeaCommand request,
        CancellationToken cancellationToken)
    {
        // Create domain entity
        var idea = Idea.Create(request.Title, request.Description);

        // Add tags
        foreach (var tagName in request.Tags)
        {
            idea.AddTag(new Tag(tagName));
        }

        // Save to database
        _context.Ideas.Add(idea);
        await _context.SaveChangesAsync(cancellationToken);

        // Trigger async analysis (fire and forget or use background job)
        _ = Task.Run(async () => await _analyzer.AnalyzeIdeaAsync(idea.Id));

        // Return DTO
        return idea.ToDto();
    }
}

// Application/Ideas/Commands/CreateIdea/CreateIdeaCommandValidator.cs
using FluentValidation;

public class CreateIdeaCommandValidator : AbstractValidator<CreateIdeaCommand>
{
    public CreateIdeaCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(2000).WithMessage("Description must not exceed 2000 characters");

        RuleFor(x => x.Tags)
            .NotNull().WithMessage("Tags cannot be null")
            .Must(tags => tags.Count <= 10).WithMessage("Maximum 10 tags allowed");
    }
}

// Application/Ideas/Queries/GetIdea/GetIdeaQuery.cs
public record GetIdeaQuery(Guid Id) : IRequest<IdeaDto>;

// Application/Ideas/Queries/GetIdea/GetIdeaQueryHandler.cs
public class GetIdeaQueryHandler : IRequestHandler<GetIdeaQuery, IdeaDto>
{
    private readonly IApplicationDbContext _context;

    public GetIdeaQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IdeaDto> Handle(
        GetIdeaQuery request,
        CancellationToken cancellationToken)
    {
        var idea = await _context.Ideas
            .Include(i => i.Tags)
            .Include(i => i.Competitors)
            .FirstOrDefaultAsync(i => i.Id == request.Id, cancellationToken);

        if (idea == null)
            throw new NotFoundException(nameof(Idea), request.Id);

        return idea.ToDto();
    }
}
```

#### Infrastructure Layer

External dependencies and implementations:

```csharp
// Infrastructure/Persistence/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;

namespace IdeasVault.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Idea> Ideas => Set<Idea>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Update audit fields
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    break;
                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    break;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}

// Infrastructure/Persistence/Configurations/IdeaConfiguration.cs
public class IdeaConfiguration : IEntityTypeConfiguration<Idea>
{
    public void Configure(EntityTypeBuilder<Idea> builder)
    {
        builder.HasKey(i => i.Id);

        builder.Property(i => i.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(i => i.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(i => i.Status)
            .HasConversion<string>();

        // Owned collection for tags
        builder.OwnsMany(i => i.Tags, tagsBuilder =>
        {
            tagsBuilder.WithOwner().HasForeignKey("IdeaId");
            tagsBuilder.Property<int>("Id");
            tagsBuilder.HasKey("Id");
            tagsBuilder.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);
        });

        // Navigation to competitors
        builder.HasMany(i => i.Competitors)
            .WithOne()
            .HasForeignKey("IdeaId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
```

#### API Layer

Controllers exposing endpoints:

```csharp
// Api/Controllers/IdeasController.cs
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace IdeasVault.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IdeasController : ControllerBase
{
    private readonly IMediator _mediator;

    public IdeasController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get all ideas for the current user
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(List<IdeaDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<IdeaDto>>> GetIdeas(
        [FromQuery] GetIdeasQuery query)
    {
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Get a specific idea by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(IdeaDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IdeaDto>> GetIdea(Guid id)
    {
        var result = await _mediator.Send(new GetIdeaQuery(id));
        return Ok(result);
    }

    /// <summary>
    /// Create a new idea
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(IdeaDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IdeaDto>> CreateIdea(
        [FromBody] CreateIdeaCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetIdea), new { id = result.Id }, result);
    }

    /// <summary>
    /// Update an existing idea
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateIdea(
        Guid id,
        [FromBody] UpdateIdeaCommand command)
    {
        if (id != command.Id)
            return BadRequest();

        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Delete an idea
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteIdea(Guid id)
    {
        await _mediator.Send(new DeleteIdeaCommand(id));
        return NoContent();
    }
}
```

## API Development

### Program.cs Configuration

```csharp
// Api/Program.cs
using IdeasVault.Application;
using IdeasVault.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "Ideas Vault API", Version = "v1" });
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

// Add application and infrastructure layers
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://yourdomain.com")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### DTOs and Mapping

```csharp
// Application/Ideas/Common/IdeaDto.cs
namespace IdeasVault.Application.Ideas.Common;

public record IdeaDto
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public int ReadinessScore { get; init; }
    public List<string> Tags { get; init; } = new();
    public List<CompetitorDto> Competitors { get; init; } = new();
    public DateTime CreatedAt { get; init; }
}

// Mapping extension
public static class IdeaMappingExtensions
{
    public static IdeaDto ToDto(this Idea idea)
    {
        return new IdeaDto
        {
            Id = idea.Id,
            Title = idea.Title,
            Description = idea.Description,
            Status = idea.Status.ToString(),
            ReadinessScore = idea.ReadinessScore,
            Tags = idea.Tags.Select(t => t.Name).ToList(),
            Competitors = idea.Competitors.Select(c => c.ToDto()).ToList(),
            CreatedAt = idea.CreatedAt
        };
    }
}
```

## Database with Entity Framework Core

### Migrations

```bash
# Add migration
dotnet ef migrations add InitialCreate --project src/IdeasVault.Infrastructure --startup-project src/IdeasVault.Api

# Update database
dotnet ef database update --project src/IdeasVault.Infrastructure --startup-project src/IdeasVault.Api

# Remove last migration
dotnet ef migrations remove --project src/IdeasVault.Infrastructure --startup-project src/IdeasVault.Api
```

### Repository Pattern (Optional)

```csharp
// Application/Common/Interfaces/IRepository.cs
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(T entity, CancellationToken cancellationToken = default);
    Task DeleteAsync(T entity, CancellationToken cancellationToken = default);
}

// Infrastructure/Persistence/Repository.cs
public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbSet.FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _dbSet.ToListAsync(cancellationToken);
    }

    public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await _dbSet.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(T entity, CancellationToken cancellationToken = default)
    {
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
```

## Dependency Injection

### Layer Registration

```csharp
// Application/DependencyInjection.cs
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg => 
            cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));
        
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
        
        return services;
    }
}

// Infrastructure/DependencyInjection.cs
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IApplicationDbContext>(provider => 
            provider.GetRequiredService<ApplicationDbContext>());

        // Services
        services.AddScoped<IIdeaAnalyzer, IdeaAnalyzer>();
        services.AddScoped<IEmailService, EmailService>();
        
        // Identity
        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }
}
```

## Authentication & Authorization

### JWT Authentication

```csharp
// Infrastructure/Identity/JwtService.cs
public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(ApplicationUser user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.UserName!)
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// Api/Program.cs - JWT configuration
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});
```

### Authorization Policies

```csharp
// Api/Program.cs
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => 
        policy.RequireRole("Admin"));
    
    options.AddPolicy("RequireVerifiedEmail", policy =>
        policy.RequireClaim("EmailVerified", "true"));
});

// Controller usage
[Authorize(Policy = "RequireAdminRole")]
[HttpPost("admin/seed")]
public async Task<IActionResult> SeedData() { }
```

## Error Handling

### Global Exception Handler

```csharp
// Api/Middleware/ExceptionHandlingMiddleware.cs
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "An unhandled exception occurred");

        var (statusCode, message) = exception switch
        {
            NotFoundException => (StatusCodes.Status404NotFound, exception.Message),
            ValidationException => (StatusCodes.Status400BadRequest, exception.Message),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized"),
            _ => (StatusCodes.Status500InternalServerError, "An error occurred")
        };

        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";

        var response = new
        {
            error = message,
            statusCode
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}
```

### Validation Pipeline Behavior

```csharp
// Application/Common/Behaviors/ValidationBehavior.cs
public class ValidationBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var validationResults = await Task.WhenAll(
            _validators.Select(v => v.ValidateAsync(context, cancellationToken)));

        var failures = validationResults
            .SelectMany(r => r.Errors)
            .Where(f => f != null)
            .ToList();

        if (failures.Count != 0)
            throw new ValidationException(failures);

        return await next();
    }
}
```

## Common Patterns

### Unit of Work Pattern

```csharp
public interface IUnitOfWork : IDisposable
{
    IRepository<Idea> Ideas { get; }
    IRepository<User> Users { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
        Ideas = new Repository<Idea>(_context);
        Users = new Repository<User>(_context);
    }

    public IRepository<Idea> Ideas { get; }
    public IRepository<User> Users { get; }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
```

### Specification Pattern

```csharp
// Application/Common/Specifications/Specification.cs
public abstract class Specification<T>
{
    public abstract Expression<Func<T, bool>> ToExpression();

    public bool IsSatisfiedBy(T entity)
    {
        var predicate = ToExpression().Compile();
        return predicate(entity);
    }
}

// Application/Ideas/Specifications/IdeaByStatusSpecification.cs
public class IdeaByStatusSpecification : Specification<Idea>
{
    private readonly IdeaStatus _status;

    public IdeaByStatusSpecification(IdeaStatus status)
    {
        _status = status;
    }

    public override Expression<Func<Idea, bool>> ToExpression()
    {
        return idea => idea.Status == _status;
    }
}

// Usage
var spec = new IdeaByStatusSpecification(IdeaStatus.Ready);
var readyIdeas = await _context.Ideas
    .Where(spec.ToExpression())
    .ToListAsync();
```

## Best Practices

### 1. Use Async/Await Properly

```csharp
// ✅ Good
public async Task<IdeaDto> GetIdeaAsync(Guid id)
{
    var idea = await _context.Ideas
        .Include(i => i.Tags)
        .FirstOrDefaultAsync(i => i.Id == id);
    
    return idea.ToDto();
}

// ❌ Bad: Blocking
public IdeaDto GetIdea(Guid id)
{
    var idea = _context.Ideas
        .Include(i => i.Tags)
        .FirstOrDefault(i => i.Id == id);
    
    return idea.ToDto();
}
```

### 2. Use ConfigureAwait Appropriately

```csharp
// In library code
public async Task<Idea> GetIdeaAsync(Guid id)
{
    return await _context.Ideas
        .FindAsync(id)
        .ConfigureAwait(false);
}
```

### 3. Validate Input

```csharp
public class CreateIdeaCommandValidator : AbstractValidator<CreateIdeaCommand>
{
    public CreateIdeaCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200)
            .Matches(@"^[a-zA-Z0-9\s\-]+$");

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);
    }
}
```

### 4. Use Cancellation Tokens

```csharp
public async Task<IdeaDto> Handle(
    GetIdeaQuery request,
    CancellationToken cancellationToken)
{
    var idea = await _context.Ideas
        .FirstOrDefaultAsync(i => i.id == request.Id, cancellationToken);
    
    return idea.ToDto();
}
```

### 5. Log Appropriately

```csharp
public class CreateIdeaCommandHandler
{
    private readonly ILogger<CreateIdeaCommandHandler> _logger;

    public async Task<IdeaDto> Handle(CreateIdeaCommand request, CancellationToken ct)
    {
        _logger.LogInformation("Creating idea: {Title}", request.Title);
        
        try
        {
            // Implementation
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create idea: {Title}", request.Title);
            throw;
        }
    }
}
```

## Next Steps

- Review [Testing Guide](./testing-guide.md) for testing backend code
- Check [Code Style Guide](./code-style.md) for C# conventions
- Explore [Frontend Guide](./frontend-guide.md) for API integration

---

**Clean architecture leads to maintainable code!** 🏗️
