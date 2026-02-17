import { AppDataSource } from '../../ormconfig';
import { FoodType } from '../modules/food-type/entities/food-type.entity';
import { Category } from '../modules/category/entities/category.entity';
import { Menu } from '../modules/menu/entities/menu.entity';
import { MenuVariant } from '../modules/menu-variant/entities/menu-variant.entity';

async function truncateAll(manager: any) {
  const tables = [
    'menu_variants',
    'menus',
    'categories',
    'food_types',
  ];

  await manager.query(`SET FOREIGN_KEY_CHECKS = 0`);

  for (const table of tables) {
    await manager.query(`TRUNCATE TABLE ${table}`);
  }

  await manager.query(`SET FOREIGN_KEY_CHECKS = 1`);

  console.log('🧹 Old data truncated');
}

async function seed() {
  await AppDataSource.initialize();
  console.log('🌱 Seeding database...');

  await AppDataSource.transaction(async (manager) => {
   //TRUNCATE OLD DATA (MySQL Safe)
    await truncateAll(manager);

    //FOOD TYPES
    const foodTypesData = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Drinks'];
    const foodTypeMap: Record<string, FoodType> = {};

    for (const name of foodTypesData) {
      const foodType = manager.create(FoodType, {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      });

      foodTypeMap[name] = await manager.save(foodType);
    }
    //CATEGORY TREE (Closure Table)
    // Root: Drinks
    const drinks = await manager.save(
      manager.create(Category, {
        name: 'Drinks',
        slug: 'drinks',
      }),
    );

    // Children of Drinks
    const coffee = await manager.save(
      manager.create(Category, {
        name: 'Coffee',
        slug: 'coffee',
        parent: drinks,
      }),
    );

    const juice = await manager.save(
      manager.create(Category, {
        name: 'Juice',
        slug: 'juice',
        parent: drinks,
      }),
    );

    // Root: Desserts
    const desserts = await manager.save(
      manager.create(Category, {
        name: 'Desserts',
        slug: 'desserts',
      }),
    );

    //MENU MOCK DATA
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

    //INSERT MENUS + VARIANTS
    for (const item of menuMockData) {
      const menu = await manager.save(
        manager.create(Menu, {
          name: item.name,
          description: item.description,
          image: item.image,
          foodType: item.foodType,
          categories: [item.category],
        }),
      );

      const variantLabels = ['Small', 'Medium', 'Large'];

      const variants = variantLabels.map((label, index) =>
        manager.create(MenuVariant, {
          label,
          price: item.prices[index],
          unit: 'size',
          value: label,
          menu,
        }),
      );

      await manager.save(variants);
    }

    console.log('✅ Seed transaction completed');
  });

  console.log('🎉 Seeding completed successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
