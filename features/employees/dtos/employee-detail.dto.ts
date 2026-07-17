export type Gender = "MALE" | "FEMALE" | "OTHER";

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "INTERN" | "CONTRACT";

export type EmployeeStatus = "ACTIVE" | "INACTIVE" | "NOTICE_PERIOD" | "RESIGNED" | "TERMINATED";

export interface EmployeeDepartmentDto {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

export interface EmployeeDesignationDto {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

export interface EmployeeBankAccountDto {
  id: string;
  bankName: string;
  branchName: string | null;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string | null;
  isPrimary: boolean;
}

export interface EmployeeAddressDto {
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
}

export interface EmployeeEmergencyContactDto {
  name: string | null;
  phone: string | null;
  relation: string | null;
}

export interface EmployeeDetailDto {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fatherName: string | null;
  email: string;
  mobile: string;
  gender: Gender;
  dateOfBirth: Date;
  dateOfJoining: Date;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  profilePhotoUrl: string | null;
  department: EmployeeDepartmentDto;
  designation: EmployeeDesignationDto;
  bankAccount: EmployeeBankAccountDto | null;
  address: EmployeeAddressDto;
  emergencyContact: EmployeeEmergencyContactDto;
}
