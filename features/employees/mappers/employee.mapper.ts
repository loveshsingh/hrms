import { BankAccount, Department, Designation, Employee } from "@prisma/client";
import { EmployeeDetailDto, EmployeeStatus, EmploymentType, Gender } from "../dtos/employee-detail.dto";
import { EmployeeResponseDto } from "../dtos/employee-response.dto";

export function toEmployeeResponseDto(
  employee: Employee
): EmployeeResponseDto {
  return {
    id: employee.id,
    employeeCode: employee.employeeCode,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    mobile: employee.mobile,
    status: employee.status,
  };
}

export function toEmployeeDetailDto(
  employee: Employee & {
    department: Department;
    designation: Designation;
    bankAccount: BankAccount | null;
  }
): EmployeeDetailDto {
  return {
    id: employee.id,
    employeeCode: employee.employeeCode,
    firstName: employee.firstName,
    lastName: employee.lastName,
    fatherName: employee.fatherName,
    email: employee.email,
    mobile: employee.mobile,
    gender: employee.gender as Gender,
    dateOfBirth: employee.dateOfBirth,
    dateOfJoining: employee.dateOfJoining,
    employmentType: employee.employmentType as EmploymentType,
    status: employee.status as EmployeeStatus,
    profilePhotoUrl: employee.profilePhotoUrl,
    department: {
      id: employee.department.id,
      name: employee.department.name,
      code: employee.department.code,
      description: employee.department.description,
    },
    designation: {
      id: employee.designation.id,
      name: employee.designation.name,
      code: employee.designation.code,
      description: employee.designation.description,
    },
    bankAccount: employee.bankAccount
      ? {
          id: employee.bankAccount.id,
          bankName: employee.bankAccount.bankName,
          branchName: employee.bankAccount.branchName,
          accountHolder: employee.bankAccount.accountHolder,
          accountNumber: employee.bankAccount.accountNumber,
          ifscCode: employee.bankAccount.ifscCode,
          accountType: employee.bankAccount.accountType,
          isPrimary: employee.bankAccount.isPrimary,
        }
      : null,
    address: {
      addressLine1: employee.addressLine1,
      addressLine2: employee.addressLine2,
      city: employee.city,
      state: employee.state,
      country: employee.country,
      postalCode: employee.postalCode,
    },
    emergencyContact: {
      name: employee.emergencyContactName,
      phone: employee.emergencyContactPhone,
      relation: employee.emergencyContactRelation,
    },
  };
}