import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PatientDto {
  @ApiProperty({ example: 'Ali Vali', description: 'Full name of the patient' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth of the patient (YYYY-MM-DD)',
  })
  @IsString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 1, description: 'ID of the assigned doctor' })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;
}

export class GetPatientDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ali Vali' })
  name: string;

  @ApiProperty({ example: '1990-01-01' })
  dob: string;

  @ApiProperty({ example: 1 })
  doctor_id: number;

  @ApiProperty({ example: '2024-07-28T12:34:56.789Z' })
  create_date: Date;

  @ApiProperty({ example: '2024-07-28T12:34:56.789Z' })
  update_date: Date;
}
