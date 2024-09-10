import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    lessonId: number;
}
