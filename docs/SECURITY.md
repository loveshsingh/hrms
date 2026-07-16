# Security

## Authentication

## Authorization

## Input Validation

## SQL Injection

## XSS

## CSRF

## Secrets Management

## Logging

## Auditing

## Soft Delete Policy

Business records should not be permanently deleted.

Instead:

- Set deletedAt
- Exclude deleted records from application queries
- Allow administrative restoration when appropriate

## Multi-Tenant Security

Clients never submit companyId.

The backend derives companyId from the authenticated session.

This prevents cross-company data access.