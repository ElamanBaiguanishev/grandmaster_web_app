import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    telegram_user_id: string;

    @IsString()
    @IsNotEmpty()
    telegram_nickname: string;

    @IsString()
    @IsNotEmpty()
    fio: string;

    @IsNotEmpty()
    course: string;

    @IsNotEmpty()
    semester: string;

    @IsNotEmpty()
    group: string;

    // @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    lessons: string;
}
