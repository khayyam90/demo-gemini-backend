import { Test, TestingModule } from '@nestjs/testing';
import { GoogleGenAIService } from './google-genai.service';

describe('GeminiService', () => {
  let service: GoogleGenAIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleGenAIService],
    }).compile();

    service = module.get<GoogleGenAIService>(GoogleGenAIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
