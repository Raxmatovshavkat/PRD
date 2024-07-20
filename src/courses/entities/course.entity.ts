import { UserCourse } from 'src/user-courses/entities/user-course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

    @OneToMany(() => UserCourse, userCourse => userCourse.course)
    userCourses: UserCourse[];
}
