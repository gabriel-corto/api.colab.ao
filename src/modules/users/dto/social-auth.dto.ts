import { IsNotEmpty } from 'class-validator';

export class SocialAuthDto {
  @IsNotEmpty()
  token: string;
}
