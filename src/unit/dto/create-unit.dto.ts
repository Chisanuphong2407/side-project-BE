import { IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  unitname: string;

  @IsString()
  readonly ownerID: string;
}
