import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { configuration } from './configuration';
import { GoogleGenAIService } from './gemini/google-genai.service';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [configuration] 
   }), 
  ],
  controllers: [AppController],
  providers: [
    GoogleGenAIService
  ],
})
export class AppModule {}
