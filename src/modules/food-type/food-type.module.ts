import { Module } from '@nestjs/common';
import { FoodTypeService } from './food-type.service';
import { FoodTypeController } from './food-type.controller';

@Module({
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
})
export class FoodTypeModule {}
