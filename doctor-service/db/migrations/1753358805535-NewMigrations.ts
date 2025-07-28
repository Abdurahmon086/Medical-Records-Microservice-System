import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1753358805535 implements MigrationInterface {
    name = 'NewMigrations1753358805535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE ("email"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "doctor"`);
    }

}
