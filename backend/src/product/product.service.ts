import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product, ProductImage, ProductItem } from '@prisma/client';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { AddProductVariantDto } from '../dto/product/add-prodduct-variant.dto';

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

  async createProduct(createProductDto: CreateProductDto): Promise<{
    product: Product;
    productItem: ProductItem;
    productImage: ProductImage;
  }> {
    const {
      name,
      brandId,
      categoryId,
      colorId,
      sizeId,
      originalPrice,
      salePrice,
      tags,
      description,
      isFeatured,
      imageUrl,
    } = createProductDto;
    try {
      return await this.prisma.$transaction(async (tx) => {
        const newProduct = await tx.product.create({
          data: {
            name,
            description,
            brandId,
            categoryId,
            tags,
          },
        });

        const newProductItem = await tx.productItem.create({
          data: {
            productId: newProduct.id,
            originalPrice,
            salePrice: salePrice ?? originalPrice,
            colorId,
            sizeId,
            isFeatured,
          },
        });

        const newProductImage = await tx.productImage.create({
          data: {
            url: imageUrl,
            productItemId: newProductItem.id,
          },
        });
        return {
          product: newProduct,
          productItem: newProductItem,
          productImage: newProductImage,
        };
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addProductVariant(
    addProductVariantDto: AddProductVariantDto,
  ): Promise<ProductItem> {
    const { productId, colorId, sizeId, originalPrice, isFeatured, salePrice } =
      addProductVariantDto;
    try {
      return await this.prisma.productItem.create({
        data: {
          productId,
          colorId,
          sizeId,
          originalPrice,
          isFeatured,
          salePrice,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(id: number, data: Product): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}
