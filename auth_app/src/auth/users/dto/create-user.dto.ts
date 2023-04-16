import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty() 
  login: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty() 
  password: string;
}