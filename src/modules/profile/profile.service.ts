import { Injectable } from "@nestjs/common";

import { UsersService } from "@/modules/users/users.service";
import { PrismaService } from "@/services/database/prisma.service";

import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private user: UsersService,
  ) {}

  async getProfile(id: string) {
    return await this.user.getProfile(id);
  }

  async create(data: CreateProfileDto, userId: string) {
    const { avatar, biography } = data;

    return await this.prisma.profile.create({
      data: {
        avatar,
        biography,
        userId,
      },
    });
  }

  async update(data: UpdateProfileDto, userId: string) {
    const { avatar, biography } = data;

    return await this.prisma.profile.update({
      data: {
        avatar,
        biography,
        userId,
      },
      where: {
        userId,
      },
    });
  }
}
