import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn-dto';
import * as argon2 from 'argon2';
import { UserDto } from 'src/dtos/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userDto: UserDto): Promise<any> {
    const { email, password } = userDto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await argon2.hash(password);
    delete userDto.password;
    const user = await this.prisma.user.create({
      data: { ...userDto, hashedPassword },
    });
    delete user.hashedPassword;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: username },
    });
    if (user && (await argon2.verify(user.hashedPassword, password))) {
      delete user.hashedPassword;
      return user;
    }
    return null;
  }
}
