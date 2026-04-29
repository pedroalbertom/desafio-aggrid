import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) { }

  async create(createSupplierDto: CreateSupplierDto) {
    return this.suppliersRepository.save(createSupplierDto);
  }

  findAll() {
    return this.suppliersRepository.find({
      relations: ['products'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const supplier = await this.suppliersRepository.findOneBy({ id });
    if (!supplier) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado`);
    }
    return supplier;
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id);

    const updatedSupplier = this.suppliersRepository.merge(supplier, updateSupplierDto);
    return this.suppliersRepository.save(updatedSupplier);
  }

  async remove(id: number) {
    const supplier = await this.findOne(id);

    return this.suppliersRepository.remove(supplier);
  }
}