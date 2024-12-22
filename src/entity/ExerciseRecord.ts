import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm"
import { User } from "@/entity/User"
import { ExerciseType } from "@/types/ExerciseType";
  
// 運動記録のエンティティ
@Entity()
@Index(['date', 'exerciseType'], { unique: true })
export class ExerciseRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;
    
    @Column('date')
    date!: Date;

    @Column({
        type: 'enum',
        enum: ExerciseType,
        default: ExerciseType.OTHER
    })
    exerciseType!: ExerciseType;

    @Column('integer')
    duration!: number; // 分単位での運動時間
}