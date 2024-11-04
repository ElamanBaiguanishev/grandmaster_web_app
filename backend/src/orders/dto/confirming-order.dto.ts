import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfirmingOrderDto {
    @IsInt()
    @IsNotEmpty()
    confirmedById: number;

    @IsString()
    @IsNotEmpty()
    confirmedByName: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    confirmedDate: Date;
}
