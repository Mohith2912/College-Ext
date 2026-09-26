import { describe,expect,it } from 'vitest';
import { tutorAnswerSchema,tutorRequestSchema } from '../src/index';
describe('AI tutor contracts',()=>{
  it('rejects privilege and source injection fields',()=>{expect(tutorRequestSchema.safeParse({question:'Explain demand',courseId:'018f1f61-46d1-7c91-8c15-c20534fc0f14',action:'explain',role:'admin'}).success).toBe(false)});
  it('requires valid citation positions and evidence quality',()=>{expect(tutorAnswerSchema.safeParse({answer:'A supported answer.',evidenceQuality:'strong',citations:[{source:1,claim:'Demand relates price and quantity.'}],followUps:[]}).success).toBe(true);expect(tutorAnswerSchema.safeParse({answer:'x',evidenceQuality:'certain',citations:[],followUps:[]}).success).toBe(false)});
});
