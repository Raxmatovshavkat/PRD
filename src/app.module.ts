import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './auth/entities/auth.entity';
import { Course } from './courses/entities/course.entity';
import { UserCourse } from './user-courses/entities/user-course.entity';
import { UserFile } from './user-files/entities/user-file.entity';
import { File } from './files/entities/file.entity'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const port = configService.get<number>('DATABASE_PORT_DB');
        const username = configService.get<string>('DATABASE_USERNAME');
        const password = configService.get<string>('DATABASE_PASSWORD');
        const database = configService.get<string>('DATABASE_DATABASE');

        console.log('TypeORM Configuration:');
        console.log(`Host: ${host}`);
        console.log(`Port: ${port}`);
        console.log(`Username: ${username}`);
        console.log(`Database: ${database}`);

        return {
          type: 'postgres',
          host: host,
          port: port,
          username: username,
          password: password,
          database: database,
          entities: [Auth, Course, File, UserFile, UserCourse],
          autoLoadEntities: true,
          // synchronize: true, // Uncomment if needed
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
