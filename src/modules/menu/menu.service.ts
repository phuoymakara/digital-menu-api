import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasePaginationService } from '../../common/pagination/pagination.service';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class MenuService extends BasePaginationService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {
    super();
  }

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu';
  }

  async findAll(paginationDto: PaginationDto) {
    const { search, categoryId, sortBy, order } = paginationDto;

    const qb = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.variants', 'variants')
      .leftJoinAndSelect('menu.foodType', 'foodType');
    // .leftJoinAndSelect('menu.menuPrices', 'menuPrices');

    // // SEARCH (multi column)
    // if (search) {
    //   qb.andWhere(
    //     `(menu.title_en LIKE :search
    //       OR menu.title_kh LIKE :search)`,
    //     { search: `%${search}%` },
    //   );
    // }

    // //FILTER BY CATEGORY
    // if (categoryId) {
    //   qb.andWhere('category.id = :categoryId', { categoryId });
    // }

    //  // SORTING
    // const allowedSortFields = [
    //   'title_en',
    //   'price',
    //   'createdAt',
    // ];

    // if (sortBy && allowedSortFields.includes(sortBy)) {
    //   qb.orderBy(`menu.${sortBy}`, order ?? 'DESC');
    // } else {
    //   qb.orderBy('menu.createdAt', 'DESC');
    // }

    return await this.paginate(qb, paginationDto);
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
