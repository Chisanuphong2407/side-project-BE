import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Catalog, CatalogDocument } from './schema/catalog.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name)
    private readonly catalogModel: Model<CatalogDocument>,
  ) {}

  async create(createCatalogDto: CreateCatalogDto) {
    const data = new this.catalogModel(createCatalogDto);
    return data.save();
  }

  async findAll(): Promise<Catalog[]> {
    const catalogs = this.catalogModel.find().populate('_id').exec();
    return catalogs;
  }

  findOne(id: string) {
    const catalogs = this.catalogModel
      .find({ ownerID: id })
      .populate('_id')
      .exec();
    return catalogs;
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }
}
