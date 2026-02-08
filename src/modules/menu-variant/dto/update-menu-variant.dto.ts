import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuVariantDto } from './create-menu-variant.dto';

export class UpdateMenuVariantDto extends PartialType(CreateMenuVariantDto) {}
