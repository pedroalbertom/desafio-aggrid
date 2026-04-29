import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PricesModule } from './prices/prices.module';
import { ProductsModule } from './products/products.module';
import { Supplier } from './suppliers/entities/supplier.entity';
import { Price } from './prices/entities/price.entity';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'desafio_db',
      entities: [Supplier, Price, Product],
      synchronize: true,
    }),
    SuppliersModule,
    PricesModule,
    ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
