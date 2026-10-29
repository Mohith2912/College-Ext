import { registerAccount,assertTrustedOrigin,parseJsonRequest,authErrorResponse } from '@aetheria/auth';
import { registerSchema } from '@aetheria/validation';
export async function POST(request:Request){try{assertTrustedOrigin(request);const input=await parseJsonRequest(request,registerSchema);return Response.json({ok:true,data:await registerAccount(input,{request})},{status:201,headers:{'Cache-Control':'no-store'}})}catch(error){return authErrorResponse(error)}}
