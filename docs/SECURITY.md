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