import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const databaseConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "20.219.157.190",
    port: 3306,
    username: "root",
    password: "4kr@Schoofi2019Software",
    database: "sakksh-dev-new",
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
}