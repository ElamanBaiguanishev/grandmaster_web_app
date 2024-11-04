import { PartialType } from '@nestjs/mapped-types';
import { CreateSemestersByYearDto } from './create-semesters-by-year.dto';

export class UpdateSemestersByYearDto extends PartialType(CreateSemestersByYearDto) {}
