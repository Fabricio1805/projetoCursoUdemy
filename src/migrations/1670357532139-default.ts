import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670357532139 implements MigrationInterface {
    name = 'default1670357532139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "orders_products" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "orders_products" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "user_tokens" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "orders_products" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "orders_products" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" SET DEFAULT '2022-12-06 20:11:14.446572'`);
    }

}
