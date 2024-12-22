import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "@/entity/User";

// ボディーレコードのエンティティ
@Entity()
export class BodyRecord {
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
