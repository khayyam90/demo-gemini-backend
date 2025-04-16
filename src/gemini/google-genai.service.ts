import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Location = {
  x: number,
  y: number,
  width: number,
  height: number,
  name: string
}
export type GuessResult = {city: string, locations: Location[]};


@Injectable()
export class GoogleGenAIService {
  private ai: GoogleGenAI;

  constructor(configService: ConfigService) {
    const GEMINI_API_KEY = configService.get<string>('GEMINI_KEY');
    this.ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  }

  async guess(input: string): Promise<GuessResult>{
   /* return {
  city: 'Rome',
  locations: [
    { name: 'Tower', y: 182, x: 473, height: 149, width: 22 },
    { name: 'Dome', y: 54, x: 778, height: 443, width: 145 },
    { name: 'Building', y: 143, x: 0, height: 232, width: 363 }
  ]
};*/
/*
  return {
  city: 'Rome',
  locations: [ { name: 'Vittoriano', y: 140, x: 0, width: 382, height: 232 - 140 } ]
}
*/

    const inputType = this.detectInputType(input);

    if (inputType === undefined){
      throw "Bad input format";
    }

    input = input
      .replace("data:image/png;base64,", "")
      .replace("data:image/jpg;base64,", "")
      .replace("data:image/jpeg;base64,", "")    
    ;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: {
        parts: [
          { 
            text: 'Detect the corresponding city. Output a json with the name of the city labelled as "city" and the detected elements in a list labelled as "elements" where each entry contains the bounding box in "box_2d" and a text label in "label"'
          },
          { 
            inlineData: {
              data: input,
              mimeType: "image/jpg"
            }
          }
        ]
      }
    });  

    const text = response.text ?? '';

    const json = text.replace('```json', '').replace('```', '');
    console.warn(json);
    const result = JSON.parse(json);

    return {
      city: result.city,
      locations: result.elements.map(d => ({
        name: d.label,
        y: d.box_2d[0],
        x: d.box_2d[1],
        height: d.box_2d[2] - d.box_2d[0],
        width: d.box_2d[3] - d.box_2d[1]
      }))
    };
  }

  private detectInputType(input: string):string | undefined{
    const mimesToTest = [
      'image/jpg', 
      'image/jpeg', 
      'image/png'
    ];

    return mimesToTest.find(mime => input.includes(mime));
  }
}
