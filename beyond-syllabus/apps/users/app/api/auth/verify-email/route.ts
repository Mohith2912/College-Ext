import { verifyEmail,assertTrustedOrigin,parseJsonRequest,authErrorResponse } from '@beyond-syllabus/auth';
import { verifyEmailSchema } from '@beyond-syllabus/validation';
export async function POST(request:Request){try{assertTrustedOrigin(request);const {token}=await parseJsonRequest(request,verifyEmailSchema);return Response.json({ok:true,data:await verifyEmail(token,{request})},{headers:{'Cache-Control':'no-store'}})}catch(error){return authErrorResponse(error)}}
