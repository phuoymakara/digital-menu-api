import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  Min,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateMenuVariantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  label: string;

  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  value?: string;

  // Relation: Menu
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  menuId: number;
}
