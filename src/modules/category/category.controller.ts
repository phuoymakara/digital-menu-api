import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access_token')
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async findAll() {
    try {
      const cats = await this.categoryService.findAll();
      return cats;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.categoryService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get('roots')
  @ApiOperation({ summary: 'Get all root/main categories' })
  getRootCategories() {
    try {
      return this.categoryService.getRootCategories();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id/browse')
  @ApiOperation({ summary: 'Browse a category, its sub-categories and menus' })
  @ApiParam({ name: 'id', description: 'ID of the category to browse', type: Number })
  @ApiQuery({
    name: 'subCategories',
    description: 'Comma-separated IDs of sub-categories to filter menus',
    required: false,
    example: '10,11',
  })
  @ApiQuery({
    name: 'search',
    description: 'Search string to filter menus by name',
    required: false,
    example: 'americano',
  })
  async browse(
    @Param('id', ParseIntPipe) id: number,
    @Query('subCategories') subCategories?: string,
    @Query('search') search?: string,
  ) {
    try{
      const subCategoryIds = subCategories
        ? subCategories.split(',').map(Number)
        : undefined;

      return await this.categoryService.browseCategory(id, subCategoryIds, search);
    }catch(error){
      throw new NotFoundException(error);
    }
  }
  
  /*
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
  */
}
