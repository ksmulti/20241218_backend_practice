import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm"
import { User } from "@/entity/User"
import { ExerciseType } from "@/types/ExerciseType";

// 運動目標のエンティティ
@Entity()
@Index(['date', 'exerciseType'], { unique: true })
export class ExerciseGoal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column('date')
    date!: Date; // 目標の日付

    @Column({
        type: 'enum',
        enum: ExerciseType,
        nullable: true
    })
    exerciseType!: ExerciseType;

    @Column('integer')
    targetMinutes!: number; // 目標運動時間（分）
}