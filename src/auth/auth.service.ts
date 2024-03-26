import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './dto/signIn-dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private JwtService: JwtService) {
    }

    async signIn({
        email,
        password
    }: SignInDto): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email: email } });
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.JwtService.signAsync(payload),
        };
    }
    async validateUser(username, pass) {
        const user = await this.prisma.user.findUnique({ where: { email: username } });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}