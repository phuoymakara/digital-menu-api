import { MigrationInterface, QueryRunner } from "typeorm";

export class TreeCategory1771318669585 implements MigrationInterface {
    name = 'TreeCategory1771318669585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`categories_closure\` (
                \`id_ancestor\` int NOT NULL,
                \`id_descendant\` int NOT NULL,
                INDEX \`IDX_ea1e9c4eea91160dfdb4318778\` (\`id_ancestor\`),
                INDEX \`IDX_51fff5114cc41723e8ca36cf22\` (\`id_descendant\`),
                PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`categories_closure\`
            ADD CONSTRAINT \`FK_ea1e9c4eea91160dfdb4318778d\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`categories_closure\`
            ADD CONSTRAINT \`FK_51fff5114cc41723e8ca36cf227\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`categories_closure\` DROP FOREIGN KEY \`FK_51fff5114cc41723e8ca36cf227\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`categories_closure\` DROP FOREIGN KEY \`FK_ea1e9c4eea91160dfdb4318778d\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_51fff5114cc41723e8ca36cf22\` ON \`categories_closure\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ea1e9c4eea91160dfdb4318778\` ON \`categories_closure\`
        `);
        await queryRunner.query(`
            DROP TABLE \`categories_closure\`
        `);
    }

}
