import { Module } from '@nestjs/common';
import { StudyModeService } from './study_mode.service';
import { StudyModeController } from './study_mode.controller';
import { StudyMode } from './entities/study_mode.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudyMode])
  ],
  controllers: [StudyModeController],
  providers: [StudyModeService],
})
export class StudyModeModule {}
