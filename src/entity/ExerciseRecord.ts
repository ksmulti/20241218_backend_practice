import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "@/entity/User"

// 運動の種類を定義する列挙型
enum ExerciseType {
    WALKING = 'walking',
    RUNNING = 'running',
    TRAINING = 'training',
    SWIMMING = 'swimming',
    OTHER = 'other'
}
  
// 運動記録のエンティティ
@Entity()
export class ExerciseRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column({
        type: 'enum',
        enum: ExerciseType,
        default: ExerciseType.OTHER
    })
    exerciseType!: ExerciseType;

    @Column('date', { unique: true })
    date!: Date;

    @Column('integer')
    duration!: number; // 分単位での運動時間
}