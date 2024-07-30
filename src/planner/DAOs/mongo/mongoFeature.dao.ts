import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
/* Types */
import { TFeatureDAO } from '@src/planner/types/daoPlanner.type';
import { TFeature, asTFeature } from '@src/planner/types/feature.type';
import { TSearch } from '@src/shared/types/search.type';
/* DTOs */
import { CreateFeatureDTO } from '@src/planner/DTOs/createFeature.dto';
import { UpdateFeatureDTO } from '@src/planner/DTOs/updateFeature.dto';
/* Schemas */
import {
  FeatureModel,
  FeatureDocument,
} from '@src/planner/schemas/feature.schema';
@Injectable()
export class MongoDBFeatureDAO implements TFeatureDAO {
  constructor(@InjectModel('Feature') private _featureModel: FeatureModel) {}
  async create(data: CreateFeatureDTO): Promise<TFeature> {
    let newFeature: FeatureDocument = new this._featureModel(data);
    newFeature = await newFeature.save();
    if (!newFeature || !newFeature._id) {
      throw new Error('Error creating feature');
    }
    return asTFeature(newFeature);
  }
  async read(id: string): Promise<TFeature> {
    const feature: FeatureDocument | null =
      await this._featureModel.findById(id);
    if (!feature) throw new Error('Feature not found');
    return asTFeature(feature);
  }
  async readAll(args?: TSearch<TFeature>): Promise<TFeature[]> {
    const features: FeatureDocument[] = await this._featureModel.find();
    if (!features) throw new Error('Features not found');
    if (!features.length) throw new Error("Features doesn't contain anything");
    return features.map(asTFeature);
  }
  async update(feature: UpdateFeatureDTO): Promise<TFeature> {
    const featureUpdated: FeatureDocument | null =
      await this._featureModel.findByIdAndUpdate(feature._id, feature, {
        new: true,
      });
    if (!featureUpdated) throw new Error('Feature not found');
    return asTFeature(featureUpdated);
  }
  async delete(id: string): Promise<TFeature> {
    const featureDeleted: FeatureDocument | null =
      await this._featureModel.findByIdAndDelete(id);
    if (!featureDeleted) throw new Error('Feature not found');
    return asTFeature(featureDeleted);
  }
}
