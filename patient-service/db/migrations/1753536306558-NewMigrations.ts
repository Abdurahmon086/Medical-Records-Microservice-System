import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1753536306558 implements MigrationInterface {
    name = 'NewMigrations1753536306558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "visit_date" TIMESTAMP NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "patientId" integer, CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "visitId" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_0f994812406b1deb208e79c0b30" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_89125bdbfb713ab1531433a0951" FOREIGN KEY ("visitId") REFERENCES "visit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_89125bdbfb713ab1531433a0951"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_0f994812406b1deb208e79c0b30"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`DROP TABLE "visit"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
