import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { BasePaginationService } from '../../common/pagination/pagination.service';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { FoodType } from '../food-type/entities/food-type.entity';
import { Category } from '../category/entities/category.entity';
import { MenuVariant } from '../menu-variant/entities/menu-variant.entity';

@Injectable()
export class MenuService extends BasePaginationService {
  private readonly logger = new Logger(MenuService.name);
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    @InjectRepository(FoodType)
    private readonly foodTypeRepository: Repository<FoodType>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(MenuVariant)
    private readonly variantRepository: Repository<MenuVariant>,
  ) {
    super();
  }

  async create(createMenuDto: CreateMenuDto) {
    const {
      name,
      description,
      image,
      price,
      foodTypeId,
      categoryIds,
      variants,
    } = createMenuDto;

    // Validate food type exists
    const foodType = await this.foodTypeRepository.findOne({
      where: { id: foodTypeId },
    });

    if (!foodType) {
      throw new NotFoundException('Food type not found');
    }

    //  Validate categories exist
    let categories: Category[] = [];
    if (categoryIds?.length) {
      categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });

      if (categories.length !== categoryIds.length) {
        throw new BadRequestException('One or more categories not found');
      }
    }

    const menu = this.menuRepository.create({
      name,
      description,
      image,
      price,
      foodType,
      categories,
      variants, // cascade: true will handle insert
    });

    const savedMenu = await this.menuRepository.save(menu);

    return savedMenu;
  }

  async findAll(paginationDto: PaginationDto) {
    const { search, categoryId, sortBy, order } = paginationDto;

    const qb = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.variants', 'variants')
      .leftJoinAndSelect('menu.foodType', 'foodType');

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

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.dataSource.transaction(async (manager) => {
      // Load menu with relations
      const menu = await manager.findOne(Menu, {
        where: { id },
        relations: ['categories', 'variants', 'foodType'],
      });

      if (!menu) {
        throw new NotFoundException('Menu not found');
      }

      const {
        name,
        description,
        image,
        price,
        foodTypeId,
        categoryIds,
        variants,
      } = updateMenuDto;

      //  Update basic fields (PATCH-safe)
      if (name !== undefined) menu.name = name;
      if (description !== undefined) menu.description = description;
      if (image !== undefined) menu.image = image;
      if (price !== undefined) menu.price = price;

      // Update food type
      if (foodTypeId !== undefined) {
        const foodType = await manager.findOne(FoodType, {
          where: { id: foodTypeId },
        });

        if (!foodType) {
          throw new NotFoundException('Food type not found');
        }

        menu.foodType = foodType;
      }

      // Update categories (replace strategy)
      if (categoryIds !== undefined) {
        const categories = await manager.findBy(Category, {
          id: In(categoryIds),
        });

        if (categories.length !== categoryIds.length) {
          throw new BadRequestException('One or more categories not found');
        }

        menu.categories = categories;
      }

      // Replace variants safely
      if (variants !== undefined) {
        await manager.delete(MenuVariant, { menu: { id } }); // Remove old variants

        const variantEntities = variants.map((variant) =>
          manager.create(MenuVariant, {
            ...variant,
            menu: { id },
          }),
        );

        menu.variants = variantEntities;
      }

      return manager.save(Menu, menu); // Save everything atomically
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
