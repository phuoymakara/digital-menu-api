import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodTypeService } from './food-type.service';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { UpdateFoodTypeDto } from './dto/update-food-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Food Type")
@Controller('food-type')
export class FoodTypeController {
  constructor(private readonly foodTypeService: FoodTypeService) {}

  @Get()
  findAll() {
    return this.foodTypeService.findAll();
  }
/*
  @Post()
  create(@Body() createFoodTypeDto: CreateFoodTypeDto) {
    return this.foodTypeService.create(createFoodTypeDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodTypeDto: UpdateFoodTypeDto) {
    return this.foodTypeService.update(+id, updateFoodTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodTypeService.remove(+id);
  }
    */
}
