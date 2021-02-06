import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableTransaction1612228815348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'value',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'category',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');
    }

}
