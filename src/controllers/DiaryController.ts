import { AppDataSource } from "@/data-source";
import { Diary } from "@/entity/Diary";
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
            const diary = await diaryRepository.findOne({ where: { id: Number(id), user: req.user } });

            if (!diary) {
                res.status(404).json({ error: 'Diary not found' });
                return;
            }

            res.json(diary);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch diary' });
        }
    }

    // 日記一覧の取得
    static async getDiaries(req: Request, res: Response) {
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const diaries = await diaryRepository.find({ where: { user: req.user }, order: { createdAt: "DESC" } });

            if (!diaries) {
                res.status(404).json({ error: 'Diary not found' });
                return;
            }

            res.json(diaries);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch diary' });
        }
    }

    // 日記の更新
    static async updateDiary(req: Request, res: Response) {
        const { id } = req.params;
        const { content } = req.body;
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const diary = await diaryRepository.findOne({
                where: { id: Number(id), user: req.user },
            });

            if (!diary) {
                res.status(404).json({ error: 'Diary not found' });
                return;
            }

            diary.content = content;
            diary.updatedAt = new Date();

            await diaryRepository.save(diary);

            res.json(diary);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update diary' });
        }
    }

    // 日記の削除
    static async deleteDiary(req: Request, res: Response) {
        const { id } = req.params;
        const diaryRepository = AppDataSource.getRepository(Diary);

        try {
            const diary = await diaryRepository.findOne({
                where: { id: Number(id), user: req.user }
            });

            if (!diary) {
                res.status(404).json({ error: 'Diary not found' });
                return;
            }

            await diaryRepository.remove(diary);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete diary' });
        }
    }
}
