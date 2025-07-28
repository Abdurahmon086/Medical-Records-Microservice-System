import { IsString, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;
}
