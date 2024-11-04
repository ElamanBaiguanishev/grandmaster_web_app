import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  cipher: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsInt()
  @IsNotEmpty()
  semesterId: number;

  @IsInt()
  @IsOptional()
  phoneNumber: number;

  @IsString()
  @IsOptional()
  login: string;

  @IsString()
  @IsOptional()
  password: string;
}
