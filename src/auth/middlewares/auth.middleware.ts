import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    passport.authenticate('headerapikey', (value: boolean) => {
      if (value) {
        next();
      } else {
        throw new UnauthorizedException();
      }
    })(req, res, next);
  }
}
