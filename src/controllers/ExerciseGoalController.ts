import { AppDataSource } from "@/data-source";
import { ExerciseGoal } from "@/entity/ExerciseGoal";
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
            return;
        } catch (error) {
            res.status(400).json({ error: 'Invalid goal data' });
        }
    }
}