import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateMultipleGroupsDto } from './dto/create-multiple-groups.dto';
import { UpdateVisibilityDto } from './dto/visible.dto';

@UsePipes(ValidationPipe)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post('multiple')
  createMultiple(@Body() createMultipleGroupsDto: CreateMultipleGroupsDto) { // Новый роут для создания нескольких групп
    return this.groupsService.createMultiple(createMultipleGroupsDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('/by-semester/:semesterId')
  findBySemester(@Param('semesterId') semesterId: string) {
    return this.groupsService.findBySemester(+semesterId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Patch('visible/:id')
  updateVisible(@Param('id') id: string, @Body() updateVisibilityDto: UpdateVisibilityDto) {
    return this.groupsService.updateVisible(+id, updateVisibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
