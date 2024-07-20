import { HydratedDocument, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
/* Types */
import { TStatus } from '../types/status.type';
import { TRequeriment } from '../types/requeriment.type';
@Schema()
export class Requeriment implements Omit<TRequeriment, '_id'> {
  @Prop({ required: true })
  public name: string;
  @Prop({ required: true })
  public description: string;
  @Prop({
    required: true,
    schema: true,
    schemaName: 'Status',
    type: mongoose.Schema.Types.ObjectId || String,
    ref: 'Status',
  })
  public status: TStatus | string;
  @Prop({ required: true })
  public startDate: Date;
  @Prop({ required: true })
  public endDate: Date;
  @Prop({ default: Date.now })
  public createdAt: Date;
  @Prop({ default: Date.now })
  public updatedAt: Date;
}
export const requerimentSchema = SchemaFactory.createForClass(Requeriment);
export type RequerimentDocument = HydratedDocument<Requeriment>;
export type RequerimentModel = Model<Requeriment>;
