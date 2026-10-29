import { prisma } from '../packages/database/src/index.ts';

// User requested removal of non-CN courses/modules/lessons. Soft deletion keeps
// their content and user progress recoverable; no CN records are touched.
try {
  const organization = await prisma.organization.findUniqueOrThrow({ where: { slug: 'aetheria' } });
  const courses = await prisma.course.findMany({
    where: { organizationId: organization.id, slug: { not: 'computer-networks' }, deletedAt: null },
    select: { id: true, slug: true },
  });
  const courseIds = courses.map(course => course.id);
  const modules = await prisma.module.findMany({ where: { courseId: { in: courseIds } }, select: { id: true } });
  const moduleIds = modules.map(module => module.id);
  const sections = await prisma.moduleSection.findMany({ where: { moduleId: { in: moduleIds } }, select: { id: true } });
  const deletedAt = new Date();
  await prisma.$transaction(async tx => {
    await tx.topic.updateMany({ where: { sectionId: { in: sections.map(section => section.id) } }, data: { deletedAt } });
    await tx.moduleSection.updateMany({ where: { moduleId: { in: moduleIds } }, data: { deletedAt } });
    await tx.noteDocument.updateMany({ where: { moduleId: { in: moduleIds } }, data: { deletedAt } });
    await tx.module.updateMany({ where: { id: { in: moduleIds } }, data: { deletedAt } });
    await tx.courseOffering.updateMany({ where: { courseId: { in: courseIds } }, data: { deletedAt } });
    await tx.course.updateMany({ where: { id: { in: courseIds } }, data: { deletedAt } });
  });
  console.log(`Removed ${courses.length} non-CN courses and ${modules.length} modules from the library (recoverable).`);
} finally {
  await prisma.$disconnect();
}
