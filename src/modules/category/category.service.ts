import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      name: dto.name,
      slug: dto.slug,
      parent: dto.parentId ? { id: dto.parentId } : null,
    });

    return this.categoryRepository.save(category);
  }

  async findAll(rootOnly?: boolean) {
    if (rootOnly) {
      return await this.categoryRepository.find({
        where: { parent: null },
      });
    }
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
     const treeRepo = this.dataSource.getTreeRepository(Category);

    const root = await treeRepo.findOne({
      where: { id },
      relations: ['menus'], // load menus of root
    });

    if (!root) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const tree = await treeRepo.findDescendantsTree(root);

    return tree;
  }

  async getRootCategories() {
    return await this.categoryRepository.find();
  }

  /**
   * Includes:
   * - children categories (sub-categories)
   * - menus under this category and optionally filter by sub-categories
   */
  async browseCategory(
    categoryId: number,
    subCategoryIds?: number[],
    search?: string,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');

    // Load children categories for filter options
    const children = await this.categoryRepository.find({
      where: { parent: { id: categoryId } },
    });

    // Collect category IDs for menu filtering
    const filterCategoryIds = subCategoryIds?.length
      ? subCategoryIds
      : [categoryId, ...children.map((c) => c.id)];

    // Query menus
    const qb = this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.categories', 'category')
      .where('category.id IN (:...ids)', { ids: filterCategoryIds });

    if (search) {
      qb.andWhere('menu.name LIKE :search', { search: `%${search}%` });
    }

    const menus = await qb.getMany();

    return {
      category,
      subCategories: children,
      menus,
    };
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
