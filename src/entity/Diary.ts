import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "@/entity/User"

// 日記のエンティティ
@Entity()
export class Diary {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column('text')
    content!: string;

    @Column('timestamp with time zone')
    createdAt!: Date;

    @Column('timestamp with time zone')
    updatedAt!: Date;
}
