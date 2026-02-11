import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ){}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
