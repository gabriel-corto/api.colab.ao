import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { ProfileModule } from '@/modules/profile/profile.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, ProfileModule],
})
export class AppModule {}
