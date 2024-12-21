import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "@/entity/User"
import { Diary } from "@/entity/Diary"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Diary],
    migrations: [],
    subscribers: [],
})
