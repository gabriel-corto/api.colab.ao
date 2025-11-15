import { Module } from "@nestjs/common";

import { PrismaService } from "@/services/database/prisma.service";
import { ProjectService } from "./projects.service";
import { ProjectsController } from "./projects.controller";
import { Colab } from "@/utils/colab";

@Module({
  controllers: [ProjectsController],
  providers: [PrismaService, ProjectService, Colab],
})
export class ProjectsModule {}
