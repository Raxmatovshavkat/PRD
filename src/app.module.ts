import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

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
        const port = 5432;
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
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, 
        };
      },
      inject: [ConfigService],
      
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
