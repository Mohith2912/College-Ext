import Link from 'next/link';
import { RegisterForm } from '@/components/account-form';
export const metadata={title:'Create your account',robots:{index:false,follow:false}};
export default function Register(){return <section className="auth-container"><div className="auth-aside"><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>A little understanding,<br/>every day.</h2><p>Your own space for thoughtful study, original course notes, and practice.</p></div><div className="auth-card"><h1>Make room for learning.</h1><p className="muted">Create your independent study companion account.</p><RegisterForm/><p className="auth-footer">Already have an account? <Link className="text-link" href="/login">Sign in</Link></p></div></section>}
