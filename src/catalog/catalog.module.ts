import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Catalog, CatalogSchema } from './schema/catalog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Catalog.name,
        schema: CatalogSchema,
      },
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
