import { Module } from '@nestjs/common';
import { MenuVariantService } from './menu-variant.service';
import { MenuVariantController } from './menu-variant.controller';

@Module({
  controllers: [MenuVariantController],
  providers: [MenuVariantService],
})
export class MenuVariantModule {}
