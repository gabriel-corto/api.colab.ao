import { IsOptional, IsUrl, Length } from 'class-validator';

export class UpdateProfileDto {
  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsOptional()
  @Length(10, 100)
  biography: string;
}
