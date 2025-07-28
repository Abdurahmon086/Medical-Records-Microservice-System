import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NoteDto {
  @ApiProperty({
    example: 'Samething',
    description: 'Text content',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    example: 123,
    description: 'Visit ID',
  })
  @IsNumber()
  @IsNotEmpty()
  visit_id: number;
}

export class GetNoteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  visit_id: number;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  update_date: Date;
}
