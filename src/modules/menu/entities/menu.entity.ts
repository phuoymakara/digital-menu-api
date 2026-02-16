import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { FoodType } from '../../food-type/entities/food-type.entity';
import { Category } from '../../category/entities/category.entity';
import { MenuVariant } from '../../menu-variant/entities/menu-variant.entity';
import { Exclude, Expose } from 'class-transformer';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data); // Converts database string back to JS number
  }
}
@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('decimal', { 
      nullable: true, 
      precision: 10, 
      scale: 2 ,
      transformer: new ColumnNumericTransformer() 
  })
  price: number;

  @ManyToOne(() => FoodType, (type) => type.menus)
  foodType: FoodType;

  @ManyToMany(() => Category, (cat) => cat.menus)
  @JoinTable({
    name: 'menu_categories',
    joinColumn: { name: 'menu_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @OneToMany(() => MenuVariant, (variant) => variant.menu, {
    cascade: true,
  })
  variants: MenuVariant[];
}

