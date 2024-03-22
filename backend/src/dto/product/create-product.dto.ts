import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

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
}
