import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753712572687 implements MigrationInterface {
    name = 'InitialMigration1753712572687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "dob" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "doctor_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "visit" ADD "patient_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ADD "visit_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "text" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" ALTER COLUMN "text" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "visit_id"`);
        await queryRunner.query(`ALTER TABLE "visit" DROP COLUMN "patient_id"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "doctor_id"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "patient" ADD "age" integer NOT NULL`);
    }

}
