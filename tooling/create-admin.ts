import { randomBytes } from 'node:crypto';
import { mkdir,writeFile } from 'node:fs/promises';
import { prisma } from '../packages/database/dist/index.js';
import { hashPassword } from '../packages/auth/dist/password.js';
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase()??(process.env.NODE_ENV==='production'?'':'admin@aetheria.local');
const password=process.env.ADMIN_PASSWORD??(process.env.NODE_ENV==='production'?'':randomBytes(18).toString('base64url'));
if(!email||password.length<12)throw new Error('Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.');
const organization=await prisma.organization.findFirstOrThrow({where:{slug:process.env.ORGANIZATION_SLUG??'aetheria',deletedAt:null}});
const existing=await prisma.user.findUnique({where:{email}});
if(existing){console.log('This account already exists. Existing credentials were not changed.');await prisma.$disconnect();process.exit(0);}
const passwordHash=await hashPassword(password);
await prisma.$transaction(async tx=>{
  const user=await tx.user.create({data:{email,name:'Library administrator',passwordHash,emailVerified:new Date()}});
  await tx.organizationMembership.create({data:{organizationId:organization.id,userId:user.id,role:'ADMIN'}});
  await tx.auditLog.create({data:{organizationId:organization.id,actorId:user.id,action:'administrator.bootstrap',entityType:'User',entityId:user.id,metadata:{method:'local-command'}}});
});
if(!process.env.ADMIN_PASSWORD){await mkdir('.local',{recursive:true});await writeFile('.local/admin-access.txt',`Aetheria local administrator\nAdmin: http://localhost:3001\nEmail: ${email}\nPassword: ${password}\n\nThis file is ignored by Git. Keep it private.\n`);console.log('Administrator created. Local sign-in details are in .local/admin-access.txt.');}else console.log('Administrator created using the supplied environment credentials.');
await prisma.$disconnect();
