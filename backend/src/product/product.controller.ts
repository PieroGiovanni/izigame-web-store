import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { AddProductVariantDto } from '../dto/product/add-prodduct-variant.dto';
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
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Post()
  async addProductVariant(@Body() addProductVariantDto: AddProductVariantDto) {
    return await this.productService.addProductVariant(addProductVariantDto);
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
