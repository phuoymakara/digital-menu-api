import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../common/decorators/auth.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@ApiBearerAuth('access_token')
@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all menus' }) // Description of the action
  @ApiResponse({ status: 200, description: 'Return all menus.' })
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const menus = await this.menuService.findAll(paginationDto);
      return menus;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /*
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
    */
}
