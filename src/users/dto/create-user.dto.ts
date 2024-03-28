import { PartialType } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user-dto';

export class CreateUserDto extends PartialType(UserDto) {}
