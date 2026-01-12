# Testing Guide

This guide covers testing strategies, best practices, and patterns for Ideas Vault across frontend (Vitest, React Testing Library, Playwright) and backend (xUnit, NUnit, Moq).

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Pyramid](#test-pyramid)
- [Frontend Testing](#frontend-testing)
- [Backend Testing](#backend-testing)
- [E2E Testing](#e2e-testing)
- [Test Data Management](#test-data-management)
- [CI/CD Integration](#cicd-integration)
- [Code Coverage](#code-coverage)
- [Best Practices](#best-practices)

## Testing Philosophy

### Core Principles

1. **Tests should be reliable**: No flaky tests
2. **Tests should be fast**: Quick feedback loop
3. **Tests should be isolated**: Independent of each other
4. **Tests should be readable**: Clear intent and expectations
5. **Tests should provide value**: Test behavior, not implementation

### AAA Pattern

All tests follow the Arrange-Act-Assert pattern:

```typescript
test('should add new idea to the list', async () => {
  // Arrange - Set up test data and conditions
  const newIdea = { title: 'Test Idea', description: 'Test Description' };
  
  // Act - Perform the action
  await storage.addIdea(newIdea);
  
  // Assert - Verify the outcome
  const ideas = storage.getIdeas();
  expect(ideas).toContainEqual(expect.objectContaining(newIdea));
});
```

## Test Pyramid

Ideas Vault follows the testing pyramid with emphasis on lower-level tests:

```
           /\
          /  \
         / E2E \         ← Few (5-10%) - Full user workflows
        /-------\
       /  Integ  \       ← Some (20-30%) - Component/API integration
      /-----------\
     /    Unit     \     ← Many (60-75%) - Pure logic and functions
    /_______________\
```

### Test Distribution

- **Unit Tests (60-75%)**: Fast, isolated, test pure functions and logic
- **Integration Tests (20-30%)**: Test component interactions and API calls
- **E2E Tests (5-10%)**: Test critical user journeys

## Frontend Testing

### Setup Vitest

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData.ts'
      ]
    }
  }
});
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

### Unit Tests - Utilities

Test pure functions and business logic:

```typescript
// src/utils/storage.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { storage } from './storage';
import type { Idea } from '../constants';

describe('Storage Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getIdeas', () => {
    it('should return empty array when no ideas exist', () => {
      // Arrange
      localStorage.getItem.mockReturnValue(null);

      // Act
      const result = storage.getIdeas();

      // Assert
      expect(result).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith('ideasvault_ideas');
    });

    it('should return parsed ideas from localStorage', () => {
      // Arrange
      const mockIdeas: Idea[] = [
        {
          id: '1',
          title: 'Test Idea',
          description: 'Test Description',
          tags: ['test'],
          status: 'ready',
          inputType: 'text',
          readinessScore: 75,
          marketSize: 'Large',
          targetAudience: 'Developers',
          topCompetitor: 'Competitor A',
          competitorStrength: 'Strong brand',
          keyTrend: 'Growing market',
          competitors: [],
          growthMetrics: [],
          actionPlan: [],
          createdAt: new Date('2024-01-01')
        }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(mockIdeas));

      // Act
      const result = storage.getIdeas();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Test Idea');
      expect(result[0].createdAt).toBeInstanceOf(Date);
    });

    it('should handle corrupted data gracefully', () => {
      // Arrange
      localStorage.getItem.mockReturnValue('invalid json');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      const result = storage.getIdeas();

      // Assert
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('addIdea', () => {
    it('should add idea to storage', () => {
      // Arrange
      const newIdea: Idea = {
        id: '1',
        title: 'New Idea',
        description: 'Description',
        tags: ['new'],
        status: 'ready',
        inputType: 'text',
        readinessScore: 80,
        marketSize: 'Medium',
        targetAudience: 'Startups',
        topCompetitor: 'None',
        competitorStrength: 'N/A',
        keyTrend: 'Emerging',
        competitors: [],
        growthMetrics: [],
        actionPlan: [],
        createdAt: new Date()
      };
      localStorage.getItem.mockReturnValue(JSON.stringify([]));

      // Act
      storage.addIdea(newIdea);

      // Assert
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'ideasvault_ideas',
        expect.stringContaining('New Idea')
      );
    });

    it('should prepend new idea to existing ideas', () => {
      // Arrange
      const existingIdea: Idea = { /* ... */ };
      const newIdea: Idea = { /* ... */ };
      localStorage.getItem.mockReturnValue(JSON.stringify([existingIdea]));

      // Act
      storage.addIdea(newIdea);

      // Assert
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(savedData[0].id).toBe(newIdea.id);
      expect(savedData).toHaveLength(2);
    });
  });

  describe('updateIdea', () => {
    it('should update existing idea', () => {
      // Arrange
      const existingIdea: Idea = { id: '1', title: 'Original', /* ... */ };
      localStorage.getItem.mockReturnValue(JSON.stringify([existingIdea]));

      // Act
      storage.updateIdea('1', { title: 'Updated', status: 'ready' });

      // Assert
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(savedData[0].title).toBe('Updated');
      expect(savedData[0].status).toBe('ready');
    });

    it('should not modify other ideas', () => {
      // Arrange
      const ideas: Idea[] = [
        { id: '1', title: 'Idea 1', /* ... */ },
        { id: '2', title: 'Idea 2', /* ... */ }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(ideas));

      // Act
      storage.updateIdea('1', { title: 'Updated' });

      // Assert
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(savedData[0].title).toBe('Updated');
      expect(savedData[1].title).toBe('Idea 2');
    });
  });

  describe('deleteIdea', () => {
    it('should remove idea from storage', () => {
      // Arrange
      const ideas: Idea[] = [
        { id: '1', /* ... */ },
        { id: '2', /* ... */ }
      ];
      localStorage.getItem.mockReturnValue(JSON.stringify(ideas));

      // Act
      storage.deleteIdea('1');

      // Assert
      const savedData = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(1);
      expect(savedData[0].id).toBe('2');
    });
  });
});
```

### Component Tests - React Testing Library

Test component rendering and user interactions:

```typescript
// src/components/CaptureModal.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaptureModal } from './CaptureModal';

describe('CaptureModal', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isOpen is false', () => {
    // Arrange & Act
    render(
      <CaptureModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Assert
    expect(screen.queryByText(/capture idea/i)).not.toBeInTheDocument();
  });

  it('should render modal when isOpen is true', () => {
    // Arrange & Act
    render(
      <CaptureModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Assert
    expect(screen.getByText(/capture idea/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <CaptureModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Act
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should submit form with valid data', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <CaptureModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Act
    await user.type(screen.getByLabelText(/title/i), 'Test Idea');
    await user.type(screen.getByLabelText(/description/i), 'Test Description');
    await user.type(screen.getByLabelText(/tags/i), 'test, demo');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        'Test Idea',
        'Test Description',
        ['test', 'demo'],
        'text'
      );
    });
  });

  it('should show validation error for empty title', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <CaptureModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Act
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Assert
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should enable voice input when microphone button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <CaptureModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    // Act
    const micButton = screen.getByRole('button', { name: /microphone/i });
    await user.click(micButton);

    // Assert
    expect(screen.getByText(/listening/i)).toBeInTheDocument();
  });
});
```

### Custom Hook Tests

```typescript
// src/hooks/useIdeas.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useIdeas } from './useIdeas';
import { storage } from '../utils/storage';

vi.mock('../utils/storage');

describe('useIdeas Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load ideas on mount', async () => {
    // Arrange
    const mockIdeas = [{ id: '1', title: 'Test Idea', /* ... */ }];
    vi.mocked(storage.getIdeas).mockReturnValue(mockIdeas);

    // Act
    const { result } = renderHook(() => useIdeas());

    // Assert
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.ideas).toEqual(mockIdeas);
  });

  it('should add new idea', async () => {
    // Arrange
    vi.mocked(storage.getIdeas).mockReturnValue([]);
    const { result } = renderHook(() => useIdeas());
    const newIdea = { id: '1', title: 'New Idea', /* ... */ };

    // Act
    await act(async () => {
      result.current.addIdea(newIdea);
    });

    // Assert
    expect(storage.addIdea).toHaveBeenCalledWith(newIdea);
    expect(result.current.ideas).toContainEqual(newIdea);
  });

  it('should update existing idea', async () => {
    // Arrange
    const existingIdea = { id: '1', title: 'Original', status: 'analyzing' };
    vi.mocked(storage.getIdeas).mockReturnValue([existingIdea]);
    const { result } = renderHook(() => useIdeas());

    // Act
    await act(async () => {
      result.current.updateIdea('1', { status: 'ready' });
    });

    // Assert
    expect(storage.updateIdea).toHaveBeenCalledWith('1', { status: 'ready' });
    expect(result.current.ideas[0].status).toBe('ready');
  });

  it('should delete idea', async () => {
    // Arrange
    const existingIdea = { id: '1', title: 'To Delete', /* ... */ };
    vi.mocked(storage.getIdeas).mockReturnValue([existingIdea]);
    const { result } = renderHook(() => useIdeas());

    // Act
    await act(async () => {
      result.current.deleteIdea('1');
    });

    // Assert
    expect(storage.deleteIdea).toHaveBeenCalledWith('1');
    expect(result.current.ideas).toHaveLength(0);
  });
});
```

## Backend Testing

### Setup xUnit

```csharp
// tests/IdeasVault.Application.Tests/IdeasVault.Application.Tests.csproj
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <IsPackable>false</IsPackable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.8.0" />
    <PackageReference Include="xunit" Version="2.6.2" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.5.4" />
    <PackageReference Include="FluentAssertions" Version="6.12.0" />
    <PackageReference Include="Moq" Version="4.20.69" />
    <PackageReference Include="coverlet.collector" Version="6.0.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\..\src\IdeasVault.Application\IdeasVault.Application.csproj" />
  </ItemGroup>
</Project>
```

### Unit Tests - Command Handlers

```csharp
// tests/IdeasVault.Application.Tests/Ideas/Commands/CreateIdeaCommandHandlerTests.cs
using FluentAssertions;
using Moq;
using Xunit;

namespace IdeasVault.Application.Tests.Ideas.Commands;

public class CreateIdeaCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<IIdeaAnalyzer> _analyzerMock;
    private readonly CreateIdeaCommandHandler _handler;

    public CreateIdeaCommandHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _analyzerMock = new Mock<IIdeaAnalyzer>();
        _handler = new CreateIdeaCommandHandler(_contextMock.Object, _analyzerMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_ShouldCreateIdea()
    {
        // Arrange
        var command = new CreateIdeaCommand(
            "Test Idea",
            "Test Description",
            new List<string> { "test", "demo" }
        );

        var ideasDbSetMock = new Mock<DbSet<Idea>>();
        _contextMock.Setup(c => c.Ideas).Returns(ideasDbSetMock.Object);
        _contextMock.Setup(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(1);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Title.Should().Be("Test Idea");
        result.Description.Should().Be("Test Description");
        result.Tags.Should().Contain("test");
        result.Tags.Should().Contain("demo");
        
        _contextMock.Verify(c => c.Ideas.Add(It.IsAny<Idea>()), Times.Once);
        _contextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_ValidCommand_ShouldTriggerAnalysis()
    {
        // Arrange
        var command = new CreateIdeaCommand("Test Idea", "Description", new List<string>());
        _contextMock.Setup(c => c.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        await _handler.Handle(command, CancellationToken.None);

        // Assert
        _analyzerMock.Verify(a => a.AnalyzeIdeaAsync(It.IsAny<Guid>()), Times.Once);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public async Task Handle_EmptyTitle_ShouldThrowValidationException(string title)
    {
        // Arrange
        var command = new CreateIdeaCommand(title, "Description", new List<string>());

        // Act
        Func<Task> act = async () => await _handler.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ValidationException>()
            .WithMessage("*Title*");
    }
}
```

### Integration Tests - Database

```csharp
// tests/IdeasVault.IntegrationTests/Ideas/CreateIdeaTests.cs
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace IdeasVault.IntegrationTests.Ideas;

public class CreateIdeaTests : IClassFixture<TestDatabaseFixture>
{
    private readonly ApplicationDbContext _context;

    public CreateIdeaTests(TestDatabaseFixture fixture)
    {
        _context = fixture.CreateContext();
    }

    [Fact]
    public async Task CreateIdea_ShouldPersistToDatabase()
    {
        // Arrange
        var idea = Idea.Create("Integration Test Idea", "Test Description");
        idea.AddTag(new Tag("integration"));

        // Act
        _context.Ideas.Add(idea);
        await _context.SaveChangesAsync();

        // Assert
        var savedIdea = await _context.Ideas
            .Include(i => i.Tags)
            .FirstOrDefaultAsync(i => i.Id == idea.Id);

        savedIdea.Should().NotBeNull();
        savedIdea!.Title.Should().Be("Integration Test Idea");
        savedIdea.Tags.Should().HaveCount(1);
        savedIdea.Tags.First().Name.Should().Be("integration");
    }

    [Fact]
    public async Task UpdateIdea_ShouldModifyExistingEntity()
    {
        // Arrange
        var idea = Idea.Create("Original Title", "Description");
        _context.Ideas.Add(idea);
        await _context.SaveChangesAsync();
        _context.Entry(idea).State = EntityState.Detached;

        // Act
        var trackedIdea = await _context.Ideas.FindAsync(idea.Id);
        trackedIdea!.UpdateAnalysis(85, new List<Competitor>());
        await _context.SaveChangesAsync();

        // Assert
        var updatedIdea = await _context.Ideas.FindAsync(idea.Id);
        updatedIdea!.ReadinessScore.Should().Be(85);
        updatedIdea.Status.Should().Be(IdeaStatus.Ready);
    }
}

// Test database fixture
public class TestDatabaseFixture : IDisposable
{
    private readonly DbContextOptions<ApplicationDbContext> _options;

    public TestDatabaseFixture()
    {
        _options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        using var context = new ApplicationDbContext(_options);
        context.Database.EnsureCreated();
    }

    public ApplicationDbContext CreateContext() => new ApplicationDbContext(_options);

    public void Dispose()
    {
        using var context = new ApplicationDbContext(_options);
        context.Database.EnsureDeleted();
    }
}
```

### API Tests - Controllers

```csharp
// tests/IdeasVault.Api.Tests/Controllers/IdeasControllerTests.cs
using Microsoft.AspNetCore.Mvc;
using Moq;
using MediatR;
using Xunit;

namespace IdeasVault.Api.Tests.Controllers;

public class IdeasControllerTests
{
    private readonly Mock<IMediator> _mediatorMock;
    private readonly IdeasController _controller;

    public IdeasControllerTests()
    {
        _mediatorMock = new Mock<IMediator>();
        _controller = new IdeasController(_mediatorMock.Object);
    }

    [Fact]
    public async Task GetIdea_ExistingId_ShouldReturnOk()
    {
        // Arrange
        var ideaId = Guid.NewGuid();
        var expectedIdea = new IdeaDto { Id = ideaId, Title = "Test Idea" };
        _mediatorMock.Setup(m => m.Send(It.IsAny<GetIdeaQuery>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedIdea);

        // Act
        var result = await _controller.GetIdea(ideaId);

        // Assert
        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedIdea = okResult.Value.Should().BeOfType<IdeaDto>().Subject;
        returnedIdea.Id.Should().Be(ideaId);
    }

    [Fact]
    public async Task GetIdea_NonExistingId_ShouldReturnNotFound()
    {
        // Arrange
        var ideaId = Guid.NewGuid();
        _mediatorMock.Setup(m => m.Send(It.IsAny<GetIdeaQuery>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new NotFoundException(nameof(Idea), ideaId));

        // Act
        Func<Task> act = async () => await _controller.GetIdea(ideaId);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public async Task CreateIdea_ValidCommand_ShouldReturnCreated()
    {
        // Arrange
        var command = new CreateIdeaCommand("New Idea", "Description", new List<string>());
        var createdIdea = new IdeaDto { Id = Guid.NewGuid(), Title = "New Idea" };
        _mediatorMock.Setup(m => m.Send(command, It.IsAny<CancellationToken>()))
            .ReturnsAsync(createdIdea);

        // Act
        var result = await _controller.CreateIdea(command);

        // Assert
        var createdResult = result.Result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.ActionName.Should().Be(nameof(IdeasController.GetIdea));
        var returnedIdea = createdResult.Value.Should().BeOfType<IdeaDto>().Subject;
        returnedIdea.Title.Should().Be("New Idea");
    }
}
```

## E2E Testing

### Setup Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// e2e/idea-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Idea Capture Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=Enter App');
  });

  test('should create new idea successfully', async ({ page }) => {
    // Arrange - Open capture modal
    await page.click('button:has-text("Capture Idea")');
    await expect(page.locator('text=Capture Idea')).toBeVisible();

    // Act - Fill form
    await page.fill('input[name="title"]', 'E2E Test Idea');
    await page.fill('textarea[name="description"]', 'This is an E2E test idea');
    await page.fill('input[name="tags"]', 'e2e, test');
    await page.click('button:has-text("Submit")');

    // Assert - Verify idea appears
    await expect(page.locator('text=E2E Test Idea')).toBeVisible();
    await expect(page.locator('text=e2e')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    // Arrange
    await page.click('button:has-text("Capture Idea")');

    // Act - Submit without filling
    await page.click('button:has-text("Submit")');

    // Assert
    await expect(page.locator('text=Title is required')).toBeVisible();
    await expect(page.locator('text=Description is required')).toBeVisible();
  });

  test('should navigate to idea details', async ({ page }) => {
    // Arrange - Create an idea first
    await page.click('button:has-text("Capture Idea")');
    await page.fill('input[name="title"]', 'Detail Test Idea');
    await page.fill('textarea[name="description"]', 'Description for detail test');
    await page.click('button:has-text("Submit")');

    // Act - Click on idea card
    await page.click('text=Detail Test Idea');

    // Assert - Verify detail view
    await expect(page).toHaveURL(/\/vault\/idea\/.+/);
    await expect(page.locator('h1:has-text("Detail Test Idea")')).toBeVisible();
    await expect(page.locator('text=Description for detail test')).toBeVisible();
  });

  test('should delete idea', async ({ page }) => {
    // Arrange - Create and navigate to idea
    await page.click('button:has-text("Capture Idea")');
    await page.fill('input[name="title"]', 'Idea to Delete');
    await page.fill('textarea[name="description"]', 'Will be deleted');
    await page.click('button:has-text("Submit")');
    await page.click('text=Idea to Delete');

    // Act - Delete idea
    await page.click('button:has-text("Delete")');
    await page.click('button:has-text("Confirm")'); // Confirmation dialog

    // Assert - Back to dashboard without the idea
    await expect(page).toHaveURL('/vault');
    await expect(page.locator('text=Idea to Delete')).not.toBeVisible();
  });
});

