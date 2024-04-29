import { Body, Controller, Delete, Get, Ip, Param, Patch, Post, Query } from '@nestjs/common'
import { SkipThrottle, Throttle } from '@nestjs/throttler'
import { Prisma } from '@prisma/client'
import { EmployeesService } from './employees.service'
import { MyLoggerService } from 'src/my-logger/my-logger.service'

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto)
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'INTERN' | 'ADMIN' | 'SUPER_ADMIN') {
    this.logger.log(`Request for ALL Employees\t${ip}`)
    return this.employeesService.findAll(role)
  }

  @Throttle({ default: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id)
  }
}
