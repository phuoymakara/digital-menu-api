import { FoodType } from '../modules/food-type/entities/food-type.entity';
import { AppDataSource } from '../../ormconfig';
import { Category } from '../modules/category/entities/category.entity';
import { Menu } from '../modules/menu/entities/menu.entity';
import { MenuVariant } from '../modules/menu-variant/entities/menu-variant.entity';

async function seed() {
  await AppDataSource.initialize();
  console.log('Seeding database...');

  // 1️⃣ Food Types
  const foodTypesData = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks'];
  const foodTypeMap: Record<string, FoodType> = {};

  for (const name of foodTypesData) {
    const ft = new FoodType();
    ft.name = name;
    ft.slug = name.toLowerCase().replace(/\s+/g, '-');
    foodTypeMap[name] = await AppDataSource.manager.save(ft);
  }

  // 2️⃣ Categories
  const drinks = await AppDataSource.manager.save(
    Object.assign(new Category(), { name: 'Drinks', slug: 'drinks' }),
  );
  const coffee = await AppDataSource.manager.save(
    Object.assign(new Category(), {
      name: 'Coffee',
      slug: 'coffee',
      parent: drinks,
    }),
  );
  const juice = await AppDataSource.manager.save(
    Object.assign(new Category(), {
      name: 'Juice',
      slug: 'juice',
      parent: drinks,
    }),
  );
  const desserts = await AppDataSource.manager.save(
    Object.assign(new Category(), { name: 'Desserts', slug: 'desserts' }),
  );

  // 3️⃣ Realistic Mock Data
  const menuMockData = [
    {
      name: 'Caramel Macchiato',
      description:
        'Freshly steamed milk with vanilla-flavored syrup marked with espresso.',
      image:
        'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=640',
      category: coffee,
      foodType: foodTypeMap['Drinks'],
      prices: [4.5, 5.5, 6.5],
    },
    {
      name: 'Fresh Orange Juice',
      description: '100% Squeezed Valencia oranges, served chilled.',
      image:
        'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=640',
      category: juice,
      foodType: foodTypeMap['Drinks'],
      prices: [3.5, 4.5, 5.5],
    },
    {
      name: 'New York Cheesecake',
      description: 'Rich, creamy cheesecake with a graham cracker crust.',
      image:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=640',
      category: desserts,
      foodType: foodTypeMap['Snacks'],
      prices: [6.0, 7.5, 9.0],
    },
    {
      name: 'Iced Americano',
      description:
        'Espresso shots topped with cold water to produce a light layer of crema.',
      image:
        'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=640',
      category: coffee,
      foodType: foodTypeMap['Drinks'],
      prices: [3.0, 4.0, 5.0],
    },
    {
      name: 'Chocolate Lava Cake',
      description:
        'Warm chocolate cake with a molten center, served with vanilla ice cream.',
      image:
        'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=640',
      category: desserts,
      foodType: foodTypeMap['Snacks'],
      prices: [8.5, 10.0, 12.0],
    },
  ];

  // 4️⃣ Insert Menus and Variants
  for (const item of menuMockData) {
    const menu = new Menu();
    menu.name = item.name;
    menu.description = item.description;
    menu.image = item.image;
    menu.foodType = item.foodType;
    menu.categories = [item.category];

    const variantLabels = ['Small', 'Medium', 'Large'];
    menu.variants = variantLabels.map((label, index) => {
      const variant = new MenuVariant();
      variant.label = label;
      variant.price = item.prices[index];
      variant.unit = 'size';
      variant.value = label;
      variant.menu = menu;
      return variant;
    });

    await AppDataSource.manager.save(menu);
  }

  console.log('Seeding completed successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
