import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
export default async function IndexPage() { redirect((await auth())?.user ? '/home' : '/notes'); }
