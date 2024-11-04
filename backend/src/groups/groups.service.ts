import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateMultipleGroupsDto } from './dto/create-multiple-groups.dto';
import { UpdateVisibilityDto } from './dto/visible.dto';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) { }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = {
      name: createGroupDto.name,
      semester: { id: +createGroupDto.semesterId }
    }

    if (!newGroup) throw new BadRequestException('Somethins went wrong')

    return await this.groupRepository.save(newGroup);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find({ relations: ['semester', 'semester.course', 'semester.course.studyMode', 'lessons'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['semester', 'semester.course', 'semester.course.studyMode', 'lessons', 'lessons.tasks'], // Загружаем связанные объекты
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    return group;
  }

  async findBySemester(semesterId: number): Promise<Group[]> {
    return await this.groupRepository.find({
      where: { semester: { id: semesterId } },
      relations: ['semester', 'semester.course', 'semester.course.studyMode', 'lessons'],
    });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);

    group.name = updateGroupDto.name;
    group.semester.id = updateGroupDto.semesterId;

    return await this.groupRepository.save(group);
  }

  async updateVisible(id: number, updateVisibilityDto: UpdateVisibilityDto) {
    const group = await this.findOne(id);

    group.isVisible = updateVisibilityDto.isVisible;

    return await this.groupRepository.save(group);
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepository.remove(group);
  }

  async createMultiple(createMultipleGroupsDto: CreateMultipleGroupsDto): Promise<Group[]> {
    const { groupNames, semesterId } = createMultipleGroupsDto;

    const newGroups = groupNames.map(name => ({
      name,
      semester: { id: semesterId }
    }));

    if (!newGroups.length) throw new BadRequestException('No groups to create');

    return await this.groupRepository.save(newGroups);
  }

}
