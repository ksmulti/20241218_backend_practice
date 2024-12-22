import { AppDataSource } from "@/data-source";
import { Diary } from "@/entity/Diary";
import { User } from "@/entity/User";
import { Request, Response } from "express";

export class DiaryController {
    // 日記の作成
    static async createDiary(req: Request, res: Response) {
        const { content } = req.body;
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const diary = new Diary();
            diary.user = req.user!;
            diary.content = content;
            diary.createdAt = new Date();
            diary.updatedAt = new Date();
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
            const diary = await diaryRepository.findOne({ where: { id: 1, user: {id: req.user.id} } });

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
