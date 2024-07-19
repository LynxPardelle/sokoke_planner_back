import { AsyncModelFactory } from '@nestjs/mongoose';
import { userSchemaFactory } from './user.schema.factory';
export const userModuleSchemaFactory: AsyncModelFactory[] = [userSchemaFactory];
