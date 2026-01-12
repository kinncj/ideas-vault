# API Changelog

All notable changes to the Ideas Vault API will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned Features
- OAuth2 authentication (Google, GitHub, Microsoft, Apple)
- Webhooks for real-time event notifications
- API keys for server-to-server authentication
- GraphQL endpoint as alternative to REST
- Batch operations endpoint
- Advanced search with full-text capabilities
- Export to additional formats (Excel, CSV)
- Collaboration features (sharing, comments)
- Analytics and insights API

---

## [1.0.0] - 2026-02-01 (Planned)

### Added - Initial Release

#### Core Resources
- **Ideas API**: Complete CRUD operations for startup ideas
  - `GET /api/v1/ideas` - List ideas with filtering and pagination
  - `GET /api/v1/ideas/{id}` - Get idea details
  - `POST /api/v1/ideas` - Create new idea
  - `PATCH /api/v1/ideas/{id}` - Update idea
  - `DELETE /api/v1/ideas/{id}` - Delete idea

- **AI Research API**: Manage AI-powered market research
  - `GET /api/v1/ideas/{id}/research` - Get research status
  - `POST /api/v1/ideas/{id}/research` - Trigger research

- **Users API**: User account and profile management
  - `GET /api/v1/users/me` - Get current user
  - `PATCH /api/v1/users/me` - Update profile
  - `GET /api/v1/users/me/stats` - Get statistics

- **Authentication API**: JWT-based authentication
  - `POST /api/v1/auth/register` - User registration
  - `POST /api/v1/auth/login` - User login
  - `POST /api/v1/auth/refresh` - Refresh access token
  - `POST /api/v1/auth/logout` - Logout
  - `POST /api/v1/auth/verify-email` - Email verification
  - `POST /api/v1/auth/forgot-password` - Password reset request
  - `POST /api/v1/auth/reset-password` - Reset password
  - `POST /api/v1/auth/change-password` - Change password

- **Tags API**: Categorization and tagging
  - `GET /api/v1/tags` - List all tags

- **Competitors API**: Competitor analysis data
  - `GET /api/v1/ideas/{id}/competitors` - Get competitors

- **Exports API**: Data export functionality
  - `POST /api/v1/ideas/export` - Export to JSON/PDF

#### Features
- JWT access tokens with 1-hour lifetime
- Refresh tokens with 30-day lifetime
- Token rotation for security
- Role-Based Access Control (RBAC)
- Cursor-based pagination
- Field selection and expansion
- Sorting and filtering
- Rate limiting (1,000-100,000 req/hour by tier)
- RFC 7807 Problem Details error format
- Request tracing with trace IDs
- CORS support
- Security headers (HSTS, CSP, X-Frame-Options)
- OpenAPI/Swagger documentation

#### Validation
- Comprehensive input validation
- Field-level error messages
- Password complexity requirements
- Email format validation
- Unique constraint validation

#### Performance
- Response caching headers
- Efficient database queries
- Optimistic concurrency control
- Connection pooling

---

## Version History

### Version Numbering

API versions follow semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes requiring client updates
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Deprecation Policy

- Deprecated endpoints remain available for **minimum 6 months**
- Deprecation warnings in response headers: `Deprecation: true`
- Sunset date in headers: `Sunset: Sat, 31 Dec 2026 23:59:59 GMT`
- Migration guides provided in documentation

### Breaking Changes

Changes that require a new major version:
- Removing or renaming endpoints
- Removing or renaming fields in request/response
- Changing field data types
- Changing authentication mechanisms
- Changing error response formats
- Removing query parameters
- Changing default behaviors

### Non-Breaking Changes

Changes that can be added without version bump:
- Adding new endpoints
- Adding optional fields to responses
- Adding optional query parameters
- Adding new HTTP headers
- Adding new error codes
- Performance improvements
- Bug fixes

---

## Changelog Format

Each release entry includes:

### Added
New features and endpoints added to the API.

### Changed
Changes to existing functionality that are backward compatible.

### Deprecated
Features that will be removed in future versions.

### Removed
Features removed in this version (breaking change).

### Fixed
Bug fixes and corrections.

### Security
Security improvements and vulnerability patches.

---

## Migration Guides

When breaking changes are introduced, migration guides will be provided here.

### Example: Migrating from v1 to v2 (Future)

**Timeline**: v2 release date, v1 sunset date

**Breaking Changes**:
- List of breaking changes
- Impact on existing integrations
- Required client updates

**Migration Steps**:
1. Review breaking changes
2. Update client code
3. Test against v2 endpoints
4. Deploy updated clients
5. Monitor for issues

**Code Examples**:
```javascript
// v1 (deprecated)
GET /api/v1/ideas?status=ready

// v2 (current)
GET /api/v2/ideas?filter[status]=ready
```

---

## Support

### Current Versions

| Version | Status | Support Until | Documentation |
|---------|--------|---------------|---------------|
| v1 | Current | Ongoing | [v1 docs](./README.md) |

### End of Life Policy

- **Active Support**: Bug fixes, security patches, new features
- **Maintenance**: Security patches only, no new features
- **End of Life**: No updates, deprecated

Timeline:
- **Active Support**: 12 months from release
- **Maintenance**: Additional 6 months
- **Total Lifetime**: Minimum 18 months

---

## Feedback

We welcome feedback on the API:

- **Feature Requests**: https://github.com/yourusername/ideasvault/issues
- **Bug Reports**: https://github.com/yourusername/ideasvault/issues
- **Security Issues**: security@ideasvault.com
- **General Feedback**: api-feedback@ideasvault.com

---

## Links

- [API Documentation](./README.md)
- [REST API Reference](./rest-api.md)
- [Authentication Guide](./authentication.md)
- [Error Handling](./error-handling.md)
- [API Status Page](https://status.ideasvault.com)

---

**Last Updated**: January 12, 2026  
**Current Version**: v1 (planned)
