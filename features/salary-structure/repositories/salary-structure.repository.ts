import { prisma } from "@/lib/prisma";

export class SalaryStructureRepository {

  async create(data: any) {

    return prisma.salaryStructure.create({

      data,

      include: {

        items: true

      }

    });

  }

}

export const salaryStructureRepository =
new SalaryStructureRepository();