import Link from 'next/link';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
export const metadata={title:'Sign in',robots:{index:false,follow:false}};
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){const query=await searchParams;
async function login(form:FormData){'use server';try{await signIn('credentials',{email:form.get('email'),password:form.get('password'),redirectTo:'/home'})}catch(e){if(e instanceof AuthError)redirect('/login?error=1');throw e}}
return <section className="auth-container"><div className="auth-aside"><p className="eyebrow">WELCOME BACK</p><h2>Pick up a thought.<br/>Take it a little further.</h2><p>Explore your courses and return to what matters.</p></div><div className="auth-card"><h1>Back to your study space.</h1><p className="muted">Sign in with your verified email.</p><form action={login} className="auth-form"><label>Email address<input className="input" name="email" type="email" required autoComplete="username"/></label><label>Password<input className="input" name="password" type="password" required autoComplete="current-password"/></label>{query.error&&<p role="alert" className="form-error">Sign-in failed. Check your password and verify your email before trying again.</p>}<button className="btn btn-primary">Sign in</button></form><p className="auth-footer">New here? <Link className="text-link" href="/register">Create an account</Link></p></div></section>}
