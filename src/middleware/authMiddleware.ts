import { AppDataSource } from "@/data-source";
import { User } from "@/entity/User";
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization?.split(' ')[1];
    
    try {
        // JWT verification logic would go here
        // if (!token) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }
      
        // ログインしているユーザーがid:1のユーザーであると仮定
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: 1 } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};