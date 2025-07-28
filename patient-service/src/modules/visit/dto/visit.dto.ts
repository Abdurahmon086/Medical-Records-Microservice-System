import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VisitDto {
  @IsString()
  @IsNotEmpty()
  visit_date: string;

  @IsNumber()
  @IsNotEmpty()
  patient_id: number;
}
