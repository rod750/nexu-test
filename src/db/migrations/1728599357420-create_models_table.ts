import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateModelsTable1728599357420 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'models',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'average_price',
            type: 'float',
          },
          {
            name: 'brand_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['brand_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'brands',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE models`);
  }
}
