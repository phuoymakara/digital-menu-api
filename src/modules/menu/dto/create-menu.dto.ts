import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsNumber,
  IsInt,
  Min,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateMenuVariantDto } from '../../menu-variant/dto/create-menu-variant.dto';
export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @Transform(({ value }) => (value !== null ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price?: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  foodTypeId: number;

  @IsArray()
  @IsInt({ each: true })
  categoryIds: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuVariantDto)
  variants?: CreateMenuVariantDto[];
}
