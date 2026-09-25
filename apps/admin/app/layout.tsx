import type { Metadata } from 'next';
import '@aetheria/ui/styles.css';
import './admin.css';
export const metadata:Metadata={title:{default:'Aetheria · Administration',template:'%s · Aetheria Admin'},description:'The independent Aetheria study library editorial workspace.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a>{children}</body></html>}