test.describe('Voice Input', () => {
  test('should enable voice input mode', async ({ page }) => {
    await page.goto('/vault');
    await page.click('button:has-text("Capture Idea")');

    // Grant microphone permissions
    await page.context().grantPermissions(['microphone']);

    // Click microphone button
    await page.click('button[aria-label="Voice Input"]');

    // Assert listening mode
    await expect(page.locator('text=Listening...')).toBeVisible();
  });
});
```

## Test Data Management

### Test Fixtures

```typescript
// src/test/fixtures/ideaFixtures.ts
import type { Idea } from '../../constants';

export const createMockIdea = (overrides?: Partial<Idea>): Idea => ({
  id: '1',
  title: 'Mock Idea',
  description: 'Mock Description',
  tags: ['test'],
  status: 'ready',
  inputType: 'text',
  readinessScore: 75,
  marketSize: 'Large',
  targetAudience: 'Developers',
  topCompetitor: 'Competitor A',
  competitorStrength: 'Strong',
  keyTrend: 'Growing',
  competitors: [],
  growthMetrics: [],
  actionPlan: [],
  createdAt: new Date('2024-01-01'),
  ...overrides
});

export const createMockIdeas = (count: number): Idea[] => {
  return Array.from({ length: count }, (_, i) => 
    createMockIdea({
      id: String(i + 1),
      title: `Mock Idea ${i + 1}`
    })
  );
};
```

```csharp
// tests/TestHelpers/IdeaTestData.cs
public static class IdeaTestData
{
    public static Idea CreateValidIdea(string? title = null, string? description = null)
    {
        return Idea.Create(
            title ?? "Test Idea",
            description ?? "Test Description"
        );
    }

