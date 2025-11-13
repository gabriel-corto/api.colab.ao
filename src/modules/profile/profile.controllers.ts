import type { ApiSuccessResponse, AppRequest } from '@/types/global';
import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profile: ProfileService) {}

  @Get('/me')
  async getProfile(@Req() req: AppRequest) {
    const userId = req.token?.user.id as string;
    const profile = await this.profile.getProfile(userId);

    return {
      ...profile,
    };
  }

  @Post()
  async create(@Body() body: CreateProfileDto): Promise<ApiSuccessResponse> {
    const profile = await this.profile.create(body);

    return {
      data: profile,
      message: 'Dados de perfil actualizado com sucesso!',
    };
  }

  @Patch()
  async update(@Body() body: UpdateProfileDto): Promise<ApiSuccessResponse> {
    const profile = await this.profile.update(body);

    return {
      data: profile,
      message: 'Perfil actualizado com sucesso!',
    };
  }
}
