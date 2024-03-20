import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    try {
      return await this.categoryService.getCategoryById(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Category not found');
    }
  }

  @Post()
  async createCategory(@Body() data: Category) {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() data: Category) {
    try {
      return await this.categoryService.updateCategory(Number(id), data);
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Category not found');
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.categoryService.deleteCategory(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Category not found');
    }
  }
}
