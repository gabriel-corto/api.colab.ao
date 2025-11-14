import { AccountType } from "@prisma/client";

export class UserResponseDto {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  colabId: string;
  createdAt: Date;
  updatedAt: Date;
}
