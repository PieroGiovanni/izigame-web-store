import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

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

  async createProduct(data: Product): Promise<Product> {
    return await this.prisma.product.create({ data });
  }

  async updateProduct(id: number, data: Product): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
