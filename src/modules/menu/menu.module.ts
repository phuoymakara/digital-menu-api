import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodType } from '../food-type/entities/food-type.entity';
import { Category } from '../category/entities/category.entity';
import { MenuVariant } from '../menu-variant/entities/menu-variant.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Menu, FoodType, Category, MenuVariant]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService]
})
export class MenuModule {}
