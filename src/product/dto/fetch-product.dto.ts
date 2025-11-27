import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FetchProductDto {
  @IsOptional()
  productname?: string;

  @IsOptional()
  unit?: string;

  @IsOptional()
  catalog?: string;

  @IsNotEmpty()
  ownerID: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  favorite?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  createdAtASC?: boolean;

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Type(() => Number)
  skip: number;
}
