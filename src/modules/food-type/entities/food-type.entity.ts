import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity('food_types')
export class FoodType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Menu, (menu) => menu.foodType)
  menus: Menu[];
}
