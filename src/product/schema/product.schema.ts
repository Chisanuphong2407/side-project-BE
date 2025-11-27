import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import moment from 'moment-timezone';

export type productDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  productname: string;

  @Prop()
  description: string;

  @Prop()
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unit: Types.ObjectId;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Catalog', required: true })
  catalog: Types.ObjectId;

  @Prop()
  ownerID: string;

  createdAt?: Date;
  updatedAt?: Date;

  createThai?: string;
  // get createAtThai(): string {
  //   // if (!this.createdAt) return 'not found';
  //   return moment(this.createdAt)
  //     .tz('Asia/Bangkok')
  //     .format('DD/mm/YYYY HH:MM:ss');
  // }
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('createThai').get(function (this: productDocument) {
  if (!this.createdAt) return 'not found';
  return moment(this.createdAt)
    .tz('Asia/Bangkok')
    .format(' วันที่ DD/MM/YYYY เวลา HH:mm');
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
