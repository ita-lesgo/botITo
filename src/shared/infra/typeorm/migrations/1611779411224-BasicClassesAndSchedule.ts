import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasicClassesAndSchedule1611779411224
  implements MigrationInterface {
  public name = 'BasicClassesAndSchedule1611779411224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "day" ("id" varchar PRIMARY KEY NOT NULL, "class_id" varchar NOT NULL, "week_day" integer NOT NULL)'
    );
    await queryRunner.query(
      'CREATE TABLE "classes" ("id" varchar PRIMARY KEY NOT NULL, "level" integer NOT NULL, "role_id" varchar NOT NULL, CONSTRAINT "UQ_2edf3824b76ea4c7df93b8859e9" UNIQUE ("role_id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "teachers" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "gender" varchar NOT NULL)'
    );
    await queryRunner.query(
      'CREATE TABLE "lesson" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "schedule" varchar NOT NULL, "teacher_id" varchar NOT NULL)'
    );
    await queryRunner.query(
      'CREATE TABLE "temporary_day" ("id" varchar PRIMARY KEY NOT NULL, "class_id" varchar NOT NULL, "week_day" integer NOT NULL, CONSTRAINT "FK_8b12ba1e075b8e960bdb1a8a96d" FOREIGN KEY ("class_id") REFERENCES "classes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    );
    await queryRunner.query(
      'INSERT INTO "temporary_day"("id", "class_id", "week_day") SELECT "id", "class_id", "week_day" FROM "day"'
    );
    await queryRunner.query('DROP TABLE "day"');
    await queryRunner.query('ALTER TABLE "temporary_day" RENAME TO "day"');
    await queryRunner.query(
      'CREATE TABLE "temporary_lesson" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "schedule" varchar NOT NULL, "teacher_id" varchar NOT NULL, CONSTRAINT "FK_cfe1b52c46b3d6f61ad5be1663c" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)'
    );
    await queryRunner.query(
      'INSERT INTO "temporary_lesson"("id", "name", "schedule", "teacher_id") SELECT "id", "name", "schedule", "teacher_id" FROM "lesson"'
    );
    await queryRunner.query('DROP TABLE "lesson"');
    await queryRunner.query(
      'ALTER TABLE "temporary_lesson" RENAME TO "lesson"'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "lesson" RENAME TO "temporary_lesson"'
    );
    await queryRunner.query(
      'CREATE TABLE "lesson" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "schedule" varchar NOT NULL, "teacher_id" varchar NOT NULL)'
    );
    await queryRunner.query(
      'INSERT INTO "lesson"("id", "name", "schedule", "teacher_id") SELECT "id", "name", "schedule", "teacher_id" FROM "temporary_lesson"'
    );
    await queryRunner.query('DROP TABLE "temporary_lesson"');
    await queryRunner.query('ALTER TABLE "day" RENAME TO "temporary_day"');
    await queryRunner.query(
      'CREATE TABLE "day" ("id" varchar PRIMARY KEY NOT NULL, "class_id" varchar NOT NULL, "week_day" integer NOT NULL)'
    );
    await queryRunner.query(
      'INSERT INTO "day"("id", "class_id", "week_day") SELECT "id", "class_id", "week_day" FROM "temporary_day"'
    );
    await queryRunner.query('DROP TABLE "temporary_day"');
    await queryRunner.query('DROP TABLE "lesson"');
    await queryRunner.query('DROP TABLE "teachers"');
    await queryRunner.query('DROP TABLE "classes"');
    await queryRunner.query('DROP TABLE "day"');
  }
}
