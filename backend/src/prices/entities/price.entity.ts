import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('prices')
export class Price {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    value!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => Product, (product) => product.prices)
    product!: Product;
}