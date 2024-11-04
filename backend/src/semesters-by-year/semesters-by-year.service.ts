import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSemestersByYearDto } from './dto/create-semesters-by-year.dto';
import { UpdateSemestersByYearDto } from './dto/update-semesters-by-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SemesterByYear } from './entities/semesters-by-year.entity';

@Injectable()
export class SemestersByYearService {
  constructor(
    @InjectRepository(SemesterByYear)
    private readonly semesterRepository: Repository<SemesterByYear>
  ) { }

  async create(createSemestersByYearDto: CreateSemestersByYearDto) {
    const newSemester = {
      name: createSemestersByYearDto.name,
      year: { id: createSemestersByYearDto.yearId },
      course: { id: +createSemestersByYearDto.courseId }
    }

    if (!newSemester) throw new BadRequestException('Somethins went wrong')

    return await this.semesterRepository.save(newSemester);
  }

  async createMany(semestersData: CreateSemestersByYearDto[]) {
    const newSemesters = semestersData.map(semester => ({
      name: semester.name,
      year: { id: 1 }, // Добавляем 2024 год
      course: { id: +semester.courseId }
    }));

    try {
      // Сохраняем все семестры в базе данных
      return await this.semesterRepository.save(newSemesters);
    } catch (error) {
      throw new BadRequestException('Error while saving semesters');
    }
  }

  async findAll(year: string) {
    return await this.semesterRepository.find({
      where: {
        year: { name: year }
      },
      relations: ['year', 'course'],
    });
  }

  async firstReport(year: string): Promise<any[]> {
    const reportData = await this.semesterRepository
        .createQueryBuilder('semester')
        .leftJoinAndSelect('semester.clients', 'client')
        .leftJoinAndSelect('client.orders', 'order') // Присоединяем заказы к клиентам
        .leftJoinAndSelect('semester.year', 'year')
        .where('year.name = :year', { year })
        .select('semester.name', 'semesterName') // Получаем название семестра
        .addSelect('client.groupName', 'groupName')
        .addSelect('COUNT(client.id)', 'totalStudents')  // Считаем количество студентов
        .addSelect('COUNT(order.id)', 'ordered') // Считаем количество заказов
        .addSelect('COUNT(order.id) * 100.0 / NULLIF(COUNT(client.id), 0)', 'percent') // Процент заказов
        .addSelect('COUNT(client.id) * 0.3', 'allKR') // Примерное количество всех контрольных работ (замените на реальный подсчет)
        .groupBy('semester.name, client.groupName')
        .getRawMany();

    // Преобразование данных в нужный формат
    return reportData.map(item => ({
        semester: item.semesterName,
        specialty: item.groupName,
        totalStudents: parseInt(item.totalStudents, 10) || 0,
        ordered: parseInt(item.ordered, 10) || 0,
        percent: parseFloat(item.percent) || 0,
        allKR: parseInt(item.allKR, 10) || 0
    }));
}


  findOne(id: number) {
    return `This action returns a #${id} semestersByYear`;
  }

  update(id: number, updateSemestersByYearDto: UpdateSemestersByYearDto) {
    return `This action updates a #${id} semestersByYear`;
  }

  remove(id: number) {
    return `This action removes a #${id} semestersByYear`;
  }
}
