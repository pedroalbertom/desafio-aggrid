import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Product } from '../products/entities/product.entity';
import { Price } from '../prices/entities/price.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepo: Repository<Supplier>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
        @InjectRepository(Price)
        private priceRepo: Repository<Price>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        const count = await this.supplierRepo.count();
        if (count > 0) return;

        console.log('🌱 Iniciando Seed de dados...');

        const s1 = await this.supplierRepo.save({ name: 'Tech Master', email: 'contato@tech.com' });
        const s2 = await this.supplierRepo.save({ name: 'Global Logistics', email: 'global@log.com' });

        const p1 = await this.productRepo.save({
            name: 'Mouse Wireless',
            description: 'Mouse óptico 2.4Ghz',
            supplier: s1,
        });

        const p2 = await this.productRepo.save({
            name: 'Teclado Mecânico',
            description: 'Switch Blue RGB',
            supplier: s1,
        });

        const p3 = await this.productRepo.save({
            name: 'Monitor 24"',
            description: 'Painel IPS 144hz',
            supplier: s2,
        });

        await this.priceRepo.save([
            { value: 89.90, product: p1 },
            { value: 95.00, product: p1 },
            { value: 250.00, product: p2 },
            { value: 275.00, product: p2 },
            { value: 1200.00, product: p3 },
            { value: 1300.00, product: p3 },
            { value: 1400.00, product: p3 },
            { value: 1300.00, product: p3 },
        ]);

        console.log('✅ Seed finalizado com sucesso!');
    }
}