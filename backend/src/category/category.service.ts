import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
  }

  async createCategory(data: Category): Promise<Category> {
    return await this.prisma.category.create({ data });
  }

  async updateCategory(id: number, data: Category): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: number): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }
}
