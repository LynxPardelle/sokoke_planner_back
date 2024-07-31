import { HydratedDocument, Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
/* Types */
import { TProjectCategory } from '../types/projectCategory.type';
import { TProjectSubCategory } from '../types/projectSubCategory.type';
import { TUser } from '@src/user/types/user.type';
@Schema()
export class ProjectCategory implements Omit<TProjectCategory, '_id'> {
  @Prop({ required: true })
  public name: string;
  @Prop({ required: true })
  public description: string;
  @Prop({
    default: [],
    schema: true,
    schemaName: 'ProjectSubCategory',
    type: [mongoose.Schema.Types.ObjectId || String],
    ref: 'ProjectSubCategory',
  })
  public subCategories: (TProjectSubCategory | string)[];
  @Prop({
    default: [],
    schema: true,
    schemaName: 'User',
    type: [mongoose.Schema.Types.ObjectId || String],
    ref: 'User',
  })
  public owners: (TUser | string)[];
  @Prop({
    default: Date.now,
  })
  public createdAt: Date;
  @Prop({
    default: Date.now,
  })
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
export const projectCategorySchema =
  SchemaFactory.createForClass(ProjectCategory);
export type ProjectCategoryDocument = HydratedDocument<ProjectCategory>;
export type ProjectCategoryModel = Model<ProjectCategory>;
