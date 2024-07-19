import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class UserCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Auth)
    user: Auth;

    @ManyToOne(() => Course)
    course: Course;

    @Column()
    enrollmentDate: Date;

    @Column({ default: true })
    isActive: boolean;
}
