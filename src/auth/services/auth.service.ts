import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiKeys: string[];

  constructor(private readonly configService: ConfigService) {
    this.apiKeys = configService.get('apiKeys');
  }

  validateApiKey(apiKey: string): boolean {
    return this.apiKeys.includes(apiKey);
  }
}
