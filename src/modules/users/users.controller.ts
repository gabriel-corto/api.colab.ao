import { Controller, Get, Query } from "@nestjs/common";

import { ApiPageDataResponse } from "@/types/global";
import { UsersService } from "./users.service";
import { QueryParamsDto } from "./dto/params.dto";

@Controller("users")
export class UsersController {
  constructor(private user: UsersService) {}

  @Get()
  async findAll(@Query() query: QueryParamsDto): Promise<ApiPageDataResponse> {
    const users = await this.user.findAll(query);

    return {
      data: users,
      metadata: {},
    };
  }
}
