import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleTypes } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

  async findAll() {
    return this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async getRoleByName(value: string) {
    console.log(value)
    const role = await this.roleRepository.findOne({
      where: {
        name: value
      }
    })
    return role
  }

  async getRoleByType(value: RoleTypes) {
    const role = await this.roleRepository.find({
      where: {
        type: value
      }
    })
    return role
  }
}
