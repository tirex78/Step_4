import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  user_id?: number;
}
