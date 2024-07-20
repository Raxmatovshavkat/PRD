import { UserCourse } from 'src/user-courses/entities/user-course.entity';
import { UserFile } from 'src/user-files/entities/user-file.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
    name:"users"
})
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    gender: string;

    @Column({ default: 'inactive' })
    isActive: string;

    @OneToMany(() => UserCourse, userCourse => userCourse.user)
    userCourses: UserCourse[];

    @OneToMany(() => UserFile, userCourse => userCourse.user)
    userFiles: UserFile[];
}
