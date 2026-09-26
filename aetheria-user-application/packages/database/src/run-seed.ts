import { prisma } from './index';
import { seedDatabase } from './seed';
try{console.log(await seedDatabase(prisma));}finally{await prisma.$disconnect();}
