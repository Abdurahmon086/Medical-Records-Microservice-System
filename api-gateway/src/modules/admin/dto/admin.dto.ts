import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @ApiProperty({
    example: ' Something',
    description: 'Something',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Something.',
    description: 'Something',
  })
  @IsString()
  content: string;
}

export class GetAdminDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  update_date: Date;
}
