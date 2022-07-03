import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAdvice1656607360267 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'advices',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
