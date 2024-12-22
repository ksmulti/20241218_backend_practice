import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "@/entity/User";
import { DiaryController } from "@/controllers/DiaryController";
import { authMiddleware } from '@/middleware/authMiddleware';
import { HealthRecordController } from '@/controllers/HealthRecordController';
import { ExerciseRecordController } from '@/controllers/ExerciseRecordController';

declare module 'express-serve-static-core' {
    interface Request {
        user: User;
    }
}

async function main() {
    try {
        await AppDataSource.initialize();

        console.log("Inserting a default user into the database...");
        const user = new User()
        user.id = 1;
        user.firstName = "Taro";
        user.lastName = "Test";
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

app.post('/api/diaries', authMiddleware, DiaryController.createDiary);
app.get('/api/diaries/:id', authMiddleware, DiaryController.getDiary);
app.get('/api/diaries', authMiddleware, DiaryController.getDiaries);
app.put('/api/diaries/:id', authMiddleware, DiaryController.updateDiary);
app.delete('/api/diaries/:id', authMiddleware, DiaryController.deleteDiary);

app.get('/api/health-records', authMiddleware, HealthRecordController.getHealthRecords);
app.post('/api/health-records', authMiddleware, HealthRecordController.createHealthRecord);

app.get('/api/exercise-records', authMiddleware, ExerciseRecordController.getExerciseRecords);
app.post('/api/exercise-records', authMiddleware, ExerciseRecordController.createExerciseRecord);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});