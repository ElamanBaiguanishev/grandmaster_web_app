import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { SemestersModule } from './semesters/semesters.module';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { CoursesModule } from './courses/courses.module';
import { StudyModeModule } from './study_mode/study_mode.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { SemestersByYearModule } from './semesters-by-year/semesters-by-year.module';
import { YearModule } from './year/year.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/api'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}']
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    SemestersModule,
    GroupsModule,
    LessonsModule,
    CoursesModule,
    StudyModeModule,
    AuthModule,
    TaskModule,
    ClientsModule,
    OrdersModule,
    FilesModule,
    SemestersByYearModule,
    YearModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
