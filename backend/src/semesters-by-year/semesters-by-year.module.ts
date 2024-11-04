import { Module } from '@nestjs/common';
import { SemestersByYearService } from './semesters-by-year.service';
import { SemestersByYearController } from './semesters-by-year.controller';
import { SemesterByYear } from './entities/semesters-by-year.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([SemesterByYear]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [SemestersByYearController],
  providers: [SemestersByYearService],
})
export class SemestersByYearModule { }
