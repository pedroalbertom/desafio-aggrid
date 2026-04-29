import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    email!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Product, (product) => product.supplier)
    products!: Product[];
}