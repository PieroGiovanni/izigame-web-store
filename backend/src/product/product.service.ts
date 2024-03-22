import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/product/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    return await this.prisma.product.findUniqueOrThrow({
      where: { id },
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    // return await this.prisma.product.create({ data });
    try {
    } catch (error) {
      throw new InternalServerErrorException();
    }

    console.log(createProductDto);
  }

  async updateProduct(id: number, data: Product): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
