import { Test, TestingModule } from '@nestjs/testing';
import { CloudflareR2ServiceTsService } from './cloudflare-r2.service.ts.service';

describe('CloudflareR2ServiceTsService', () => {
  let service: CloudflareR2ServiceTsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudflareR2ServiceTsService],
    }).compile();

    service = module.get<CloudflareR2ServiceTsService>(CloudflareR2ServiceTsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
