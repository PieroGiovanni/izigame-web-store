import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brand } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getAllBrands(): Promise<Brand[]> {
    return await this.prisma.brand.findMany();
  }

  async getBrandById(id: number): Promise<Brand> {
    return await this.prisma.brand.findUniqueOrThrow({
      where: { id },
    });
  }

  async createBrand(data: Brand): Promise<Brand> {
    return await this.prisma.brand.create({ data });
  }

  async updateBrand(id: number, data: Brand): Promise<Brand> {
    return await this.prisma.brand.update({ where: { id }, data });
  }

  async deleteBrand(id: number): Promise<Brand> {
    return await this.prisma.brand.delete({ where: { id } });
  }
}
