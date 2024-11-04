import { IsString, IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyingOrderDto {
    @IsString()
    @IsNotEmpty()
    cipher: string;

    @IsInt()
    @IsNotEmpty()
    verifiedById: number;

    @IsString()
    @IsNotEmpty()
    verifiedByName: string;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    verifiedDate: Date;
}
