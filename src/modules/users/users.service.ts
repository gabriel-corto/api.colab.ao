import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "@/services/database/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";

import { Colab } from "@/utils/colab";
import bcrypt from "bcrypt";
import { QueryParamsDto } from "./dto/params.dto";

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private colab: Colab,
  ) {}

  async findAll(query?: QueryParamsDto) {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
      },
      where: {
        id: query?.id,
        email: {
          contains: query?.email,
        },
        accountType: query?.accountType,
        colabId: query?.colabId,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado!");
    }

    return user;
  }

  async getProfile(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        id: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
      include: {
        profile: {
          omit: {
            id: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  private async passwordHash(password: string) {
    return await bcrypt.hash(password, 6);
  }

  async create(data: CreateUserDto) {
    const user = await this.findByEmail(data.email);

    if (user) {
      throw new ConflictException("Este e-mail já está sendo usado!");
    }

    const { name, email, accountType, password } = data;
    const colabId = this.colab.generateId(name);

    return await this.prisma.user.create({
      data: {
        name,
        email,
        colabId,
        accountType,
        password: await this.passwordHash(password),
      },
      omit: {
        password: true,
      },
    });
  }
}
