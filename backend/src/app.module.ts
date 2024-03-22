import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductModule, BrandModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
