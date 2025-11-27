import { IsDefined, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly productname: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDefined()
  @Type(() => Number)
  @IsNotEmpty()
  readonly quantity: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly unit: string;

  @IsDefined()
  @Type(() => Number)
  @IsNotEmpty()
  readonly price: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly catalog: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly ownerID: string;
}
