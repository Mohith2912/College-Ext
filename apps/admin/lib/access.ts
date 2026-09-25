import { requireRole, AccessError } from '@aetheria/auth';
import { redirect } from 'next/navigation';
import { auth } from './auth';
export async function editorialContext(){
  try{return await requireRole(auth,['CONTENT_EDITOR','REVIEWER','ADMIN','SUPER_ADMIN']);}
  catch(error){if(error instanceof AccessError && (error.status===401||error.status===403))redirect('/login');throw error;}
}
