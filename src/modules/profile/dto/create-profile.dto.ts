import { IsEmpty, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsUrl()
  avatar: string;

  @IsEmpty()
  @Length(10, 100)
  biography: string;
}