    public static CreateIdeaCommand CreateValidCommand()
    {
        return new CreateIdeaCommand(
            "Test Idea",
            "Test Description",
            new List<string> { "test", "demo" }
        );
    }

    public static List<Idea> CreateMultipleIdeas(int count)
    {
        return Enumerable.Range(1, count)
            .Select(i => CreateValidIdea($"Idea {i}", $"Description {i}"))
            .ToList();
    }
}
```

### Test Database Seeding

```csharp
// tests/TestHelpers/DatabaseSeeder.cs
public static class DatabaseSeeder
{
    public static async Task SeedIdeasAsync(ApplicationDbContext context, int count = 5)
    {
        var ideas = IdeaTestData.CreateMultipleIdeas(count);
        context.Ideas.AddRange(ideas);
        await context.SaveChangesAsync();
    }

    public static async Task SeedCompleteDataAsync(ApplicationDbContext context)
    {
        // Add users
        var users = UserTestData.CreateMultipleUsers(3);
        context.Users.AddRange(users);

        // Add ideas
        var ideas = IdeaTestData.CreateMultipleIdeas(10);
        context.Ideas.AddRange(ideas);

        await context.SaveChangesAsync();
    }
}
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: ideasvault-ui/package-lock.json
      
      - name: Install dependencies
        working-directory: ideasvault-ui
        run: npm ci
      
      - name: Run unit tests
        working-directory: ideasvault-ui
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ideasvault-ui/coverage/coverage-final.json
          flags: frontend

  backend-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'
      
      - name: Restore dependencies
        working-directory: ideasvault-backend
        run: dotnet restore
      
      - name: Build
        working-directory: ideasvault-backend
        run: dotnet build --no-restore
      
      - name: Run tests
        working-directory: ideasvault-backend
        run: dotnet test --no-build --verbosity normal --collect:"XPlat Code Coverage"
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ideasvault-backend/**/coverage.cobertura.xml
          flags: backend

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: ideasvault-ui
        run: npm ci
      
      - name: Install Playwright
        working-directory: ideasvault-ui
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        working-directory: ideasvault-ui
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: ideasvault-ui/playwright-report/
```

## Code Coverage

### Coverage Requirements

- **Overall**: Minimum 80% coverage
- **Critical Paths**: 90%+ coverage
- **Utilities**: 90%+ coverage
- **Components**: 70%+ coverage
- **E2E**: Cover all critical user journeys

### Viewing Coverage

```bash
# Frontend
cd ideasvault-ui
npm test -- --coverage
open coverage/index.html

