import { IsString, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  groupId?: number;  // ID группы, если клиент привязан к группе
}