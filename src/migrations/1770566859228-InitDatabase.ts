import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1770566859228 implements MigrationInterface {
    name = 'InitDatabase1770566859228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`food_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_90de50496e7c5c508f0f8b168d\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`slug\` varchar(255) NOT NULL, \`parentId\` int NULL, UNIQUE INDEX \`IDX_420d9f679d41281f282f5bc7d0\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(150) NOT NULL, \`description\` text NULL, \`image\` varchar(255) NULL, \`foodTypeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_variants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`unit\` varchar(255) NULL, \`value\` varchar(255) NULL, \`menuId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_categories\` (\`menusId\` int NOT NULL, \`categoriesId\` int NOT NULL, INDEX \`IDX_d58e263bdd918d5592037f109d\` (\`menusId\`), INDEX \`IDX_76d415fa60447758591a96da33\` (\`categoriesId\`), PRIMARY KEY (\`menusId\`, \`categoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_9a6f051e66982b5f0318981bcaa\` FOREIGN KEY (\`parentId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_f906a186218d26eff9044da0554\` FOREIGN KEY (\`foodTypeId\`) REFERENCES \`food_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` ADD CONSTRAINT \`FK_2b713dacf2820de2abb0f9253ab\` FOREIGN KEY (\`menuId\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_d58e263bdd918d5592037f109d9\` FOREIGN KEY (\`menusId\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_76d415fa60447758591a96da337\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_76d415fa60447758591a96da337\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_d58e263bdd918d5592037f109d9\``);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` DROP FOREIGN KEY \`FK_2b713dacf2820de2abb0f9253ab\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_f906a186218d26eff9044da0554\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_9a6f051e66982b5f0318981bcaa\``);
        await queryRunner.query(`DROP INDEX \`IDX_76d415fa60447758591a96da33\` ON \`menu_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_d58e263bdd918d5592037f109d\` ON \`menu_categories\``);
        await queryRunner.query(`DROP TABLE \`menu_categories\``);
        await queryRunner.query(`DROP TABLE \`menu_variants\``);
        await queryRunner.query(`DROP TABLE \`menus\``);
        await queryRunner.query(`DROP INDEX \`IDX_420d9f679d41281f282f5bc7d0\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_90de50496e7c5c508f0f8b168d\` ON \`food_types\``);
        await queryRunner.query(`DROP TABLE \`food_types\``);
    }

}
