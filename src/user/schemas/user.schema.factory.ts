import { AsyncModelFactory } from '@nestjs/mongoose';
/* Schemas */
import { UserDocument, userSchema } from './user.schema';
export const userSchemaFactory: AsyncModelFactory = {
  name: 'User',
  imports: [],
  useFactory: () => {
    const schema = userSchema;
    schema.post('save', (doc: UserDocument) => {
      console.log('%s has been saved', doc._id);
    });
    schema.pre('validate', function (next) {
      console.log('validate', this);
      next();
    });
    schema.pre('save', function (next) {
      console.log('save', this);
      next();
    });
    schema.post('findOneAndDelete', async (doc: UserDocument) => {
      console.log(`${doc._id} has been removed`);
    });
    return schema;
  },
  inject: [],
};
