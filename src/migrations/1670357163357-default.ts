import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670357163357 implements MigrationInterface {
    name = 'default1670357163357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "order_id" uuid NOT NULL, "product_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', "customer_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', "order_id" uuid, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_edb25d826c90ca544d544046b85" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_edb25d826c90ca544d544046b85"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_beb618ce6dae64b9d817394ebdb"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1"`);
        await queryRunner.query(`DROP TABLE "user_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
