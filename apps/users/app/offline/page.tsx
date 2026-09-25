import Link from 'next/link';
export const metadata={title:'Offline',robots:{index:false,follow:false}};export default function Offline(){return <div className="empty-state"><h1>You’re offline.</h1><p>Previously opened public pages may still be available. Restricted material is never saved for offline use.</p><Link className="btn btn-secondary" href="/notes">Try the course library</Link></div>}
