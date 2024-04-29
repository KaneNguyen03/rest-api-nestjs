import { DatabaseService } from './../database/database.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'


@Injectable()
export class EmployeesService {
  constructor(private readonly DatabaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.DatabaseService.employee.create({ data: createEmployeeDto })
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'SUPER_ADMIN') {
    if (role) return this.DatabaseService.employee.findMany({
      where: {
        role
      }
    })
    return this.DatabaseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.DatabaseService.employee.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.DatabaseService.employee.update({
      where: { id },
      data: updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.DatabaseService.employee.delete({
      where: { id }
    })
  }
}
