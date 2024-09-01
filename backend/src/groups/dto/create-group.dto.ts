import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    semesterId: number;
}