import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VisitDto {
  @ApiProperty({
    example: '2025-07-28',
    description: 'The date and time of the visit',
  })
  @IsString()
  @IsNotEmpty()
  visit_date: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the patient who made the visit',
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;
}

export class GetVisitDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  patient_id: number;

  @ApiProperty()
  visit_date: string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  update_date: Date;
}
