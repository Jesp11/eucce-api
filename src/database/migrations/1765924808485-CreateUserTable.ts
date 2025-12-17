import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1765924808485 implements MigrationInterface {
    name = 'CreateUserTable1765924808485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "name" character varying, "lastName" character varying, "curp" character varying, "postalCode" character varying, "role" character varying NOT NULL DEFAULT 'usuario', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_3447b7d74f1cf55aab20e68dc14" UNIQUE ("curp"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3447b7d74f1cf55aab20e68dc1" ON "user" ("curp") `);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_b73f01b784b69f0b92ba2eddce" ON "user" ("role", "isActive") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b73f01b784b69f0b92ba2eddce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3447b7d74f1cf55aab20e68dc1"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
