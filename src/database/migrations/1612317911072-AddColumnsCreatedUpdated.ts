import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsCreatedUpdated1612317911072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumns('categories', [
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()'
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()'
            })
        ]);

        await queryRunner.addColumns('transactions', [
            new TableColumn({
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'now()'
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'now()'
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('categories', 'created_at');
        await queryRunner.dropColumn('categories', 'updated_at');
        await queryRunner.dropColumn('transactions', 'created_at');
        await queryRunner.dropColumn('transactions', 'updated_at');
    }

}
