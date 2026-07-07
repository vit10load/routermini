import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehiclesAndLinkRoutes1720000000000 implements MigrationInterface
{
  name = 'CreateVehiclesAndLinkRoutes1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vehicles" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "plate" character varying NOT NULL,
        "brand" character varying NOT NULL,
        "model" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_vehicles_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_vehicles_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_vehicles_userId"
      ON "vehicles" ("userId")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_vehicles_plate"
      ON "vehicles" ("plate")
    `);

    await queryRunner.query(`
      ALTER TABLE "routes"
      ADD COLUMN IF NOT EXISTS "vehicleId" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE "routes"
      ADD CONSTRAINT "FK_routes_vehicle"
      FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id")
      ON DELETE SET NULL
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_routes_vehicleId"
      ON "routes" ("vehicleId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_routes_vehicleId"`);
    await queryRunner.query(`ALTER TABLE "routes" DROP CONSTRAINT IF EXISTS "FK_routes_vehicle"`);
    await queryRunner.query(`ALTER TABLE "routes" DROP COLUMN IF EXISTS "vehicleId"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_vehicles_plate"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_vehicles_userId"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vehicles"`);
  }
}