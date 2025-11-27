/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';
import { productDocument } from './schema/product.schema';
import { Model } from 'mongoose';
import { FetchProductDto } from './dto/fetch-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<productDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);
    const data = new this.productModel(createProductDto);
    return data.save();
  }

  async findAll(uid: string): Promise<Product[]> {
    return this.productModel
      .find({ ownerID: uid })
      .populate('catalog')
      .populate('unit')
      .exec();
  }

  async findOne(id: string): Promise<Product | null> {
    const data = this.productModel.findById(id).exec();
    return data;
  }

  //not agregrate
  async search(FetchProductDto: FetchProductDto): Promise<Product[] | null> {
    console.log('search');
    const condition: any = {};

    condition.ownerID = FetchProductDto.ownerID;

    if (FetchProductDto.productname && FetchProductDto.productname.length > 0) {
      condition.productname = {
        $regex: FetchProductDto.productname,
        $options: 'i',
      };
    }

    if (FetchProductDto.catalog) {
      condition.catalog = FetchProductDto.catalog;
    }

    if (FetchProductDto.unit) {
      condition.unit = FetchProductDto.unit;
    }

    console.log(condition);
    return this.productModel
      .find(condition)
      .populate('catalog')
      .populate('unit')
      .exec();
  }

  async agSearch(FetchProductDto: FetchProductDto) {
    const condition: object[] = [];
    const sort: any = {};
    const limit: number = FetchProductDto.limit;
    const skip: number = FetchProductDto.skip;
    console.log('dto', FetchProductDto.createdAtASC);
    // console.log(skip);

    if (FetchProductDto.productname && FetchProductDto.productname.length > 0) {
      condition.push({
        productname: {
          $regex: FetchProductDto.productname,
          $options: 'i',
        },
      });
    }

    if (FetchProductDto.catalog) {
      condition.push({ catalog: FetchProductDto.catalog });
    }

    if (FetchProductDto.unit) {
      condition.push({ unit: FetchProductDto.unit });
    }

    if (FetchProductDto.favorite == true) {
      console.log(FetchProductDto.favorite);
      sort.favorite = -1;
    }

    // sort.productname = 1;
    console.log(FetchProductDto.createdAtASC);

    if (FetchProductDto.createdAtASC == true) {
      console.log('asc');
      sort.createdAt = -1;
    } else {
      console.log('desc');
      sort.createdAt = 1;
    }
    condition.push({ ownerID: FetchProductDto.ownerID });
    const pipeline = [
      {
        $match: {
          //----------------------------------------------------------
          $and: condition,
          //------------------------------------------------------------
        },
      },
      {
        $facet: {
          data: [
            {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              $sort: sort,
            },
            { $skip: skip },
            { $limit: limit },
            {
              $addFields: {
                convertCatalog: { $toObjectId: '$catalog' },
                convertUnit: { $toObjectId: '$unit' },
                createdThai: {
                  $dateToString: {
                    date: '$createdAt',
                    timezone: 'Asia/Bangkok',
                    format: 'วันที่ %d/%m/%Y เวลา %H:%M',
                  },
                },
              },
            },
            {
              $lookup: {
                from: 'catalogs',
                localField: 'convertCatalog',
                foreignField: '_id',
                as: 'catalogData',
              },
            },
            {
              $unwind: { path: '$catalogData' },
            },
            {
              $lookup: {
                from: 'units',
                localField: 'convertUnit',
                foreignField: '_id',
                as: 'unitData',
              },
            },
            {
              $unwind: { path: '$unitData' },
            },
            {
              $project: {
                productname: '$productname',
                description: '$description',
                quantity: '$quantity',
                unit: {
                  unitname: '$unitData.unitname',
                },
                price: '$price',
                catalog: {
                  catalogName: '$catalogData.catalogName',
                },
                ownerID: '$ownerID',
                createThai: '$createdThai',
                favorite: '$favorite',
              },
            },
          ],
          count: [{ $count: 'total' }],
        },
      },
    ];

    console.log(condition);
    console.log(sort);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: { data: Product[]; count: { total: number }[] }[] =
      await this.productModel.aggregate(pipeline).exec();

    const data: Product[] = result[0].data;

    const count: number = result[0].count[0].total;

    return { data, count };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const data = this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    return data;
  }

  async favorite(id: string): Promise<Product | null> {
    console.log(id);
    const data = this.productModel
      .findByIdAndUpdate(
        id,
        [
          {
            $set: {
              favorite: { $not: '$favorite' },
            },
          },
        ],
        {
          new: true,
        },
      )
      .exec();
    return data;
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
