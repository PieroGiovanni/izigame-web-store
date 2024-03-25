import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AddProductVariantDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  colorId: number;

  @IsNotEmpty()
  @IsNumber()
  sizeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  originalPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
