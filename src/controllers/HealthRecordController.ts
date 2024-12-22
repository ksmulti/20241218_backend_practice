import { AppDataSource } from "@/data-source";
import { HealthRecord } from "@/entity/HealthRecord";
import { Request, Response } from "express";

// 健康記録のコントローラー
export class HealthRecordController {
    // 健康記録の一覧取得
    static async getHealthRecords(req: Request, res: Response) {
        const healthRecordRepository = AppDataSource.getRepository(HealthRecord);
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

    // 健康記録の作成
    static async createHealthRecord(req: Request, res: Response) {
        const { date, weight, bodyFatPercentage } = req.body;
        const healthRecordRepository = AppDataSource.getRepository(HealthRecord);
      
        try {   
            const record = new HealthRecord();
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