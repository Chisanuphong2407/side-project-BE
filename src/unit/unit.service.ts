import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Unit, UnitDocument } from './schema/unit.schema';
import { Model } from 'mongoose';

@Injectable()
export class UnitService {
  constructor(
    @InjectModel(Unit.name) private readonly unitModel: Model<UnitDocument>,
  ) {}

  create(createUnitDto: CreateUnitDto) {
    const data = new this.unitModel(createUnitDto);
    return data.save();
  }

  async findAll(): Promise<Unit[]> {
    const units = this.unitModel.find().populate('_id').exec();
    return units;
  }

  findOne(id: string) {
    const units = this.unitModel.find({ ownerID: id }).populate('_id').exec();
    return units;
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  remove(id: number) {
    return `This action removes a #${id} unit`;
  }
}
