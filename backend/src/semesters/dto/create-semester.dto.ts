import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSemesterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    courseId: number;
}
