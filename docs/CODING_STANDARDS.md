## Database Naming Standards

Models:
PascalCase

Fields:
camelCase

Enums:
PascalCase

Enum Values:
UPPER_CASE

Foreign Keys:
<entity>NameId

Example:

employeeId

companyId

departmentId

## Backend Rules

- Routes remain thin.
- Business logic belongs in services.
- Database access belongs in repositories.
- Validate all input.
- Never access Prisma directly from UI components.
- Use feature-based organization.