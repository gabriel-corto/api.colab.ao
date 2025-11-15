import type { ApiPageDataResponse, ApiSuccessResponse, AppRequest } from "@/types/global";
import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";

import { ProjectService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";

@Controller("/projects")
export class ProjectsController {
  constructor(private project: ProjectService) {}

  @Get("/all")
  async findAll(): Promise<ApiPageDataResponse> {
    const projects = await this.project.findAll();

    return {
      data: projects,
      metadata: {},
    };
  }

  @Get()
  async findUserProjects(@Req() req: AppRequest): Promise<ApiPageDataResponse> {
    const ownerId = req.token?.user.id as string;
    const projects = await this.project.findUserProjects(ownerId);

    return {
      data: projects,
      metadata: {},
    };
  }

  @Get("/workboards")
  async getWorkBoards(@Req() req: AppRequest): Promise<ApiPageDataResponse> {
    const ownerId = req.token?.user.id as string;
    const boards = await this.project.getWorkBoards(ownerId);

    return {
      data: boards,
      metadata: {},
    };
  }

  @Get(":slug")
  async getProjectDetails(
    @Req() req: AppRequest,
    @Param() param: { slug: string },
  ): Promise<ApiSuccessResponse> {
    const ownerId = req.token?.user.id as string;
    const slug = param.slug;
    const project = await this.project.findBySlug(slug, ownerId);

    return {
      data: project,
    };
  }

  @Post()
  async create(@Body() body: CreateProjectDto, @Req() req: AppRequest) {
    const ownerId = req.token?.user.id as string;
    const project = await this.project.create(body, ownerId);

    return {
      data: project,
      message: "Projecto criado com sucesso!",
    };
  }

  @Delete(":id")
  async delete(@Req() req: AppRequest, @Param() param: { id: string }) {
    const ownerId = req.token?.user.id as string;
    await this.project.delete(param.id, ownerId);

    return {
      message: "Projecto Excluído com sucesso!",
    };
  }
}
