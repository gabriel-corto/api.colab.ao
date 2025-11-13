import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';

import { PrismaService } from '@/services/database/prisma.service';
import { ProfileController } from './profile.controllers';
import { ProfileService } from './profile.service';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