# Backend
cd ideasvault-backend
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=html
open TestResults/*/coverage.html
```

## Best Practices

### 1. Test Naming

```typescript
// ✅ Good: Descriptive test names
test('should add idea to storage when valid data is provided', () => {});
test('should throw validation error when title exceeds 200 characters', () => {});

// ❌ Bad: Vague test names
test('test1', () => {});
test('works', () => {});
```

### 2. Isolation

```typescript
// ✅ Good: Independent tests
describe('Storage', () => {
  beforeEach(() => {
    localStorage.clear(); // Clean state
  });

  test('test 1', () => {});
  test('test 2', () => {}); // Won't be affected by test 1
});
```

### 3. Avoid Implementation Details

```typescript
// ❌ Bad: Testing implementation
test('should call useState with initial value', () => {
  const setStateSpy = vi.spyOn(React, 'useState');
  render(<Component />);
  expect(setStateSpy).toHaveBeenCalledWith([]);
});

// ✅ Good: Testing behavior
test('should display empty state when no ideas exist', () => {
  render(<Dashboard ideas={[]} />);
  expect(screen.getByText('No ideas yet')).toBeInTheDocument();
});
```

### 4. Use Testing Library Queries Correctly

```typescript
// Query priority (in order of preference):
// 1. getByRole - Most accessible
const button = screen.getByRole('button', { name: /submit/i });

// 2. getByLabelText - Forms
const input = screen.getByLabelText(/title/i);

// 3. getByPlaceholderText
const search = screen.getByPlaceholderText(/search/i);

// 4. getByText
const heading = screen.getByText(/dashboard/i);

// 5. getByTestId - Last resort
const element = screen.getByTestId('custom-element');
```

### 5. Async Testing

```typescript
// ✅ Good: Use waitFor for async operations
test('should load ideas asynchronously', async () => {
  render(<Dashboard />);
  
  await waitFor(() => {
    expect(screen.getByText('Test Idea')).toBeInTheDocument();
  });
});

// ✅ Good: Use findBy queries (combines getBy + waitFor)
test('should display idea after loading', async () => {
  render(<Dashboard />);
  
  const idea = await screen.findByText('Test Idea');
  expect(idea).toBeInTheDocument();
});
```

### 6. Mock Carefully

```typescript
// ✅ Good: Mock external dependencies
vi.mock('../utils/storage', () => ({
  storage: {
    getIdeas: vi.fn(() => []),
    addIdea: vi.fn(),
  }
}));

// ❌ Bad: Mocking too much (testing implementation)
vi.mock('react', () => ({
  useState: vi.fn(),
  useEffect: vi.fn(),
}));
```

## Next Steps

- Review [Code Style Guide](./code-style.md) for testing conventions
- Check [Frontend Guide](./frontend-guide.md) for component testing patterns
- Explore [Backend Guide](./backend-guide.md) for API testing patterns

---

**Well-tested code is maintainable code!** ✅
