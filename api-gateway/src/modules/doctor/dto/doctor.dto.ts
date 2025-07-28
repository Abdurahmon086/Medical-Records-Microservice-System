import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DoctorDto {
  @ApiProperty({
    example: 'Ali Vali',
    description: "Doctor's full name",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ali@gamil.com',
    description: 'Doctor email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class GetDoctorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  update_date: Date;
}
