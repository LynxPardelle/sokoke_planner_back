import mongoose, { HydratedDocument, Model } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
/* Types */
import { TFeature } from '../types/feature.type';
import { TStatus } from '../types/status.type';
import { TTask } from '../types/task.type';
@Schema()
export class Feature implements Omit<TFeature, '_id'> {
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
  public lastCheckStatus: Date;
  @Prop({
    default: [],
    schema: true,
    schemaName: 'Task',
    type: [mongoose.Schema.Types.ObjectId || String],
    ref: 'Task',
  })
  public tasks: (TTask | string)[];
  @Prop({ default: false })
  public completed: boolean;
  @Prop({ default: Date.now })
  public createdAt: Date;
  @Prop({ default: Date.now })
  public updatedAt: Date;
}

export const featureSchema = SchemaFactory.createForClass(Feature);
export type FeatureDocument = HydratedDocument<Feature>;
export type FeatureModel = Model<Feature>;
