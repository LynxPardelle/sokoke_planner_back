import { Module } from '@nestjs/common';
import { AppController } from './core/controllers/app.controller';
import { AppService } from './core/services/app.service';
import { PlannerModule } from './planner/planner.module';

@Module({
  imports: [PlannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
