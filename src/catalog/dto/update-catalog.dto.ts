import { IsString, IsOptional } from 'class-validator';

export class UpdateCatalogDto {
  @IsOptional()
  @IsString()
  readonly catalogName?: string;

  @IsOptional()
  @IsString()
  readonly ownerID?: string;
}
