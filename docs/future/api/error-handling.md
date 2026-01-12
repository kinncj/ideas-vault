# Error Handling

Comprehensive guide to error handling in the Ideas Vault API, including error formats, status codes, and troubleshooting.

## 📋 Table of Contents

- [Overview](#overview)
- [Error Response Format](#error-response-format)
- [HTTP Status Codes](#http-status-codes)
- [Error Types](#error-types)
- [Validation Errors](#validation-errors)
- [Error Codes Reference](#error-codes-reference)
- [Client-Side Error Handling](#client-side-error-handling)
- [Troubleshooting Guide](#troubleshooting-guide)

---

## Overview

Ideas Vault API follows the **RFC 7807 Problem Details for HTTP APIs** specification for consistent, machine-readable error responses.

### Key Features

- **Standardized Format**: RFC 7807 Problem Details
- **Detailed Information**: Error type, title, detail, and instance
- **Validation Details**: Field-level validation errors
- **Trace IDs**: Request tracing for debugging
- **Consistent Structure**: Same format across all endpoints

### Design Principles

1. **Predictable**: All errors follow the same structure
2. **Actionable**: Errors include enough detail to fix the issue
3. **Secure**: Don't leak sensitive information in error messages
4. **Traceable**: Include trace IDs for support requests
5. **Machine-Readable**: Structured data for programmatic handling

---

## Error Response Format

All error responses follow this structure:

```json
{
  "type": "https://api.ideasvault.com/errors/error-type",
  "title": "Human-Readable Error Title",
  "status": 400,
  "detail": "Detailed description of what went wrong",
  "instance": "/api/v1/resource/path",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "errors": []
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `type` | string (URI) | URI reference identifying the error type |
| `title` | string | Short, human-readable summary |
| `status` | integer | HTTP status code |
| `detail` | string | Human-readable explanation specific to this occurrence |
| `instance` | string | URI reference identifying the specific occurrence |
| `traceId` | string | Unique identifier for request tracing |
| `timestamp` | string (ISO 8601) | When the error occurred |
| `errors` | array | Additional error details (validation errors, etc.) |

### Content-Type Header

All error responses include:

```http
Content-Type: application/problem+json
```

---

## HTTP Status Codes

### Success Codes (2xx)

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST that created a resource |
| 204 | No Content | Successful DELETE or action with no response body |

### Client Error Codes (4xx)

| Code | Meaning | When to Use |
|------|---------|-------------|
| 400 | Bad Request | Invalid request format or parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 405 | Method Not Allowed | HTTP method not supported for endpoint |
| 409 | Conflict | Request conflicts with current state |
| 422 | Unprocessable Entity | Valid format but semantic/business logic errors |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Codes (5xx)

| Code | Meaning | When It Happens |
|------|---------|-----------------|
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Temporary unavailability (maintenance, overload) |
| 504 | Gateway Timeout | Upstream service timeout |

---

## Error Types

### 400 Bad Request

**When**: Request has invalid syntax or parameters

```json
{
  "type": "https://api.ideasvault.com/errors/bad-request",
  "title": "Bad Request",
  "status": 400,
  "detail": "The request could not be understood or was missing required parameters.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z"
}
```

**Common Causes**:
- Malformed JSON
- Invalid query parameter format
- Missing required fields
- Type mismatch (string instead of number)

**How to Fix**:
- Validate JSON syntax
- Check parameter names and types
- Ensure all required fields are present
- Review API documentation for correct format

---

### 401 Unauthorized

**When**: Authentication is required but missing or invalid

```json
{
  "type": "https://api.ideasvault.com/errors/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication is required. Please provide a valid access token.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z"
}
```

**Common Causes**:
- Missing `Authorization` header
- Expired access token
- Invalid or malformed token
- Token revoked or blacklisted

**How to Fix**:
- Include `Authorization: Bearer {token}` header
- Refresh expired token using refresh token
- Re-authenticate if refresh token is invalid

---

### 403 Forbidden

**When**: Authenticated but lacking required permissions

```json
{
  "type": "https://api.ideasvault.com/errors/forbidden",
  "title": "Forbidden",
  "status": 403,
  "detail": "You don't have permission to access this resource. Required permission: 'ideas:delete'",
  "instance": "/api/v1/ideas/550e8400-e29b-41d4-a716-446655440000",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "requiredPermission": "ideas:delete",
  "currentRole": "user"
}
```

**Common Causes**:
- Insufficient user role or permissions
- Attempting to access another user's resources
- Account tier doesn't support feature
- Resource ownership mismatch

**How to Fix**:
- Upgrade account tier if required
- Contact administrator for permission grants
- Ensure you're accessing your own resources

---

### 404 Not Found

**When**: Requested resource doesn't exist

```json
{
  "type": "https://api.ideasvault.com/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Idea with ID '550e8400-e29b-41d4-a716-446655440000' was not found.",
  "instance": "/api/v1/ideas/550e8400-e29b-41d4-a716-446655440000",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "resourceType": "Idea",
  "resourceId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Common Causes**:
- Invalid resource ID
- Resource was deleted
- Resource belongs to different user
- Typo in URL path

**How to Fix**:
- Verify resource ID is correct
- Check if resource exists with list endpoint
- Ensure you have access to the resource

---

### 409 Conflict

**When**: Request conflicts with current resource state

```json
{
  "type": "https://api.ideasvault.com/errors/conflict",
  "title": "Resource Conflict",
  "status": 409,
  "detail": "Cannot update idea because it has been modified by another request. Current version: 5, provided version: 4",
  "instance": "/api/v1/ideas/550e8400-e29b-41d4-a716-446655440000",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "conflictType": "concurrency",
  "currentVersion": 5,
  "providedVersion": 4
}
```

**Common Causes**:
- Concurrent modifications (optimistic locking)
- Duplicate resource creation
- Business rule violation
- State transition not allowed

**How to Fix**:
- Fetch latest resource version and retry
- Use unique identifiers for creation
- Check business rules before submitting
- Implement retry logic with exponential backoff

---

### 422 Unprocessable Entity

**When**: Valid format but semantic or business logic errors

```json
{
  "type": "https://api.ideasvault.com/errors/unprocessable-entity",
  "title": "Unprocessable Entity",
  "status": 422,
  "detail": "The request was well-formed but contains semantic errors.",
  "instance": "/api/v1/ideas/550e8400-e29b-41d4-a716-446655440000/research",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "reason": "Cannot trigger research for idea that is already being analyzed"
}
```

**Common Causes**:
- Business rule violation
- Invalid state transition
- Logical constraint violation
- Data consistency issues

**How to Fix**:
- Check resource state before operation
- Review business rules and constraints
- Ensure prerequisites are met

---

### 429 Too Many Requests

**When**: Rate limit exceeded

```json
{
  "type": "https://api.ideasvault.com/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "You have exceeded your hourly request limit of 1000 requests. Please try again later.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "limit": 1000,
  "remaining": 0,
  "resetAt": "2026-01-12T11:00:00Z",
  "retryAfter": 1800
}
```

**Response Headers**:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1736679600
Retry-After: 1800
```

**How to Fix**:
- Wait for rate limit reset
- Implement exponential backoff
- Cache responses when possible
- Upgrade to higher tier for increased limits
- Use webhooks instead of polling

---

### 500 Internal Server Error

**When**: Unexpected server error

```json
{
  "type": "https://api.ideasvault.com/errors/internal-server-error",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "An unexpected error occurred while processing your request. Our team has been notified.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z"
}
```

**What to Do**:
- Retry the request (may be transient)
- If persists, contact support with trace ID
- Check API status page: https://status.ideasvault.com
- Implement error reporting in your application

---

### 503 Service Unavailable

**When**: Service temporarily unavailable

```json
{
  "type": "https://api.ideasvault.com/errors/service-unavailable",
  "title": "Service Unavailable",
  "status": 503,
  "detail": "The service is temporarily unavailable due to scheduled maintenance. Expected to return at 2026-01-12T12:00:00Z",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "retryAfter": 5400,
  "expectedReturnAt": "2026-01-12T12:00:00Z"
}
```

**Response Headers**:
```http
Retry-After: 5400
```

**How to Handle**:
- Implement retry logic with exponential backoff
- Show maintenance message to users
- Check status page for updates
- Queue requests for later processing

---

## Validation Errors

Validation errors (400 Bad Request) include detailed field-level information:

```json
{
  "type": "https://api.ideasvault.com/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "timestamp": "2026-01-12T10:30:00Z",
  "errors": [
    {
      "field": "title",
      "message": "Title is required",
      "code": "required",
      "value": null
    },
    {
      "field": "description",
      "message": "Description must be at least 10 characters",
      "code": "minLength",
      "value": "Short",
      "params": {
        "minLength": 10,
        "actualLength": 5
      }
    },
    {
      "field": "tags",
      "message": "At least one tag is required",
      "code": "minItems",
      "value": [],
      "params": {
        "minItems": 1
      }
    },
    {
      "field": "tags[0]",
      "message": "Tag must start with '#'",
      "code": "pattern",
      "value": "SaaS",
      "params": {
        "pattern": "^#"
      }
    }
  ]
}
```

### Validation Error Fields

| Field | Type | Description |
|-------|------|-------------|
| `field` | string | Field name (supports nested with dot notation or array indices) |
| `message` | string | Human-readable error message |
| `code` | string | Machine-readable error code |
| `value` | any | The invalid value provided |
| `params` | object | Additional parameters (constraints, limits, etc.) |

### Common Validation Codes

| Code | Description | Example |
|------|-------------|---------|
| `required` | Field is required but missing | `"title": null` |
| `minLength` | String too short | `"description": "Hi"` |
| `maxLength` | String too long | 201 char title |
| `min` | Number too small | `"readinessScore": -1` |
| `max` | Number too large | `"readinessScore": 101` |
| `pattern` | Doesn't match regex | Tag without `#` |
| `email` | Invalid email format | `"email": "notanemail"` |
| `url` | Invalid URL format | `"website": "not a url"` |
| `enum` | Not in allowed values | `"status": "invalid"` |
| `minItems` | Array too few items | Empty tags array |
| `maxItems` | Array too many items | 11 tags (max 10) |
| `unique` | Duplicate value | Duplicate email |

---

## Error Codes Reference

### Authentication Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `invalid_credentials` | 401 | Email or password is incorrect |
| `token_expired` | 401 | Access token has expired |
| `token_invalid` | 401 | Token is malformed or invalid |
| `token_revoked` | 401 | Token has been revoked |
| `refresh_token_expired` | 401 | Refresh token has expired |
| `refresh_token_invalid` | 401 | Refresh token is invalid |
| `email_not_verified` | 403 | Email verification required |
| `account_suspended` | 403 | Account has been suspended |
| `account_deleted` | 403 | Account has been deleted |

### Authorization Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `insufficient_permissions` | 403 | User lacks required permission |
| `resource_access_denied` | 403 | Cannot access this specific resource |
| `tier_upgrade_required` | 403 | Feature requires higher subscription tier |
| `trial_expired` | 403 | Trial period has ended |

### Resource Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `resource_not_found` | 404 | Resource doesn't exist |
| `resource_deleted` | 410 | Resource was permanently deleted |
| `duplicate_resource` | 409 | Resource already exists |
| `resource_locked` | 423 | Resource is locked by another operation |

### Business Logic Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `invalid_state_transition` | 422 | Cannot transition to requested state |
| `business_rule_violation` | 422 | Violates business rule |
| `quota_exceeded` | 422 | User quota exceeded |
| `dependency_exists` | 422 | Cannot delete due to dependencies |

### Rate Limiting Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `rate_limit_exceeded` | 429 | Too many requests |
| `concurrent_request_limit` | 429 | Too many concurrent requests |
| `daily_quota_exceeded` | 429 | Daily quota exceeded |

---

## Client-Side Error Handling

### JavaScript/TypeScript Example

```typescript
interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  traceId: string;
  timestamp: string;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
  value: any;
  params?: Record<string, any>;
}

async function handleApiError(response: Response): Promise<never> {
  const error: ApiError = await response.json();
  
  switch (error.status) {
    case 400:
      if (error.errors) {
        // Handle validation errors
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.field] = err.message;
          return acc;
        }, {} as Record<string, string>);
        
        throw new ValidationError(error.detail, fieldErrors);
      }
      throw new BadRequestError(error.detail);
      
    case 401:
      // Attempt token refresh
      const refreshed = await tryRefreshToken();
      if (!refreshed) {
        // Redirect to login
        window.location.href = '/login';
      }
      throw new AuthenticationError(error.detail);
      
    case 403:
      throw new AuthorizationError(error.detail);
      
    case 404:
      throw new NotFoundError(error.detail);
      
    case 409:
      throw new ConflictError(error.detail);
      
    case 429:
      const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
      throw new RateLimitError(error.detail, retryAfter);
      
    case 500:
    case 502:
    case 503:
    case 504:
      // Log error with trace ID for support
      console.error(`Server error [${error.traceId}]:`, error.detail);
      throw new ServerError(error.detail, error.traceId);
      
    default:
      throw new ApiError(error.detail);
  }
}

// Usage
async function createIdea(data: CreateIdeaRequest) {
  try {
    const response = await fetch('/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ValidationError) {
      // Show field errors in form
      showFormErrors(error.fieldErrors);
    } else if (error instanceof RateLimitError) {
      // Show rate limit message and retry after delay
      showRateLimitMessage(error.retryAfter);
    } else {
      // Show generic error message
      showErrorMessage(error.message);
    }
    throw error;
  }
}
```

### C# Example

```csharp
public class ApiErrorHandler
{
    public async Task<T> HandleResponseAsync<T>(HttpResponseMessage response)
    {
        if (response.IsSuccessStatusCode)
        {
            return await response.Content.ReadFromJsonAsync<T>();
        }

        var error = await response.Content.ReadFromJsonAsync<ApiError>();

        switch (response.StatusCode)
        {
            case HttpStatusCode.BadRequest:
                if (error.Errors?.Any() == true)
                {
                    throw new ValidationException(error.Detail, error.Errors);
                }
                throw new BadRequestException(error.Detail);

            case HttpStatusCode.Unauthorized:
                // Attempt token refresh
                var refreshed = await TryRefreshTokenAsync();
                if (!refreshed)
                {
                    throw new AuthenticationException(error.Detail);
                }
                // Retry request with new token
                return await RetryRequestAsync<T>(response.RequestMessage);

            case HttpStatusCode.Forbidden:
                throw new AuthorizationException(error.Detail);

            case HttpStatusCode.NotFound:
                throw new NotFoundException(error.Detail);

            case HttpStatusCode.Conflict:
                throw new ConflictException(error.Detail);

            case HttpStatusCode.TooManyRequests:
                var retryAfter = response.Headers.RetryAfter?.Delta ?? TimeSpan.FromSeconds(60);
                throw new RateLimitException(error.Detail, retryAfter);

            case HttpStatusCode.InternalServerError:
            case HttpStatusCode.BadGateway:
            case HttpStatusCode.ServiceUnavailable:
            case HttpStatusCode.GatewayTimeout:
                // Log error with trace ID
                _logger.LogError("Server error [{TraceId}]: {Detail}", 
                    error.TraceId, error.Detail);
                throw new ServerException(error.Detail, error.TraceId);

            default:
                throw new ApiException(error.Detail);
        }
    }
}
```

### Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // Don't retry client errors (except 429)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw await handleApiError(response);
      }
      
      // Don't retry if successful
      if (response.ok) {
        return response;
      }
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
        console.log(`Rate limited. Waiting ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        continue;
      }
      
      // Server error - retry with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      console.log(`Request failed. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
      await sleep(delay);
      
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }
    }
  }
  
  throw new Error(`Request failed after ${maxRetries} attempts: ${lastError.message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Troubleshooting Guide

### Problem: Getting 401 Unauthorized

**Possible Causes**:
1. Missing Authorization header
2. Token expired
3. Token malformed or invalid
4. Token revoked

**Solutions**:
```javascript
// Check if token exists
const token = getAccessToken();
if (!token) {
  // Redirect to login
  window.location.href = '/login';
}

// Check if token is expired
const payload = JSON.parse(atob(token.split('.')[1]));
if (payload.exp * 1000 < Date.now()) {
  // Token expired, refresh it
  await refreshToken();
}

// Verify Authorization header format
headers: {
  'Authorization': `Bearer ${token}` // Note the space after "Bearer"
}
```

### Problem: Getting 429 Rate Limit Exceeded

**Possible Causes**:
1. Too many requests in short time
2. Polling too frequently
3. Missing caching
4. Account tier limit reached

**Solutions**:
```javascript
// Implement rate limit awareness
let requestCount = 0;
let resetTime = null;

async function rateLimitedFetch(url, options) {
  const response = await fetch(url, options);
  
  // Track rate limit headers
  requestCount = parseInt(response.headers.get('X-RateLimit-Remaining'));
  resetTime = new Date(parseInt(response.headers.get('X-RateLimit-Reset')) * 1000);
  
  // Warn if approaching limit
  if (requestCount < 10) {
    console.warn(`Only ${requestCount} requests remaining until ${resetTime}`);
  }
  
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After'));
    throw new RateLimitError(`Rate limited. Retry after ${retryAfter}s`, retryAfter);
  }
  
  return response;
}

// Use caching to reduce requests
const cache = new Map();

async function getCachedIdea(id) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  const idea = await fetchIdea(id);
  cache.set(id, idea);
  setTimeout(() => cache.delete(id), 5 * 60 * 1000); // 5 min cache
  
  return idea;
}
```

### Problem: Getting 500 Internal Server Error

**What to Do**:
1. **Retry the request** - May be transient
2. **Check API status**: https://status.ideasvault.com
3. **Save trace ID** from error response
4. **Contact support** if persists, provide:
   - Trace ID
   - Timestamp
   - Request details (endpoint, method, parameters)

```javascript
try {
  const response = await fetch(url, options);
  if (response.status === 500) {
    const error = await response.json();
    // Log error details for support
    console.error('Server error:', {
      traceId: error.traceId,
      timestamp: error.timestamp,
      endpoint: url,
      method: options.method
    });
    
    // Report to error tracking service
    reportError({
      message: error.detail,
      traceId: error.traceId,
      context: { url, method: options.method }
    });
  }
} catch (error) {
  // Handle error
}
```

### Problem: Validation Errors Not Clear

**Solution**: Parse validation errors and show field-specific messages

```javascript
function showValidationErrors(errors) {
  const errorsByField = {};
  
  errors.forEach(error => {
    // Handle nested field names (e.g., "tags[0]")
    const fieldName = error.field.replace(/\[\d+\]/, '');
    
    if (!errorsByField[fieldName]) {
      errorsByField[fieldName] = [];
    }
    
    errorsByField[fieldName].push({
      message: error.message,
      code: error.code,
      params: error.params
    });
  });
  
  // Display errors next to form fields
  Object.entries(errorsByField).forEach(([field, fieldErrors]) => {
    const inputElement = document.querySelector(`[name="${field}"]`);
    const errorElement = inputElement.nextElementSibling;
    
    errorElement.textContent = fieldErrors.map(e => e.message).join(', ');
    inputElement.classList.add('error');
  });
}
```

### Problem: Concurrent Modification (409 Conflict)

**Solution**: Implement optimistic locking with version checking

```javascript
async function updateIdeaWithRetry(id, updates, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Fetch latest version
      const idea = await fetchIdea(id);
      
      // Include version in update
      const response = await fetch(`/api/v1/ideas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'If-Match': idea.version // Optimistic locking
        },
        body: JSON.stringify(updates)
      });
      
      if (response.status === 409) {
        // Conflict - someone else modified it
        console.log(`Conflict detected, retrying... (attempt ${attempt + 1})`);
        await sleep(1000 * Math.pow(2, attempt)); // Exponential backoff
        continue;
      }
      
      return await response.json();
      
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw new Error('Failed to update after multiple conflicts');
      }
    }
  }
}
```

---

**Last Updated**: January 12, 2026  
**API Version**: v1
