import { Body, Controller, Post } from '@nestjs/common';
import { GoogleGenAIService, GuessResult } from './gemini/google-genai.service';

type ApiResult = { status: number, result?: GuessResult, message?: string}

@Controller('api/gemini')
export class AppController { 
  constructor(private gemini: GoogleGenAIService) {}

  @Post()
  async guess(@Body('base64') base64: string): Promise<ApiResult>{
    try{
      const result = await this.gemini.guess(base64);
      return { status: 200, result: result };
    }catch(err: any){
      return { status: 500, message: err as string};
    }
  }  
}
