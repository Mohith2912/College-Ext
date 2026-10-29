import Link from 'next/link';
import { VerifyForm } from '@/components/account-form';
export const metadata={title:'Verify your email',robots:{index:false,follow:false}};
export default async function Verify({searchParams}:{searchParams:Promise<{token?:string}>}){const {token}=await searchParams;return <section className="auth-card"><h1>One small step to your study space.</h1><p>Confirm your email address to enable sign-in. Verification links expire after 24 hours.</p>{token&&/^[a-f0-9]{64}$/.test(token)?<VerifyForm token={token}/>:<p>This link is invalid. <Link className="text-link" href="/register">Request a new link</Link>.</p>}</section>}
