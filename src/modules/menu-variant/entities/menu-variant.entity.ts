import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';

@Entity('menu_variants')
export class MenuVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string; 
  // Small / Medium / Large / 500g / 6pcs

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  unit: string; 
  // size / weight / pieces

  @Column({ nullable: true })
  value: string; 
  // 500, 6, Large

  @ManyToOne(() => Menu, (menu) => menu.variants, {
    onDelete: 'CASCADE',
  })
  menu: Menu;
}
