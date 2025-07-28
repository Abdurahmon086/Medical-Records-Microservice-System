import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DoctorDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
