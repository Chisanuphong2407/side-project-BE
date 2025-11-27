import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema()
export class Unit {
  @Prop({ type: Types.ObjectId, ref: 'Unit', required: true })
  unitname: string;

  @Prop({ required: true })
  ownerID: string;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
