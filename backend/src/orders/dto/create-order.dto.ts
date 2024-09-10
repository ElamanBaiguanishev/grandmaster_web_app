import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';
import { Lesson } from 'src/lessons/entities/lesson.entity';

export class CreateOrderDto {
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    telegram_user_id: string;

    @IsString()
    @IsNotEmpty()
    fio: string;

    @IsNotEmpty()
    group_id: string;

    @IsOptional()
    lessons: string;  // Массив уроков, если нужно
}
