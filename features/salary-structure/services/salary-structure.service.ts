import { salaryStructureRepository } from "../repositories/salary-structure.repository";

export class SalaryStructureService {

  async create(data:any){

    return salaryStructureRepository.create(data);

  }

}

export const salaryStructureService =
new SalaryStructureService();