import { Module } from '@nestjs/common';
import { PlannerController } from './controllers/planner/planner.controller';
import { PlannerService } from './services/planner/planner.service';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService]
})
export class PlannerModule {}
