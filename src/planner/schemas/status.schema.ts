import { HydratedDocument, Model } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
/* Types */
import { TStatus } from '../types/status.type';
@Schema()
export class Status implements Omit<TStatus, '_id'> {
  @Prop({ required: true })
  public name: string;
  @Prop({ required: true })
  public description: string;
  @Prop({ default: Date.now })
  public createdAt: Date;
  @Prop({ default: Date.now })
  public updatedAt: Date;
  @Prop({ default: '' })
  public bgColor: string;
  @Prop({ default: '' })
  public textColor: string;
  @Prop({ default: '' })
  public linkColor: string;
  @Prop({ default: '' })
  secondaryBgColor: string;
  @Prop({ default: '' })
  secondaryTextColor: string;
  @Prop({ default: '' })
  secondaryLinkColor: string;
  @Prop({ default: '' })
  accentColor: string;
}
export const statusSchema = SchemaFactory.createForClass(Status);
export type StatusDocument = HydratedDocument<Status>;
export type StatusModel = Model<Status>;
