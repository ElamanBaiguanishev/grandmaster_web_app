import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    groupId: number;
}
