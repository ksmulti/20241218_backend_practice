import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "@/entity/User";

@Entity()
export class HealthRecord {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column('date', { unique: true })
    date!: Date;

    // 体重
    @Column('float')
    weight!: number;

    // 体脂肪率
    @Column('float')
    bodyFatPercentage!: number;
}
