import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      supplier: { id: createProductDto.supplierId },
      prices: [
        { value: createProductDto.initialPrice }
      ],
    });

    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({
      relations: ['supplier', 'prices'],
      order: {
        id: 'ASC',
        prices: {
          createdAt: 'DESC'
        }
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['supplier', 'prices'],
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (updateProductDto.supplierId) {
      product.supplier = { id: updateProductDto.supplierId } as any;
    }

    if (updateProductDto.initialPrice !== undefined) {
      const newPrice = { value: updateProductDto.initialPrice };
      if (!product.prices) product.prices = [];
      product.prices.push(newPrice as any);
    }

    this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }
}