import Link from 'next/link';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){
  const query=await searchParams;
  async function login(form:FormData){'use server';try{await signIn('credentials',{email:form.get('email'),password:form.get('password'),redirectTo:'/'});}catch(e){if(e instanceof AuthError)redirect('/login?error=1');throw e}}
  return <main id="main" className="admin-login"><Link className="admin-brand" href={process.env.USERS_URL ?? 'http://localhost:3000'}>æ <span>Aetheria</span></Link><p className="admin-eyebrow">EDITORIAL WORKSPACE</p><h1>A space for better learning.</h1><p>Sign in to manage the syllabus and publish original study material.</p><form action={login} className="admin-form"><label>Email<input name="email" type="email" autoComplete="username" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{query.error&&<p role="alert" className="admin-error">Sign-in failed. Check your credentials, email verification, and editorial access.</p>}<button className="admin-button" type="submit">Sign in to administration</button></form><p className="admin-muted">Accounts need an editorial role. Students can sign in through the <Link href={`${process.env.USERS_URL ?? 'http://localhost:3000'}/login`}>user application</Link>.</p><small>An independent study companion. Not an official institutional platform.</small></main>
}
