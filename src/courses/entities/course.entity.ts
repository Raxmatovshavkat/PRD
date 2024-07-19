import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column()
    time: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'text', nullable: true })
    description: string;
}
