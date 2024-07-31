import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
/* Middlewares */
import { AuthMiddleware } from './middlewares/auth.middleware';
/* Services */
import { AuthService } from './services/auth.service';
/* Strategies */
import { ApiKeyStrategy } from './strategies/api-key.strategy';
@Module({
  imports: [PassportModule, ConfigModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
