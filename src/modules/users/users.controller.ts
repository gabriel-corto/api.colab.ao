import { Controller, Get } from '@nestjs/common';

import { ApiPageDataResponse } from '@/types/global';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private user: UsersService) {}

  @Get()
  async findAll(): Promise<ApiPageDataResponse> {
    const users = await this.user.findAll();

    return {
      data: users,
      metadata: {},
    };
  }
}
