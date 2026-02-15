import { Module } from '@nestjs/common';
import { FoodTypeService } from './food-type.service';
import { FoodTypeController } from './food-type.controller';
import { FoodType } from './entities/food-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodType])],
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
})
export class FoodTypeModule {}
