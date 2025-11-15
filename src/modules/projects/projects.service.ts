import { PrismaService } from "@/services/database/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { Colab } from "@/utils/colab";

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private colab: Colab,
  ) {}

  async create(data: CreateProjectDto, ownerId: string) {
    const { name, description, category } = data;
    const slug = this.colab.generateSlug(name);

    return await this.prisma.project.create({
      data: {
        name,
        description,
        category,
        slug,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findUserProjects(ownerId: string) {
    return await this.prisma.project.findMany({
      where: {
        ownerId,
      },
      omit: {
        ownerId: true,
      },
    });
  }

  async getWorkBoards(ownerId: string) {
    return await this.prisma.project.findMany({
      where: {
        ownerId,
      },
      select: {
        slug: true,
        category: true,
        name: true,
      },
    });
  }

  async delete(id: string, ownerId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: id,
        AND: {
          ownerId,
        },
      },
    });

    if (!project) {
      throw new NotFoundException("Projecto não encontrado!");
    }

    await this.prisma.project.delete({
      where: {
        id,
        AND: {
          ownerId,
        },
      },
    });
  }
}
