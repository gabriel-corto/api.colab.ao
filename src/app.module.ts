import { Module } from "@nestjs/common";

import { AuthModule } from "@/modules/auth/auth.module";
import { UsersModule } from "@/modules/users/users.module";

import { ProfileModule } from "@/modules/profile/profile.module";
import { ProjectsModule } from "@/modules/projects/projects.module";

@Module({
  imports: [UsersModule, AuthModule, ProfileModule, ProjectsModule],
})
export class AppModule {}
