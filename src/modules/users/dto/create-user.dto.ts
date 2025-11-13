import { AccountType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(AccountType)
  accountType: AccountType;
}
