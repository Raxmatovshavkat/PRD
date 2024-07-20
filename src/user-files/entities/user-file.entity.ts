import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity';
import { File } from '../../files/entities/file.entity';

@Entity()
export class UserFile {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Auth, auth => auth.userFiles)
    user: Auth;

    @ManyToOne(() => File, file => file.userFiles)
    file: File;

    @Column()
    uploadDate: Date;

    @Column({ default: true })
    isActive: boolean;
}
