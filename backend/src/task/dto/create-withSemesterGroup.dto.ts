import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateTaskWithSemesterGroupDto {
    @IsString()
    @IsNotEmpty()
    group: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    task_type: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    semesterId: number;
}
