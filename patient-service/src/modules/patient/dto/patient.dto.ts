import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dob: string;

  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;
  
  static doctor_id: number;
  static dob: string | undefined;
}
