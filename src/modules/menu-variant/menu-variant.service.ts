import { Injectable } from '@nestjs/common';
import { CreateMenuVariantDto } from './dto/create-menu-variant.dto';
import { UpdateMenuVariantDto } from './dto/update-menu-variant.dto';

@Injectable()
export class MenuVariantService {
  create(createMenuVariantDto: CreateMenuVariantDto) {
    return 'This action adds a new menuVariant';
  }

  findAll() {
    return `This action returns all menuVariant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuVariant`;
  }

  update(id: number, updateMenuVariantDto: UpdateMenuVariantDto) {
    return `This action updates a #${id} menuVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuVariant`;
  }
}
