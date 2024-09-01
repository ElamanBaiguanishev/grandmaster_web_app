import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudyModeService } from './study_mode.service';
import { CreateStudyModeDto } from './dto/create-study_mode.dto';
import { UpdateStudyModeDto } from './dto/update-study_mode.dto';

@UsePipes(ValidationPipe)
@Controller('studymodes')
export class StudyModeController {
  constructor(private readonly studyModeService: StudyModeService) {}

  @Post()
  create(@Body() createStudyModeDto: CreateStudyModeDto) {
    return this.studyModeService.create(createStudyModeDto);
  }

  @Get()
  findAll() {
    return this.studyModeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyModeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyModeDto: UpdateStudyModeDto) {
    return this.studyModeService.update(+id, updateStudyModeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyModeService.remove(+id);
  }
}
