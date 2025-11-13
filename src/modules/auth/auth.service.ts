import { TokenOptions as TokenConfig, TokenPayload } from '@/types/global';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersService } from '@/modules/users/users.service';

import bcrypt from 'bcrypt';
import { Response } from 'express';
import { JWT_CONFIG } from './constants/auth.constant';
import { RecoveryAccountDto } from './dto/recovery-account';

@Injectable()
export class AuthService {
  constructor(
    private user: UsersService,
    private jwt: JwtService,
  ) {}

  private async generateAuthToken(config: TokenConfig) {
    return await this.jwt.signAsync(config.payload, {
      expiresIn:
        config.type === 'access'
          ? JWT_CONFIG.ACCESS.expiresIn
          : JWT_CONFIG.REFRESH.expiresIn,
    });
  }

  async setAuthToken(res: Response, config: TokenConfig) {
    const token = await this.generateAuthToken(config);

    if (config.type === 'access') {
      return res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });
    }

    return res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: JWT_CONFIG.REFRESH.maxAge,
    });
  }

  async signIn(data: SignInDto) {
    const { email, password } = data;

    const existingUser = await this.user.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      throw new BadRequestException('Ops! Credencias Inválidas.');
    }

    return await this.user.findById(existingUser.id);
  }

  async signUp(data: CreateUserDto) {
    return await this.user.create(data);
  }

  async recovery(data: RecoveryAccountDto) {
    const user = await this.user.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('E-mail não encontrado!');
    }

    return 'Link de confirmação enviado para ' + user.email;
  }

  async refreshToken(token: string) {
    const tokenDecoded: TokenPayload = await this.jwt.decode(token);
    const user = await this.user.findById(tokenDecoded.user.id);

    return user;
  }

  signOut(res: Response) {
    res.clearCookie('authToken', {
      maxAge: 0,
    });
  }
}
