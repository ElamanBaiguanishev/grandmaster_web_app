import { IsInt, IsNotEmpty } from "class-validator";
import { CreateRoleDto } from "src/role/dto/create-role.dto"

export class CreateUserDto {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    username: string

    @IsInt()
    @IsNotEmpty()
    roleId: number;
}
