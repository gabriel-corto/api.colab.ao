import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoveryAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
