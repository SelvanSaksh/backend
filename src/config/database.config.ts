import {TypeOrmModuleOptions} from "@nestjs/typeorm";
export const databaseConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "sakksh_dev",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    

}