import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{return{rules:[{userAgent:'*',allow:['/','/notes','/case-studies','/about','/privacy','/terms','/accessibility','/content-policy'],disallow:['/home','/ai','/api','/login','/register','/verify-email']}],sitemap:`${process.env.USERS_URL??'http://localhost:3000'}/sitemap.xml`}}
