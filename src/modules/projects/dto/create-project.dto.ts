import { ProjectCategory } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(ProjectCategory)
  category: ProjectCategory;
}

