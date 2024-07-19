import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { File } from '../../files/entities/file.entity';

@Entity()
export class UserFile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Auth)
    user: Auth;

    @ManyToOne(() => File)
    file: File;

    @Column()
    uploadDate: Date;

    @Column({ default: true })
    isActive: boolean;
}
