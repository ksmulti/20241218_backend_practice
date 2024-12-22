import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "@/entity/User"
import { ExerciseType } from "@/types/ExerciseType";

// 運動目標のエンティティ
@Entity()
export class ExerciseGoal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column({
        type: 'enum',
        enum: ExerciseType,
        nullable: true
    })
    exerciseType!: ExerciseType;

    @Column('date', { unique: true })
    date!: Date; // 目標の日付

    @Column('integer')
    targetMinutes!: number; // 目標運動時間（分）
}