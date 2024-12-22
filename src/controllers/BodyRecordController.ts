import { AppDataSource } from "@/data-source";
import { BodyRecord } from "@/entity/BodyRecord";
import { Request, Response } from "express";

// ボディーレコードのコントローラー
export class BodyRecordController {
    // ボディーレコードの一覧取得
    static async getBodyRecords(req: Request, res: Response) {
        const healthRecordRepository = AppDataSource.getRepository(BodyRecord);
        try {
            const records = await healthRecordRepository.find({
                where: { user: req.user },
                order: { date: 'DESC' }
            });
            
            res.json(records);
        } catch (error) {
            res.status(500).json({ error: 'Could not fetch health records' });
        }
    }

    // ボディーレコードの作成
    static async createBodyRecord(req: Request, res: Response) {
        const { date, weight, bodyFatPercentage } = req.body;
        const healthRecordRepository = AppDataSource.getRepository(BodyRecord);
      
        try {   
            const record = new BodyRecord();
            record.user = req.user;
            record.date = new Date(date);
            record.weight = weight;
            record.bodyFatPercentage = bodyFatPercentage;
            console.dir(record);

            await healthRecordRepository.save(record);
            
            res.status(201).json(record);
        } catch (error) {
            res.status(400).json({ error: 'Invalid health record data' });
        }
    }
}