import { HydratedDocument, Model } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
/* Types */
import { TFeature } from '../types/feature.type';
@Schema()
export class Feature implements Omit<TFeature, '_id'> {
  @Prop({ required: true })
  public name: string;
  @Prop({ required: true })
  public description: string;
  @Prop({ default: Date.now })
  public createdAt: Date;
  @Prop({ default: Date.now })
  public updatedAt: Date;
}

export const featureSchema = SchemaFactory.createForClass(Feature);
export type FeatureDocument = HydratedDocument<Feature>;
export type FeatureModel = Model<Feature>;
