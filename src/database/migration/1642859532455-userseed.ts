import {MigrationInterface, QueryRunner} from "typeorm";
import bcryptjs from "bcryptjs";
import {config} from "../../common/config";

export class userseed1642859532455 implements MigrationInterface {
    name = 'userseed1642859532455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = bcryptjs.hashSync("admin", Number(config.AUTH_SALT_ROUNDS));
        await queryRunner.query(`INSERT INTO public."user" (name, login, password) VALUES ('admin', 'admin', '${passwordHash}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public."user" WHERE login = 'admin' AND name = 'admin'`);
    }
}
