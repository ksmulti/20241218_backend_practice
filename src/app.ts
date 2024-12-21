import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "@/entity/User";
import { DiaryController } from "@/controllers/DiaryController";

async function main() {
    try {
        await AppDataSource.initialize();

        console.log("Inserting a default user into the database...");
        const user = new User()
        user.id = 1;
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await AppDataSource.manager.save(user);
        console.log("Saved a new user with id: " + user.id);

        console.log("Loading users from the database...");
        const users = await AppDataSource.manager.find(User);
        console.log("Loaded users: ", users);
    } catch (error) {
        console.log(error);
    }
}

main();


const app: express.Express = express();
const port = 3000;
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});

app.post('/api/diaries', DiaryController.createDiary);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});