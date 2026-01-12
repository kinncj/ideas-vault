# Architecture Decision Records (ADRs)

## Overview

This directory contains Architecture Decision Records (ADRs) for the Ideas Vault project. ADRs document important architectural decisions, their context, and rationale.

## What is an ADR?

An Architecture Decision Record captures an important architectural decision made along with its context and consequences. ADRs help teams understand why certain choices were made and provide historical context for future decisions.

## ADR Format

Each ADR follows this structure:

```markdown
# ADR-XXX: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue that we're seeing that is motivating this decision or change?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?

## Alternatives Considered
What other options were evaluated?
```

## Index of ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](./001-react-frontend.md) | Use React for Frontend Framework | Accepted | 2025-01-12 |
| [002](./002-dotnet-backend.md) | Use .NET for Backend Framework | Accepted | 2025-01-12 |
| [003](./003-clean-architecture.md) | Adopt Clean Architecture Pattern | Accepted | 2025-01-12 |

## Decision Making Process

1. **Identify Decision**: Recognize that an important architectural decision needs to be made
2. **Research**: Gather information about available options
3. **Propose ADR**: Create a new ADR in "Proposed" status
4. **Review**: Team reviews and discusses the ADR
5. **Decide**: Make the decision and update status to "Accepted"
6. **Implement**: Execute the decision
7. **Monitor**: Track the consequences and effectiveness

## Creating a New ADR

1. Copy the template below
2. Use the next sequential number (e.g., 004)
3. Fill in all sections with detailed information
4. Submit for team review
5. Update status after decision is made

## ADR Template

```markdown
# ADR-XXX: [Short Title]

## Status
Proposed

## Date
YYYY-MM-DD

## Context
Describe the forces at play, including technological, political, social, and project local. 
These forces are probably in tension, and should be called out as such. 
The language in this section is value-neutral. It is simply describing facts.

## Decision
Describe the architectural decision in full sentences with an active voice. 
"We will..." is a good starting point.

## Consequences
Describe the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.

### Positive Consequences
- 
- 

### Negative Consequences
- 
- 

### Neutral Consequences
- 
- 

## Alternatives Considered

### Alternative 1: [Name]
Description of alternative and why it was not chosen.

### Alternative 2: [Name]
Description of alternative and why it was not chosen.

## References
- Link to related documentation
- Link to research or articles
- Link to related ADRs
```

## Superseding ADRs

When an ADR is superseded by a newer decision:

1. Update the old ADR status to "Superseded by ADR-XXX"
2. Link to the new ADR
3. Do not delete old ADRs - they provide historical context
4. Create a new ADR explaining the new decision

## Best Practices

### Do
- ✅ Keep ADRs short and focused
- ✅ Write in clear, simple language
- ✅ Include the context and constraints
- ✅ Document alternatives considered
- ✅ Update status as decisions evolve
- ✅ Link to related ADRs
- ✅ Include team consensus

### Don't
- ❌ Write implementation details (those go in technical docs)
- ❌ Delete or significantly modify accepted ADRs
- ❌ Skip the "Consequences" section
- ❌ Leave status ambiguous
- ❌ Make decisions without team input
- ❌ Forget to update related ADRs

## Related Documentation

- [Architecture Overview](../README.md)
- [System Architecture](../system-architecture.md)
- [Frontend Architecture](../frontend-architecture.md)
- [Backend Architecture](../backend-architecture.md)
- [Data Architecture](../data-architecture.md)

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Architectural Decision Records by Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)
