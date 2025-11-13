import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import type { AppRequest } from '@/types/global';
import type { Response } from 'express';

import { AuthService } from './auth.service';

import { Public } from '@/common/decorators/public.decorator';
import { SignInDto } from '@/modules/auth/dto/sign-in.dto';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { RecoveryAccountDto } from './dto/recovery-account';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    const user = await this.auth.signIn(body);

    await this.auth.setAuthToken(res, {
      payload: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      type: 'access',
    });

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }

  @Public()
  @Post('/sign-up')
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    const user = await this.auth.signUp(body);

    await this.auth.setAuthToken(res, {
      payload: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      type: 'access',
    });

    return res.json({
      data: user,
      message: 'Conta Cadastrada com sucesso!',
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/recovery')
  async recovery(@Body() body: RecoveryAccountDto) {
    const message = await this.auth.recovery(body);

    return {
      message,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/refresh-token')
  async refreshToken(@Req() req: AppRequest, @Res() res: Response) {
    const token = (req.cookies?.authToken ||
      req.headers.authorization?.replace('Bearer ', '')) as string;

    const user = await this.auth.refreshToken(token);

    await this.auth.setAuthToken(res, {
      payload: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      type: 'refresh',
    });

    return res.json({
      data: user,
      message: 'AUTHORIZED',
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-out')
  signOut(@Res() res: Response) {
    this.auth.signOut(res);

    return res.json({
      message: 'EXPIRED_SESSION',
    });
  }
}
