import { auth } from '@/lib/auth';
import { requireOrganizationMembership,authErrorResponse } from '@aetheria/auth';
export async function GET(){try{const ctx=await requireOrganizationMembership(auth);return Response.json({ok:true,data:{id:ctx.user.id,name:ctx.user.name,email:ctx.user.email,role:ctx.membership.role}},{headers:{'Cache-Control':'no-store'}})}catch(error){return authErrorResponse(error)}}
