import Link from 'next/link';
import { BookOpen, LayoutDashboard, ScrollText, ExternalLink } from 'lucide-react';
import { signOut } from '@/lib/auth';
export function AdminShell({children,name}:{children:React.ReactNode;name:string}){
  return <div className="admin-shell"><aside className="admin-sidebar"><Link href="/" className="admin-brand">æ <span>Aetheria</span></Link><div><p className="admin-eyebrow">ADMINISTRATION</p><nav aria-label="Administration"><Link href="/"><LayoutDashboard size={18} aria-hidden/>Overview</Link><Link href="/curriculum"><BookOpen size={18} aria-hidden/>Syllabus & notes</Link><Link href="/audit"><ScrollText size={18} aria-hidden/>Audit history</Link><Link href={`${process.env.USERS_URL??'http://localhost:3000'}/notes`} target="_blank" rel="noreferrer"><ExternalLink size={18} aria-hidden/>Open user library</Link></nav></div><footer><p>{name}</p><form action={async()=>{'use server';await signOut({redirectTo:'/login'})}}><button className="admin-outline">Sign out</button></form><p>Independent study companion.<br/>Original and authorized material.</p></footer></aside><main id="main" className="admin-main">{children}</main></div>
}
