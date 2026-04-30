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
        const s3 = await this.supplierRepo.save({ name: 'Byte Central', email: 'vendas@bytecentral.com.br' });
        const s4 = await this.supplierRepo.save({ name: 'Vision Tech Imports', email: 'suporte@visiontech.com' });
        const s5 = await this.supplierRepo.save({ name: 'Nordeste Hardware', email: 'comercial@nordestehw.com.br' });

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

        const p4 = await this.productRepo.save({
            name: 'Headset Gamer 7.1',
            description: 'Som surround, cancelamento de ruído',
            supplier: s4,
        });

        const p5 = await this.productRepo.save({
            name: 'Cadeira Gamer Pro',
            description: 'Ergonômica, inclinação 180º',
            supplier: s5,
        });

        const p6 = await this.productRepo.save({
            name: 'Webcam 1080p',
            description: 'Full HD, foco automático',
            supplier: s3,
        });

        const p7 = await this.productRepo.save({
            name: 'Mousepad XL',
            description: 'Superfície speed, bordas costuradas',
            supplier: s2,
        });

        const p8 = await this.productRepo.save({
            name: 'SSD NVMe 1TB',
            description: 'Leitura 3500MB/s, Gen3 x4',
            supplier: s1,
        });

        const p9 = await this.productRepo.save({
            name: 'Memória RAM 16GB',
            description: 'DDR4 3200MHz RGB',
            supplier: s3,
        });

        const p10 = await this.productRepo.save({
            name: 'Gabinete Mid Tower',
            description: 'Lateral vidro temperado, 3 fans RGB',
            supplier: s5,
        });

        await this.priceRepo.save([
            // p1: Mouse Wireless
            { value: 80.00, product: p1, createdAt: new Date('2026-04-01') },
            { value: 85.00, product: p1, createdAt: new Date('2026-04-10') },
            { value: 89.90, product: p1, createdAt: new Date('2026-04-15') },
            { value: 95.00, product: p1, createdAt: new Date('2026-04-20') },
            { value: 92.00, product: p1, createdAt: new Date('2026-04-29') },

            // p2: Teclado Mecânico
            { value: 240.00, product: p2, createdAt: new Date('2026-04-01') },
            { value: 250.00, product: p2, createdAt: new Date('2026-04-10') },
            { value: 265.00, product: p2, createdAt: new Date('2026-04-15') },
            { value: 275.00, product: p2, createdAt: new Date('2026-04-20') },
            { value: 275.00, product: p2, createdAt: new Date('2026-04-29') },

            // p3: Monitor 24"
            { value: 1100.00, product: p3, createdAt: new Date('2026-03-25') },
            { value: 1200.00, product: p3, createdAt: new Date('2026-04-01') },
            { value: 1350.00, product: p3, createdAt: new Date('2026-04-10') },
            { value: 1400.00, product: p3, createdAt: new Date('2026-04-20') },
            { value: 1300.00, product: p3, createdAt: new Date('2026-04-29') },

            // p4: Headset Gamer 7.1
            { value: 380.00, product: p4, createdAt: new Date('2026-04-05') },
            { value: 350.00, product: p4, createdAt: new Date('2026-04-15') },
            { value: 320.00, product: p4, createdAt: new Date('2026-04-20') },
            { value: 299.90, product: p4, createdAt: new Date('2026-04-25') },
            { value: 310.00, product: p4, createdAt: new Date('2026-04-29') },

            // p5: Cadeira Gamer Pro
            { value: 850.00, product: p5, createdAt: new Date('2026-04-01') },
            { value: 900.00, product: p5, createdAt: new Date('2026-04-07') },
            { value: 950.00, product: p5, createdAt: new Date('2026-04-14') },
            { value: 1050.00, product: p5, createdAt: new Date('2026-04-21') },
            { value: 1100.00, product: p5, createdAt: new Date('2026-04-29') },

            // p6: Webcam 1080p
            { value: 150.00, product: p6, createdAt: new Date('2026-04-01') },
            { value: 165.00, product: p6, createdAt: new Date('2026-04-08') },
            { value: 180.00, product: p6, createdAt: new Date('2026-04-15') },
            { value: 175.00, product: p6, createdAt: new Date('2026-04-22') },
            { value: 195.00, product: p6, createdAt: new Date('2026-04-29') },

            // p7: Mousepad XL
            { value: 35.00, product: p7, createdAt: new Date('2026-04-01') },
            { value: 40.00, product: p7, createdAt: new Date('2026-04-10') },
            { value: 45.00, product: p7, createdAt: new Date('2026-04-15') },
            { value: 55.00, product: p7, createdAt: new Date('2026-04-20') },
            { value: 59.90, product: p7, createdAt: new Date('2026-04-29') },

            // p8: SSD NVMe 1TB
            { value: 500.00, product: p8, createdAt: new Date('2026-04-01') },
            { value: 480.00, product: p8, createdAt: new Date('2026-04-08') },
            { value: 450.00, product: p8, createdAt: new Date('2026-04-15') },
            { value: 420.00, product: p8, createdAt: new Date('2026-04-22') },
            { value: 399.00, product: p8, createdAt: new Date('2026-04-29') },

            // p9: Memória RAM 16GB
            { value: 290.00, product: p9, createdAt: new Date('2026-04-01') },
            { value: 310.00, product: p9, createdAt: new Date('2026-04-10') },
            { value: 320.00, product: p9, createdAt: new Date('2026-04-18') },
            { value: 340.00, product: p9, createdAt: new Date('2026-04-25') },
            { value: 350.00, product: p9, createdAt: new Date('2026-04-29') },

            // p10: Gabinete Mid Tower
            { value: 350.00, product: p10, createdAt: new Date('2026-04-01') },
            { value: 380.00, product: p10, createdAt: new Date('2026-04-08') },
            { value: 400.00, product: p10, createdAt: new Date('2026-04-15') },
            { value: 450.00, product: p10, createdAt: new Date('2026-04-22') },
            { value: 480.00, product: p10, createdAt: new Date('2026-04-29') },
        ]);

        console.log('✅ Seed finalizado com sucesso!');
    }
}