import { AppDataSource } from "@/data-source";
import { Diary } from "@/entity/Diary";
import { User } from "@/entity/User";
import { Request, Response } from "express";

export class DiaryController {
    // 日記の作成
    static async createDiary(req: Request, res: Response) {
        const { user_id, content } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const user = await userRepository.findOneBy({id: user_id});
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const diary = new Diary();
            diary.user = user;
            diary.content = content;
            diary.createdAt = new Date();
            diary.updatedAt = new Date();
            console.log(diary);
            await diaryRepository.save(diary);

            res.status(201).json(diary);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create diary' });
        }
    }

    // 特定の日記の取得
    static async getDiary(req: Request, res: Response) {
        const { id } = req.params;
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const diary = await diaryRepository.findOneBy({
                id: Number(id),
            });

            if (!diary) {
                res.status(404).json({ error: 'Diary not found' });
                return;
            }

            res.json(diary);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch diary' });
        }
    }
}
