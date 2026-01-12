# Ideas Vault API Documentation

## ⚠️ CRITICAL: This API Does Not Exist

**This is a DESIGN DOCUMENT for a PROPOSED future API.**

### Current State of Ideas Vault

- ❌ **NO backend API exists**
- ❌ **NO REST endpoints are implemented**
- ❌ **NO authentication system is in place**
- ❌ **NO database or server infrastructure**

Ideas Vault is currently a **frontend-only application** that:
- ✅ Runs entirely in the browser
- ✅ Uses localStorage for data persistence
- ✅ Has simulated "AI analysis" with mock data
- ✅ Requires no server or API to function

### Purpose of This Documentation

This API documentation serves as a **design specification** for future contributors who want to build a backend for Ideas Vault. It provides:

1. **RESTful API design patterns** to follow
2. **Endpoint specifications** for consistency
3. **Authentication strategies** for security
4. **Error handling patterns** for reliability
5. **OpenAPI/Swagger** specifications for interoperability

### How to Contribute

**Want to build this API?** See [Contributing Guide](../../README.md#contributing) to:
- Discuss backend implementation approaches
- Choose technology stack (ASP.NET Core, Node.js, Python, etc.)
- Propose architectural changes
- Start implementing endpoints

---

## API Overview (Proposed Design)

Welcome to the **proposed** Ideas Vault API documentation. This guide provides comprehensive information about the RESTful API design that could power the Ideas Vault platform.

## 📋 Table of Contents

- [Overview](#overview)
- [API Design Principles](#api-design-principles)
- [Base URL](#base-url)
- [Versioning Strategy](#versioning-strategy)
- [Common Patterns](#common-patterns)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Pagination](#pagination)
- [Error Handling](#error-handling)
- [Quick Start](#quick-start)
- [API Resources](#api-resources)

## 🎯 Overview

The Ideas Vault API is a RESTful web service built with ASP.NET Core 8+ that enables secure management of startup ideas, AI-powered market analysis, and comprehensive research capabilities. The API follows industry best practices for REST design, security, and scalability.

### Key Features

- **RESTful Design**: Resource-oriented URLs, HTTP methods, and standard status codes
- **JSON API**: Request and response payloads in JSON format
- **JWT Authentication**: Secure token-based authentication with refresh token support
- **Versioning**: URL-based versioning for backward compatibility
- **Rate Limiting**: Protection against abuse with configurable limits
- **Pagination**: Cursor-based pagination for efficient data retrieval
- **Comprehensive Error Handling**: Detailed error responses with problem details format
- **CORS Support**: Configurable cross-origin resource sharing
- **OpenAPI/Swagger**: Interactive API documentation

## 🏗️ API Design Principles

### REST Best Practices

1. **Resource-Oriented URLs**: Use nouns, not verbs
   - ✅ Good: `GET /api/v1/ideas`
   - ❌ Bad: `GET /api/v1/getIdeas`

2. **HTTP Methods for Actions**:
   - `GET`: Retrieve resources
   - `POST`: Create new resources
   - `PUT`: Replace entire resource
   - `PATCH`: Partial update of resource
   - `DELETE`: Remove resource

3. **Plural Resource Names**: Use plural nouns for collections
   - ✅ Good: `/api/v1/ideas`
   - ❌ Bad: `/api/v1/idea`

4. **Hierarchical Relationships**: Express relationships in URL structure
   - Example: `/api/v1/ideas/{id}/research`

5. **Query Parameters for Filtering**: Use query strings for filtering, sorting, and pagination
   - Example: `/api/v1/ideas?status=ready&sort=-createdAt&limit=20`

### Status Codes

We use standard HTTP status codes to indicate success or failure:

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH, or DELETE |
| 201 | Created | Successful POST that created a resource |
| 204 | No Content | Successful DELETE with no response body |
| 400 | Bad Request | Invalid request format or validation error |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 422 | Unprocessable Entity | Valid format but semantic errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Temporary unavailability |

## 🌐 Base URL

### Development
```
http://localhost:5000/api
```

### Staging
```
https://staging-api.ideasvault.com/api
```

### Production
```
https://api.ideasvault.com/api
```

## 📌 Versioning Strategy

The API uses **URL-based versioning** for clear version identification and backward compatibility.

### Version Format
```
/api/v{major}/resource
```

### Current Version
```
/api/v1/ideas
```

### Version Lifecycle

- **v1**: Current stable version
- **v2**: Future version (when breaking changes are needed)

### Breaking vs Non-Breaking Changes

**Non-Breaking Changes** (no version bump required):
- Adding new endpoints
- Adding optional request parameters
- Adding new fields to responses
- Adding new optional headers

**Breaking Changes** (requires new version):
- Removing or renaming endpoints
- Removing or renaming request/response fields
- Changing field data types
- Changing authentication mechanisms
- Changing error response formats

### Migration Strategy

When a new version is released:
1. Previous version remains available for **6 months minimum**
2. `Deprecation` header indicates deprecated versions
3. Migration guides provided in documentation
4. API returns version compatibility information

## 🔄 Common Patterns

### Request Headers

All API requests should include:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {jwt_token}
X-Request-ID: {unique_request_id}
```

### Response Headers

All API responses include:

```http
Content-Type: application/json
X-Request-ID: {unique_request_id}
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Timestamps

All timestamps are in **ISO 8601 format with UTC timezone**:

```json
{
  "createdAt": "2026-01-12T10:30:00Z",
  "updatedAt": "2026-01-12T15:45:30Z"
}
```

### Sorting

Use the `sort` query parameter with field names:

```
GET /api/v1/ideas?sort=createdAt          # Ascending
GET /api/v1/ideas?sort=-createdAt         # Descending (prefix with -)
GET /api/v1/ideas?sort=-readinessScore,title  # Multiple fields
```

### Filtering

Use query parameters matching field names:

```
GET /api/v1/ideas?status=ready
GET /api/v1/ideas?readinessScore[gte]=80
GET /api/v1/ideas?tags=SaaS,AI
GET /api/v1/ideas?createdAt[gte]=2026-01-01
```

Filter operators:
- `[eq]`: Equals (default if no operator)
- `[ne]`: Not equals
- `[gt]`: Greater than
- `[gte]`: Greater than or equals
- `[lt]`: Less than
- `[lte]`: Less than or equals
- `[in]`: In array
- `[contains]`: String contains

### Field Selection

Request only the fields you need:

```
GET /api/v1/ideas?fields=id,title,readinessScore
```

### Relationships/Expansions

Expand related resources:

```
GET /api/v1/ideas/{id}?expand=research,competitors
```

## 🔐 Authentication

Ideas Vault API uses **JWT (JSON Web Token)** authentication. See [authentication.md](./authentication.md) for detailed information.

### Quick Overview

1. **Authenticate** with credentials to receive JWT token
2. **Include token** in `Authorization` header for all requests
3. **Refresh token** before expiration using refresh token

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ⏱️ Rate Limiting

API requests are rate-limited to ensure fair usage and system stability.

### Limits

| Tier | Requests per Hour | Burst Limit |
|------|-------------------|-------------|
| Free | 1,000 | 100 |
| Pro | 10,000 | 500 |
| Enterprise | 100,000 | 2,000 |

### Rate Limit Headers

Every response includes rate limit information:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 995
X-RateLimit-Reset: 1640995200
```

### Rate Limit Exceeded Response

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 3600

{
  "type": "https://api.ideasvault.com/errors/rate-limit-exceeded",
  "title": "Rate Limit Exceeded",
  "status": 429,
  "detail": "You have exceeded your hourly request limit of 1000 requests.",
  "instance": "/api/v1/ideas",
  "retryAfter": 3600
}
```

### Best Practices

1. **Cache responses** when appropriate
2. **Batch requests** when possible
3. **Use webhooks** instead of polling
4. **Implement exponential backoff** for retries
5. **Monitor rate limit headers** and adjust request rate

## 📄 Pagination

The API uses **cursor-based pagination** for efficient and consistent data retrieval.

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `limit` | integer | Number of items per page (max 100) | 20 |
| `cursor` | string | Cursor for next page | - |

### Example Request

```http
GET /api/v1/ideas?limit=20&cursor=eyJpZCI6IjEyMzQ1In0
```

### Example Response

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "AI-Powered Email Assistant",
      "readinessScore": 85
    }
  ],
  "pagination": {
    "limit": 20,
    "hasMore": true,
    "nextCursor": "eyJpZCI6IjY3ODkwIn0",
    "totalCount": 157
  }
}
```

### Pagination Properties

| Property | Type | Description |
|----------|------|-------------|
| `data` | array | Array of resources |
| `pagination.limit` | integer | Items per page |
| `pagination.hasMore` | boolean | Whether more pages exist |
| `pagination.nextCursor` | string | Cursor for next page (null if none) |
| `pagination.totalCount` | integer | Total number of items (optional) |

### Iterating Through Pages

```javascript
let cursor = null;
let allIdeas = [];

do {
  const url = cursor 
    ? `/api/v1/ideas?limit=20&cursor=${cursor}`
    : '/api/v1/ideas?limit=20';
    
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const result = await response.json();
  allIdeas = allIdeas.concat(result.data);
  cursor = result.pagination.nextCursor;
} while (cursor !== null);
```

## ❌ Error Handling

All errors follow the **RFC 7807 Problem Details** specification. See [error-handling.md](./error-handling.md) for detailed information.

### Error Response Format

```json
{
  "type": "https://api.ideasvault.com/errors/validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "instance": "/api/v1/ideas",
  "traceId": "00-4bf92f3577b34da6a3ce929d0e0e4736-00",
  "errors": [
    {
      "field": "title",
      "message": "Title is required",
      "code": "required"
    },
    {
      "field": "description",
      "message": "Description must be at least 10 characters",
      "code": "minLength"
    }
  ]
}
```

## 🚀 Quick Start

### 1. Authentication

```bash
# Login to get JWT token
curl -X POST https://api.ideasvault.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

### 2. Create an Idea

```bash
curl -X POST https://api.ideasvault.com/api/v1/ideas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "AI-Powered Email Assistant",
    "description": "An intelligent email assistant that uses AI to draft responses, schedule meetings, and prioritize messages based on importance and urgency.",
    "tags": ["#SaaS", "#AI", "#Productivity"],
    "inputType": "text"
  }'
```

### 3. Retrieve Ideas

```bash
curl -X GET "https://api.ideasvault.com/api/v1/ideas?status=ready&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Get Idea Details

```bash
curl -X GET "https://api.ideasvault.com/api/v1/ideas/550e8400-e29b-41d4-a716-446655440000" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 API Resources

### Core Resources

| Resource | Description | Endpoints |
|----------|-------------|-----------|
| [Ideas](./rest-api.md#ideas) | Startup ideas management | `/api/v1/ideas` |
| [Research](./rest-api.md#research) | AI-powered market research | `/api/v1/ideas/{id}/research` |
| [Users](./rest-api.md#users) | User account management | `/api/v1/users` |
| [Authentication](./authentication.md) | Authentication and authorization | `/api/v1/auth` |

### Supporting Resources

| Resource | Description | Endpoints |
|----------|-------------|-----------|
| [Tags](./rest-api.md#tags) | Idea categorization | `/api/v1/tags` |
| [Competitors](./rest-api.md#competitors) | Competitor analysis | `/api/v1/ideas/{id}/competitors` |
| [Exports](./rest-api.md#exports) | Data export functionality | `/api/v1/ideas/export` |

## 📖 Additional Documentation

- **[REST API Reference](./rest-api.md)**: Complete endpoint documentation
- **[Authentication](./authentication.md)**: Authentication and security
- **[Error Handling](./error-handling.md)**: Error codes and troubleshooting
- **[Webhooks](./webhooks.md)**: Event notifications (coming soon)

## 🛠️ Developer Tools

### Interactive API Documentation

Explore the API interactively using Swagger UI:

- **Development**: http://localhost:5000/swagger
- **Production**: https://api.ideasvault.com/swagger

### Postman Collection

Import our Postman collection for easy testing:

[Download Postman Collection](./postman/ideas-vault-api.json)

### SDKs

Official SDKs (coming soon):
- **JavaScript/TypeScript**: `npm install @ideasvault/sdk`
- **Python**: `pip install ideasvault`
- **C#**: `dotnet add package IdeasVault.SDK`

## 🤝 Support

- **API Status**: https://status.ideasvault.com
- **GitHub Issues**: https://github.com/yourusername/ideasvault/issues
- **Email Support**: api-support@ideasvault.com
- **Community Forum**: https://community.ideasvault.com

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for API version history and changes.

---

**Last Updated**: January 12, 2026  
**API Version**: v1  
**Documentation Version**: 1.0.0
