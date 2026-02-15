import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuVariantService } from './menu-variant.service';
import { CreateMenuVariantDto } from './dto/create-menu-variant.dto';
import { UpdateMenuVariantDto } from './dto/update-menu-variant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu-variant')
@Controller('menu-variant')
export class MenuVariantController {
  constructor(private readonly menuVariantService: MenuVariantService) {}

  @Get()
  async findAll() {
    return this.menuVariantService.findAll();
  }

  /*
  @Post()
  create(@Body() createMenuVariantDto: CreateMenuVariantDto) {
    return this.menuVariantService.create(createMenuVariantDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuVariantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuVariantDto: UpdateMenuVariantDto) {
    return this.menuVariantService.update(+id, updateMenuVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuVariantService.remove(+id);
  }
  */
}
