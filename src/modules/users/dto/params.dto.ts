import { AccountType } from "@prisma/client";

export class QueryParamsDto {
  colabId?: string;
  email?: string;
  id?: string;
  accountType?: AccountType;
}
