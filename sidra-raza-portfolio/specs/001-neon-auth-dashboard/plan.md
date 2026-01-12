# Implementation Plan: Neon Authentication and Real User Dashboard

**Feature**: 001-neon-auth-dashboard
**Created**: 2026-01-12
**Status**: Ready for Implementation

## Overview

This plan outlines the implementation of Neon authentication and real user data for the dashboard, including migration from SQLite to Neon PostgreSQL and cleanup of unnecessary files. The implementation will replace the current mock authentication system with a proper Neon-integrated solution.

## Implementation Steps

### Phase 1: Codebase Cleanup

**Objective**: Remove unnecessary files and fix code issues

1. **Remove temporary Claude files**
   - Delete all `tmpclaude-*.cwd` files in the root directory
   - Remove temporary log files in `.npm_cache_temp` directory

2. **Fix auth/client.ts import issue**
   - Move React import to the top of the file before other code
   - The import is currently at the bottom of the file (line 73)

### Phase 2: Database Migration to Neon PostgreSQL

**Objective**: Migrate from SQLite to Neon PostgreSQL for production-ready database

1. **Update dependencies**
   - Install Neon PostgreSQL driver: `@neondatabase/serverless` or `pg`
   - Update Drizzle ORM dependencies to support PostgreSQL

2. **Modify database schema for PostgreSQL compatibility**
   - Change `sqliteTable` to `pgTable` in `src/lib/analytics/schema.ts`
   - Update data types to be PostgreSQL-compatible:
     - Change `integer("timestamp", { mode: "timestamp_ms" })` to `timestamp("timestamp")`
     - Update other data types as needed

3. **Update database service**
   - Modify `src/lib/analytics/service.ts` to use Neon PostgreSQL connection
   - Replace Better-SQLite3 initialization with Neon connection
   - Update Drizzle initialization to use PostgreSQL adapter

4. **Add environment variables**
   - Add `NEON_DATABASE_URL` to `.env.local` for Neon connection string

### Phase 3: Authentication System Enhancement

**Objective**: Replace mock authentication with real user authentication

1. **Update authentication schema**
   - Create user table schema for real user accounts
   - Add proper password hashing functionality
   - Store user credentials securely in the database

2. **Implement real authentication endpoints**
   - Update `/api/auth/login/route.ts` to verify against real database users
   - Update `/api/auth/signup/route.ts` to create real user accounts
   - Implement proper password hashing (bcrypt or similar)

3. **Update authentication server functions**
   - Modify `src/lib/auth/server.ts` to work with real database users
   - Replace mockUsers array with database queries
   - Implement secure token generation (preferably JWT instead of base64 encoding)

4. **Update client authentication**
   - Fix the React import issue in `src/lib/auth/client.ts`
   - Update client-side auth functions to work with real authentication

### Phase 4: Real User Dashboard Implementation

**Objective**: Display real user data from Neon database on dashboard

1. **Update dashboard API endpoints**
   - Modify `/api/analytics/stats` to fetch real data from Neon database
   - Update `/api/analytics/time` for time-based analytics
   - Update `/api/analytics/countries` for geographic data

2. **Enhance analytics service**
   - Update all functions in `src/lib/analytics/service.ts` to work with real data
   - Implement proper data aggregation from actual user activity
   - Add real user filtering to ensure users only see their own data

3. **Update dashboard component**
   - Modify `src/app/dashboard/page.tsx` to handle real user data
   - Ensure proper data formatting for charts
   - Add error handling for data fetching

### Phase 5: Security and Validation

**Objective**: Ensure security and proper validation throughout the system

1. **Security enhancements**
   - Implement proper input validation for all endpoints
   - Add rate limiting to prevent abuse
   - Ensure all database queries are parameterized to prevent SQL injection

2. **Session management**
   - Implement secure session handling
   - Add proper token expiration and refresh mechanisms
   - Implement secure cookie settings for production

## Dependencies to Install

```bash
npm install @neondatabase/serverless
npm install drizzle-orm
npm install bcrypt
npm install jsonwebtoken
# For pg driver alternative:
# npm install pg
```

## Files to Modify

- `src/lib/analytics/schema.ts` - Update for PostgreSQL compatibility
- `src/lib/analytics/service.ts` - Update for Neon connection and real data
- `src/lib/auth/server.ts` - Replace mock authentication with real implementation
- `src/lib/auth/client.ts` - Fix import placement and update functions
- `src/app/api/auth/login/route.ts` - Update to use real authentication
- `src/app/api/auth/signup/route.ts` - Update to create real user accounts
- `src/app/dashboard/page.tsx` - Update to display real user data
- `.env.local` - Add Neon database URL

## Files to Remove

- All `tmpclaude-*.cwd` files
- Temporary log files in `.npm_cache_temp` directory

## Testing Strategy

1. **Unit Tests**: Test authentication functions with real user data
2. **Integration Tests**: Verify database operations work with Neon
3. **End-to-End Tests**: Test the complete authentication and dashboard flow
4. **Security Tests**: Verify proper authentication and authorization

## Success Criteria

- Users can authenticate with real credentials stored in Neon database
- Dashboard displays real user analytics from Neon PostgreSQL
- All temporary/cleanup files have been removed
- Application successfully connects to Neon database
- All existing functionality remains intact after migration
- Performance is maintained or improved compared to SQLite

## Risk Mitigation

- Create database backups before migration
- Implement feature flags to enable/disable new functionality during development
- Use environment-specific configurations to avoid affecting production during development
- Thoroughly test the authentication flow before deployment