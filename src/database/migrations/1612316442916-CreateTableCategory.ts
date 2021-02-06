import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateTableCategory1612316442916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'categories',
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
                }
            ]
        }));

        await queryRunner.changeColumn('transactions', 'category', new TableColumn({
            name: 'category_id',
            type: 'uuid'
        }));

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: 'fk_transaction_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('transactions', 'fk_transaction_category');
        await queryRunner.changeColumn('transactions', 'category_id', new TableColumn({
            name: 'category',
            type: 'varchar'
        }));
        await queryRunner.dropTable('categories');
    }

}
