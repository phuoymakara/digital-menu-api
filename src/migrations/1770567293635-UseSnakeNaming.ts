import { MigrationInterface, QueryRunner } from "typeorm";

export class UseSnakeNaming1770567293635 implements MigrationInterface {
    name = 'UseSnakeNaming1770567293635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_9a6f051e66982b5f0318981bcaa\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_f906a186218d26eff9044da0554\``);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` DROP FOREIGN KEY \`FK_2b713dacf2820de2abb0f9253ab\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_76d415fa60447758591a96da337\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_d58e263bdd918d5592037f109d9\``);
        await queryRunner.query(`DROP INDEX \`IDX_76d415fa60447758591a96da33\` ON \`menu_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_d58e263bdd918d5592037f109d\` ON \`menu_categories\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parentId\` \`parent_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` CHANGE \`foodTypeId\` \`food_type_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` CHANGE \`menuId\` \`menu_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD PRIMARY KEY (\`menusId\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP COLUMN \`categoriesId\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP COLUMN \`menusId\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD \`menus_id\` int NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD \`categories_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD PRIMARY KEY (\`menus_id\`, \`categories_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_c9cae857462eeeee292f5c0a4a\` ON \`menu_categories\` (\`menus_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_dd8abfd57c933046084dfe499d\` ON \`menu_categories\` (\`categories_id\`)`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_3a359440b5087c1a3587050f2be\` FOREIGN KEY (\`food_type_id\`) REFERENCES \`food_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` ADD CONSTRAINT \`FK_6d6c9c8bfc760d5c1be18e5c3c9\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_c9cae857462eeeee292f5c0a4a2\` FOREIGN KEY (\`menus_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_dd8abfd57c933046084dfe499d1\` FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_dd8abfd57c933046084dfe499d1\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_c9cae857462eeeee292f5c0a4a2\``);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` DROP FOREIGN KEY \`FK_6d6c9c8bfc760d5c1be18e5c3c9\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_3a359440b5087c1a3587050f2be\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``);
        await queryRunner.query(`DROP INDEX \`IDX_dd8abfd57c933046084dfe499d\` ON \`menu_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_c9cae857462eeeee292f5c0a4a\` ON \`menu_categories\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD PRIMARY KEY (\`menus_id\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP COLUMN \`categories_id\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP COLUMN \`menus_id\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD \`menusId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD PRIMARY KEY (\`menusId\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD \`categoriesId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD PRIMARY KEY (\`categoriesId\`, \`menusId\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` CHANGE \`menu_id\` \`menuId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` CHANGE \`food_type_id\` \`foodTypeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`parent_id\` \`parentId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_d58e263bdd918d5592037f109d\` ON \`menu_categories\` (\`menusId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_76d415fa60447758591a96da33\` ON \`menu_categories\` (\`categoriesId\`)`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_d58e263bdd918d5592037f109d9\` FOREIGN KEY (\`menusId\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_76d415fa60447758591a96da337\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` ADD CONSTRAINT \`FK_2b713dacf2820de2abb0f9253ab\` FOREIGN KEY (\`menuId\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_f906a186218d26eff9044da0554\` FOREIGN KEY (\`foodTypeId\`) REFERENCES \`food_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_9a6f051e66982b5f0318981bcaa\` FOREIGN KEY (\`parentId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
