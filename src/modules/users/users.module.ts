import { Module } from "@nestjs/common";

import { UsersService } from "@/modules/users/users.service";
import { PrismaService } from "@/services/database/prisma.service";
import { Colab } from "@/utils/colab";

import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Colab],
  exports: [UsersService],
})
export class UsersModule {}
