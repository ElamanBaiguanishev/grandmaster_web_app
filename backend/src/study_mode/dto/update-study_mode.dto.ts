import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyModeDto } from './create-study_mode.dto';

export class UpdateStudyModeDto extends PartialType(CreateStudyModeDto) {}
