import { prisma } from '../packages/database/src/index';
import { seedDatabase } from '../packages/database/src/seed';
try{console.log('Original curriculum seeded:',await seedDatabase(prisma));}finally{await prisma.$disconnect();}
