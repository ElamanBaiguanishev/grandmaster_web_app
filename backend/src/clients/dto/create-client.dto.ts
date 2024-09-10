// create-client.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  id: string;  // текстовый шифр для клиента

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  groupId: number;  // ID группы, если клиент привязан к группе
}