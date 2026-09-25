import 'server-only';
import { prisma } from '@aetheria/database';
import { unstable_cache } from 'next/cache';

export const organizationScope = { slug: process.env.ORGANIZATION_SLUG ?? 'aetheria', deletedAt: null };
const publicCourse = { status: 'PUBLISHED' as const, deletedAt: null, organization: organizationScope };
const publicModule = { status: 'PUBLISHED' as const, deletedAt: null, organization: organizationScope };

export async function getLibrary({ term, subject, q, availability }: { term?: string; subject?: string; q?: string; availability?: string } = {}) {
  const load = unstable_cache(async () => Promise.all([
    prisma.academicTerm.findMany({ where: { deletedAt: null, organization: organizationScope }, orderBy: { number: 'asc' }, include: { _count: { select: { offerings: { where: { deletedAt: null, course: publicCourse } } } } } }),
    prisma.course.findMany({
      where: { ...publicCourse, ...(term ? { offerings: { some: { deletedAt: null, term: { slug: term, deletedAt: null } } } } : {}), ...(subject ? { subject } : {}), ...(q ? { OR: [{ title: { contains: q } }, { description: { contains: q } }, { code: { contains: q } }] } : {}), ...(availability === 'notes' ? { modules: { some: { ...publicModule, note: { status: 'PUBLISHED', deletedAt: null } } } } : {}) },
      include: { offerings: { where: { deletedAt: null, term: { deletedAt: null } }, include: { term: true }, orderBy: { position: 'asc' } }, _count: { select: { modules: { where: publicModule } } } },
      orderBy: [{ title: 'asc' }], take: 100,
    }),
    prisma.course.findMany({ where: publicCourse, select: { subject: true } }),
    prisma.module.count({ where: { ...publicModule, course: publicCourse } }),
  ]), ['aetheria-library-v2', term ?? '', subject ?? '', q ?? '', availability ?? ''], { revalidate: 60, tags: ['aetheria-curriculum'] });
  const [terms, courses, allCourses, moduleCount] = await load();
  return { terms, courses, courseCount: allCourses.length, moduleCount, subjects: [...new Set(allCourses.map(course => course.subject))].sort() };
}

export async function getCourse(slug: string) {
  const load = unstable_cache(() => prisma.course.findFirst({
    where: { ...publicCourse, slug },
    include: {
      offerings: { where: { deletedAt: null, term: { deletedAt: null } }, include: { term: true }, orderBy: { position: 'asc' } },
      modules: { where: publicModule, orderBy: { position: 'asc' }, include: { note: { select: { status: true, deletedAt: true } }, _count: { select: { sections: true } } } },
    },
  }), ['aetheria-course-v2', slug], { revalidate: 120, tags: ['aetheria-curriculum'] });
  return load();
}

export async function getModule(courseSlug: string, moduleSlug: string) {
  const load = unstable_cache(() => prisma.module.findFirst({
    where: { ...publicModule, slug: moduleSlug, course: { ...publicCourse, slug: courseSlug }, note: { status: 'PUBLISHED', deletedAt: null, organization: organizationScope } },
    include: { note: true, course: { include: { offerings: { where: { deletedAt: null, term: { deletedAt: null } }, include: { term: true } }, modules: { where: { ...publicModule, note: { status: 'PUBLISHED', deletedAt: null } }, select: { slug: true, title: true, position: true }, orderBy: { position: 'asc' } } } } },
  }), ['aetheria-module-v2', courseSlug, moduleSlug], { revalidate: 120, tags: ['aetheria-curriculum'] });
  return load();
}

export type LibraryCourse = Awaited<ReturnType<typeof getLibrary>>['courses'][number];
