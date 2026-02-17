import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @Transform(({ value }) => (value !== null ? Number(value) : null))
  @IsInt()
  @Min(1)
  parentId?: number | null;
}
