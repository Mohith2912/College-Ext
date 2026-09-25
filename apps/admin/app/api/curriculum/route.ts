import { assertTrustedOrigin,authErrorResponse,parseJsonRequest,requireOrganizationMembership,consumeRateLimit } from '@aetheria/auth';
import { auth } from '@/lib/auth';
import { curriculumSchema,mutateCurriculum } from '@/lib/curriculum';
export async function POST(request:Request){try{assertTrustedOrigin(request,'admin');const context=await requireOrganizationMembership(auth);await consumeRateLimit('curriculum',context.user.id,60,60);const input=await parseJsonRequest(request,curriculumSchema,64000);const data=await mutateCurriculum(context,input);return Response.json({ok:true,data},{headers:{'Cache-Control':'no-store'}})}catch(error){return authErrorResponse(error)}}
