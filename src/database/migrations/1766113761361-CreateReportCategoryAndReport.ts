import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReportCategoryAndReport1766113761361 implements MigrationInterface {
    name = 'CreateReportCategoryAndReport1766113761361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_fa278d337ba5e200d44ade66972" UNIQUE ("name"), CONSTRAINT "PK_43c9bfc713c0e2a3c21c4a583c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "folio" character varying NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "imagen_url" character varying, "details" text, "location_references" text, "latitude" numeric(10,8) NOT NULL, "longitude" numeric(11,8) NOT NULL, "status" character varying NOT NULL DEFAULT 'pendiente', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6f04d91d01ed55f2cb2f0aad61b" UNIQUE ("folio"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_43c9bfc713c0e2a3c21c4a583c5" FOREIGN KEY ("category_id") REFERENCES "report_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_43c9bfc713c0e2a3c21c4a583c5"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "report_category"`);
    }

}
