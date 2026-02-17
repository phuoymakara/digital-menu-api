import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateFoodTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}
