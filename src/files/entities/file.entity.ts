import { UserFile } from 'src/user-files/entities/user-file.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    mimetype: string;

    @OneToMany(() => UserFile, userFile => userFile.file)
    userFiles: UserFile[];
}
