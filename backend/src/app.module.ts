import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Supplier } from './suppliers/entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'desafio_db',
      entities: [Supplier],
      synchronize: true,
    }),
    SuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
