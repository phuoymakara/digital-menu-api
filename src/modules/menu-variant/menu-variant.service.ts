import { Injectable, Logger } from '@nestjs/common';
import { CreateMenuVariantDto } from './dto/create-menu-variant.dto';
import { UpdateMenuVariantDto } from './dto/update-menu-variant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuVariant } from './entities/menu-variant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuVariantService {
  private readonly logger = new Logger(MenuVariantService.name);
  constructor(
    @InjectRepository(MenuVariant)
    private readonly menuVariantRepository: Repository<MenuVariant>,
  ) {}

  async create(dto: CreateMenuVariantDto) {
    const variant = this.menuVariantRepository.create({
      label: dto.label,
      price: dto.price,
      unit: dto.unit,
      value: dto.value,
      menu: { id: dto.menuId },
    });

    return this.menuVariantRepository.save(variant);
  }

  async findAll() {
    return await this.menuVariantRepository.find();
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
