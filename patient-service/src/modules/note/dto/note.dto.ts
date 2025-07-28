import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  visit_id: number;
}
