import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SemestersByYearService } from './semesters-by-year.service';
import { CreateSemestersByYearDto } from './dto/create-semesters-by-year.dto';
import { UpdateSemestersByYearDto } from './dto/update-semesters-by-year.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { RoleTypes } from 'src/role/entities/role.entity';

@Controller('semesters-by-year')
export class SemestersByYearController {
  constructor(private readonly semestersByYearService: SemestersByYearService) { }

  @Post('create-many')
  async createMany(@Body() semestersData: CreateSemestersByYearDto[]) {
    return await this.semestersByYearService.createMany(semestersData);
  }

  @Post()
  create(@Body() createSemestersByYearDto: CreateSemestersByYearDto) {
    return this.semestersByYearService.create(createSemestersByYearDto);
  }

  @Roles(RoleTypes.MANAGER, RoleTypes.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  findAll(@Req() req) {
      const currentYear = req.year;  // Получаем текущий год из запроса
      return this.semestersByYearService.findAll(currentYear);
  }
  
  @Roles(RoleTypes.MANAGER, RoleTypes.ADMIN)
  @UseGuards(RolesGuard)
  @Get('first-report')
  firstReport(@Req() req) {
      const currentYear = req.year;  // Получаем текущий год из запроса
      return this.semestersByYearService.firstReport(currentYear);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semestersByYearService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemestersByYearDto: UpdateSemestersByYearDto) {
    return this.semestersByYearService.update(+id, updateSemestersByYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semestersByYearService.remove(+id);
  }
}
