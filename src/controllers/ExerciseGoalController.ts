import { AppDataSource } from "@/data-source";
import { ExerciseGoal } from "@/entity/ExerciseGoal";
import { ExerciseRecord } from "@/entity/ExerciseRecord";
import { Request, Response } from "express";

export class ExerciseGoalController {
    // 運動目標の作成
    static async createGoal(req: Request, res: Response) {
        const { exerciseType, targetMinutes, date} = req.body;
        const exerciseGoalRepository = AppDataSource.getRepository(ExerciseGoal);
    
        try {
            const goal = new ExerciseGoal();
            goal.user = req.user;
            goal.exerciseType = exerciseType;
            goal.date = new Date(date);
            goal.targetMinutes = Number(targetMinutes);

            await exerciseGoalRepository.save(goal);
            res.status(201).json(goal);
        } catch (error) {
            res.status(400).json({ error: 'Invalid goal data' });
        }
    }

    // 運動目標の達成率取得
    static async getCompletionRates(req: Request, res: Response) {
        const { date } = req.query;
        const exerciseGoalRepository = AppDataSource.getRepository(ExerciseGoal);
        const exerciseRecordRepository = AppDataSource.getRepository(ExerciseRecord);

        try {
            const goals = await exerciseGoalRepository.find({
                where: { user: req.user, date: new Date(date as string) },
                order: { date: 'ASC' }
            });

            const records = await exerciseRecordRepository.find({
                where: { user: req.user, date: new Date(date as string) },
                order: { date: 'ASC' }
            });

            const dailyCompletionRates: { [key: string]: any } = {};

            goals.forEach(goal => {
                const dateStr = goal.date.toString();                
                if (!dailyCompletionRates[dateStr]) {
                    dailyCompletionRates[dateStr] = {
                        date: dateStr,
                        goals: [],
                        completedGoals: 0,
                        totalGoals: 0,
                        completionRate: 0
                    };
                }
                dailyCompletionRates[dateStr].goals.push(goal);
                dailyCompletionRates[dateStr].totalGoals++;
            });

            records.forEach(record => {
                const dateStr = record.date.toString();
                if (dailyCompletionRates[dateStr]) {
                    dailyCompletionRates[dateStr].goals.forEach((goal: ExerciseGoal) => {
                        if (goal.exerciseType === record.exerciseType && record.duration >= goal.targetMinutes) {
                            dailyCompletionRates[dateStr].completedGoals++;
                        }
                    });
                }
            });

            Object.keys(dailyCompletionRates).forEach(dateStr => {
                const dayData = dailyCompletionRates[dateStr];
                dayData.completionRate = dayData.totalGoals > 0
                    ? (dayData.completedGoals / dayData.totalGoals) * 100
                    : 100;
            });

            res.json(Object.values(dailyCompletionRates));
        } catch (error) {
            res.status(500).json({ error: 'Failed to calculate completion rates' });
        }
    }
}