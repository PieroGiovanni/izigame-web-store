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
import { BrandService } from './brand.service';
import { Brand } from '@prisma/client';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAllBrands() {
    return this.brandService.getAllBrands();
  }

  @Get(':id')
  async getBrandById(@Param('id') id: string) {
    try {
      return await this.brandService.getBrandById(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Brand not found');
    }
  }

  @Post()
  async createBrand(@Body() data: Brand) {
    return this.brandService.createBrand(data);
  }

  @Put(':id')
  async updateBrand(@Param('id') id: string, @Body() data: Brand) {
    try {
      return await this.brandService.updateBrand(Number(id), data);
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Brand not found');
    }
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    try {
      return await this.brandService.deleteBrand(Number(id));
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Brand not found');
    }
  }
}
