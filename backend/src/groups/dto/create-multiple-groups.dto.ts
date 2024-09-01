import { IsString, IsNotEmpty, IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateMultipleGroupsDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    groupNames: string[];

    @IsInt()
    @IsNotEmpty()
    semesterId: number;
}
