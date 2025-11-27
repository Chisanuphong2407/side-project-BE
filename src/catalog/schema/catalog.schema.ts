import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @Prop({ type: Types.ObjectId, ref: 'Catalog', required: true })
  catalogName: string;

  @Prop({ required: true })
  ownerID: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
