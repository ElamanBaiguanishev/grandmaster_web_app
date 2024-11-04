import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleTypes } from './entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  findAll() {
    return this.roleService.findAll()
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto)
  }

  @Get('/by-name/:name')
  getByName(@Param('name') value: string) {
    return this.roleService.getRoleByName(value);
  }

  @Get('/by-type/:type')
  getByType(@Param('type') value: RoleTypes) {
    return this.roleService.getRoleByType(value);
  }  
}
