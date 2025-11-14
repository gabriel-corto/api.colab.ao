import { IsNotEmpty, IsOptional, IsUrl, Length } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @Length(10, 100)
  biography: string;
}
