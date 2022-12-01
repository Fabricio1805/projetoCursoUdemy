import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669927620046 implements MigrationInterface {
    name = 'default1669927620046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
