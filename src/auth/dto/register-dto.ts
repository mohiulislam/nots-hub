import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { UserDto } from 'src/dtos/user-dto';

export class RegisterDto extends PartialType(UserDto) {
  @IsNotEmpty()
  @MinLength(8)
  hashedPassword: string;
}
