import { Injectable, Logger } from '@nestjs/common';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { UpdateFoodTypeDto } from './dto/update-food-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodType } from './entities/food-type.entity';

@Injectable()
export class FoodTypeService {
  private readonly logger = new Logger(FoodTypeService.name);

  constructor(
    @InjectRepository(FoodType)
    private readonly foodTypeRepository: Repository<FoodType>,
  ){};

  create(createFoodTypeDto: CreateFoodTypeDto) {
    return 'This action adds a new foodType';
  }

  async findAll() {
    return await this.foodTypeRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} foodType`;
  }

  update(id: number, updateFoodTypeDto: UpdateFoodTypeDto) {
    return `This action updates a #${id} foodType`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodType`;
  }
}
