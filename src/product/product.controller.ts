import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FetchProductDto } from './dto/fetch-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return this.productService.create(createProductDto);
  }

  @Get('get')
  findOne(@Query() id: object) {
    const productID = { ...id };
    return this.productService.findOne(productID);
  }

  @Get('search')
  search(@Query() query: FetchProductDto) {
    return this.productService.agSearch(query);
  }

  @Get('all/:uid')
  findAll(@Param('uid') uid: string) {
    return this.productService.findAll(uid);
  }

  @Patch('favorite/:id')
  favorite(@Param('id') id: string) {
    return this.productService.favorite(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
