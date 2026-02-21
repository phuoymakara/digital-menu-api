import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { DataSource, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuRepository extends Repository<Menu> {
  constructor(private dataSource: DataSource) {
    super(Menu, dataSource.createEntityManager());
  }
}