import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Price } from '../../prices/entities/price.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Supplier, (supplier) => supplier.products, { onDelete: 'CASCADE' })
  supplier!: Supplier;

  @OneToMany(() => Price, (price) => price.product)
  prices!: Price[];
}