import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  Tree,
  TreeParent,
  TreeChildren,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
@Tree('closure-table')
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true })
  slug: string;

  @TreeParent()
  parent?: Category;  // One parent (nullable for root)

  @TreeChildren()
  children?: Category[];  // Many children

  @ManyToMany(() => Menu, (menu) => menu.categories)
  menus: Menu[];
}