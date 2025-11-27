import { IsString } from 'class-validator';

export class UpdateUnitDto {
  @IsString()
  unitname: string;

  @IsString()
  readonly ownerID: string;
}
