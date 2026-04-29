import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private pricesRepository: Repository<Price>,
  ) { }

  create(createPriceDto: CreatePriceDto) {
    const newPrice = this.pricesRepository.create({
      value: createPriceDto.value,
      product: { id: createPriceDto.productId },
    });

    return this.pricesRepository.save(newPrice);
  }

  findAll() {
    return this.pricesRepository.find({
      relations: ['product'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const price = await this.pricesRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!price) {
      throw new NotFoundException(`Preço com ID ${id} não encontrado`);
    }
    return price;
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const price = await this.findOne(id);

    if (updatePriceDto.productId) {
      price.product = { id: updatePriceDto.productId } as any;
    }

    this.pricesRepository.merge(price, updatePriceDto);
    return this.pricesRepository.save(price);
  }

  async remove(id: number) {
    const price = await this.findOne(id);
    return this.pricesRepository.remove(price);
  }
}