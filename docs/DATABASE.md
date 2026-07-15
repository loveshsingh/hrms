# Database Design

## Entities

- Company
- User
- Role
- Employee
- Department
- Designation
- Attendance
- Leave
- Holiday
- Payroll
- SalaryComponent
- Payslip
- BankAccount
- EmployeeDocument

## Relationships

| Relationship            | Type        |
| ----------------------- | ----------- |
| Company → Employees     | One-to-Many |
| Department → Employees  | One-to-Many |
| Designation → Employees | One-to-Many |
| Employee → Attendance   | One-to-Many |
| Employee → Leave        | One-to-Many |
| Employee → Payroll      | One-to-Many |
| Employee → Documents    | One-to-Many |
| Employee → BankAccount  | One-to-One  |
| Role → Users            | One-to-Many |


## ER Diagram

![alt text](hrms_erd.drawio.png)

## Tables

## Relationships

## Naming Convention

## Indexing Strategy

## Migration Rules

## Design Decisions

### Soft Deletes

Business entities support `deletedAt` to allow recovery of accidentally deleted data.

### Indexing

Indexes added to frequently searched fields.

### Address Storage

Structured address fields replace a single address column.

### Department Codes

Departments use short unique codes for reporting.

## Multi-Tenant Strategy

Tenant = Company

Rules:

- Every business table contains companyId.
- Authentication resolves the current company.
- Queries are always filtered by companyId.
- Cross-company access is prohibited.

## Employee Domain

### Employee

Stores employee master data.

### BankAccount

One primary bank account per employee.

Future enhancement:
- Multiple accounts
- Salary account history

### EmployeeDocument

Stores metadata for uploaded files.

Actual files are stored in Supabase Storage.

## Attendance

Purpose:
Stores one attendance record per employee per working day.

Rules:
- One record per employee per date.
- Stores working minutes.
- Stores overtime separately.
- Supports remarks.
- Belongs to one company.

Indexes:
- employeeId
- attendanceDate
- status
- companyId