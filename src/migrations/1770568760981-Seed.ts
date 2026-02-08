import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1770568760981 implements MigrationInterface {
    name = 'Seed1770568760981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_9a6f051e66982b5f0318981bcaa\` ON \`categories\``);
        await queryRunner.query(`DROP INDEX \`FK_f906a186218d26eff9044da0554\` ON \`menus\``);
        await queryRunner.query(`DROP INDEX \`FK_2b713dacf2820de2abb0f9253ab\` ON \`menu_variants\``);
        await queryRunner.query(`CREATE TABLE \`menu_categories\` (\`menu_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_0da59e0a8c0bf70a3a7f532c9e\` (\`menu_id\`), INDEX \`IDX_bd99dc53718848aacc73d4fcfe\` (\`category_id\`), PRIMARY KEY (\`menu_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_3a359440b5087c1a3587050f2be\` FOREIGN KEY (\`food_type_id\`) REFERENCES \`food_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` ADD CONSTRAINT \`FK_6d6c9c8bfc760d5c1be18e5c3c9\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_0da59e0a8c0bf70a3a7f532c9e0\` FOREIGN KEY (\`menu_id\`) REFERENCES \`menus\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` ADD CONSTRAINT \`FK_bd99dc53718848aacc73d4fcfe1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_bd99dc53718848aacc73d4fcfe1\``);
        await queryRunner.query(`ALTER TABLE \`menu_categories\` DROP FOREIGN KEY \`FK_0da59e0a8c0bf70a3a7f532c9e0\``);
        await queryRunner.query(`ALTER TABLE \`menu_variants\` DROP FOREIGN KEY \`FK_6d6c9c8bfc760d5c1be18e5c3c9\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_3a359440b5087c1a3587050f2be\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``);
        await queryRunner.query(`DROP INDEX \`IDX_bd99dc53718848aacc73d4fcfe\` ON \`menu_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_0da59e0a8c0bf70a3a7f532c9e\` ON \`menu_categories\``);
        await queryRunner.query(`DROP TABLE \`menu_categories\``);
        await queryRunner.query(`CREATE INDEX \`FK_2b713dacf2820de2abb0f9253ab\` ON \`menu_variants\` (\`menu_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_f906a186218d26eff9044da0554\` ON \`menus\` (\`food_type_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_9a6f051e66982b5f0318981bcaa\` ON \`categories\` (\`parent_id\`)`);
    }

}
