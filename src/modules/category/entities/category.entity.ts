import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];

  @ManyToMany(() => Menu, (menu) => menu.categories)
  menus: Menu[];
}
