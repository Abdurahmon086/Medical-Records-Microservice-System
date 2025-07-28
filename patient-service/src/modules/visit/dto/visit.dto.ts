import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class VisitDto {
  @IsDateString()
  @IsNotEmpty()
  visit_date: string;

  @IsNumber()
  @IsNotEmpty()
  patient_id: number;
}
