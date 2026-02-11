import { Module } from '@nestjs/common';
import { MenuVariantService } from './menu-variant.service';
import { MenuVariantController } from './menu-variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVariant } from './entities/menu-variant.entity';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuVariant, Menu])],
  controllers: [MenuVariantController],
  providers: [MenuVariantService],
})
export class MenuVariantModule {}
