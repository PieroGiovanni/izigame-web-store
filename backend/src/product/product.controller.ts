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
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      return await this.productService.getProductById(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Product not found');
    }
  }

  @Post()
  async createProduct(@Body() data: Product) {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: Product) {
    try {
      return await this.productService.updateProduct(Number(id), data);
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Product not found');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productService.deleteProduct(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Product not found');
    }
  }
}
