import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      name: dto.name,
      slug: dto.slug,
      parent: dto.parentId ? { id: dto.parentId } : null,
    });

    return this.categoryRepository.save(category);
  }

  async findAll() {
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
