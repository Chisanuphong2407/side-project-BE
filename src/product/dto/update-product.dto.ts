import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsString()
  readonly productname?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @Type(() => Number)
  readonly quantity?: number;

  @IsString()
  @IsOptional()
  readonly unit?: string;

  @Type(() => Number)
  readonly price?: number;

  @IsString()
  @IsOptional()
  readonly catalog?: string;

  @IsString()
  @IsOptional()
  readonly ownerID?: string;
}
